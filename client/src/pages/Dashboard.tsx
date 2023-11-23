import NavBar from '../components/NavBar';
import { Container, Col, Card } from 'react-bootstrap';
import image from '../assets/images/istockphoto-818576380-612x612.jpg';
import { useEffect, useState } from 'react';

interface Announcement {
    _id: string;
    title: string;
    content: string;
    createdBy:string;
    userAvatar: string;

}

export const Dashboard = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // const [userAvatar, setUserAvatar] = useState('');

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
                data.map(async (announcement:Announcement) => {
                  const userRes = await fetch(`/api/users/${announcement.createdBy}`);
                  const userData = await userRes.json();
                  const userAvatar = userData.avatar || ''; 
          
                  return {
                    ...announcement,
                    userAvatar,
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
    console.log(announcements);
    // console.log(userAvatar);
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
                        <div className="container mx-auto p-8">
                            <h1 className="text-3xl font-bold mb-4">Announcements</h1>

                            {loading && <p>Loading...</p>}
                            {error && <p>Error fetching announcements</p>}

                            {
                                announcements && announcements.length > 0 && (
                                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {announcements.map((announcement) => (
                                            <li key={announcement._id} className="bg-white rounded-md overflow-hidden shadow-md mb-4">
                                                <h2 className="text-xl font-bold p-4">{announcement.title}</h2>
                                                <p className="text-gray-700 p-4">{announcement.content}</p>
                                                <img src={announcement.userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </div>
                    </div>
                </Col>


            </div>
        </Container>
    );
};
