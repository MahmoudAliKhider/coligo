import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Announcement {
    _id: string;
    title: string;
    content: string;
    createdBy: string;
    userAvatar: string;
    userName: string;
}

export const Announcements = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAnnouncementsWithAvatars = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/announcements`);
                const data = await res.json();

                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                const announcementsWithAvatars = await Promise.all(
                    data.map(async (announcement: Announcement) => {
                        const userRes = await fetch(`/api/users/${announcement.createdBy}`);
                        const userData = await userRes.json();
                        const userAvatar = userData.avatar || '';
                        const userName = userData.name || '';

                        return {
                            ...announcement,
                            userAvatar,
                            userName,
                        };
                    })
                );

                setAnnouncements(announcementsWithAvatars);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchAnnouncementsWithAvatars();
    }, []);
    return (
        <div>
            <h1 className="text-2xl font-bold  text-slate-800">Announcements</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error fetching announcements</p>}

            {announcements && announcements.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    <div className="bg-white  rounded-md overflow-hidden shadow-md mb-4 p-8 w-[800px]">
                        <Link to="/announcement">
                        <p className='text-slate-700 font-bold relative ml-[700px] cursor-pointer'>All</p>

                        </Link>
                        {announcements.slice(0, 4).map((announcement) => (
                            <div key={announcement._id} className="mb-4 flex">
                                <div className="flex items-center">
                                    <img src={announcement.userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full mr-5 " />
                                    <div>
                                        <h4 className="text-sm text-gray-900">{announcement.userName}</h4>
                                        <p className="text-sm text-gray-500">{announcement.title}</p>
                                    </div>
                                </div>
                                <div className='border-r ml-7 border-gray-700'></div>
                                <div className="  ml-7 p-3 " ></div>
                                <div>
                                    <p className="text-gray-700 ">{announcement.content}</p>
                                </div>


                                <hr className="my-4 border-t border-gray-300" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
