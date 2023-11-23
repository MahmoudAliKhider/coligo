import NavBar from '../components/NavBar';
import { Container, Col, Card } from 'react-bootstrap';
import image from '../assets/images/istockphoto-818576380-612x612.jpg';
import { useEffect, useState } from 'react';

interface Announcement {
    _id: string;
    title: string;
    content: string;
    createdBy: string;
    userAvatar: string;
    userName: string;
}

export const Dashboard = () => {
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
        <Container fluid>
            <div className='py-3 flex'>
                <Col sm="3" xs="2" md="2" className='w-60'>
                    <NavBar />
                </Col>

                <Col className='ml-16 ' sm="9" xs="10" md="10">
                    <div className="container mx-auto mt-1">
                        <div >
                            <Card className='border  p-6 bg-white mr-10 rounded-xl  h-[280px]'>
                                <Card.Body className='ml-4'>
                                    <h2 className='text-3xl font-semibold mb-6 text-slate-800'>EXAMS TIMES</h2>
                                    <div className='flex'>
                                        <Card.Text className='w-90 text-slate-500'>
                                            Here We are ,Are you ready to fighy ? Don`t worry , we prepared some tips to be read  for your Exames
                                        </Card.Text>
                                        <Card.Img className='w-[550px]  h-64 relative bottom-20' src={image} alt="Card image" />
                                    </div>
                                    <Card.Text className=' text-slate-400 relative bottom-48 '>
                                        "Nothing happens until something moves" - Albert Einsten
                                    </Card.Text>

                                    <button className='border p-4 pl-7 pr-7 bg-slate-900 rounded-xl text-white  relative bottom-40 ml-5'>
                                        View exams tips
                                    </button>

                                </Card.Body>
                            </Card>

                            <br />


                        </div>

                        <div className="container flex mb-9 p-4">
                            <div>
                                <h1 className="text-3xl font-bold  text-slate-800">Announcements</h1>

                                {loading && <p>Loading...</p>}
                                {error && <p>Error fetching announcements</p>}

                                {announcements && announcements.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                                        <div className="bg-white  rounded-md overflow-hidden shadow-md mb-4 p-8 w-[800px]">
                                            <p className='text-slate-700 font-bold relative ml-[700px] cursor-pointer'>All</p>
                                            {announcements.slice(0, 3).map((announcement) => (
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

                             <div>
                                <p>Quize</p>
                             </div>
                        </div>

                    </div>
                </Col>


            </div>
        </Container>
    );
};
