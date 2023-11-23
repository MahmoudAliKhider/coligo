import NavBar from '../components/NavBar';
import { Container, Col, Card } from 'react-bootstrap';
import image from '../assets/images/istockphoto-818576380-612x612.jpg';
import { Announcements } from '../components/Announcements';
import { Quizzes } from '../components/Quizzes';



export const Dashboard = () => {



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

                        <div className="container flex mb-2 p-4">
                            <div>
                                <Announcements />
                            </div>

                            <div>
                                <Quizzes />
                            </div>
                        </div>

                    </div>
                </Col>


            </div>
        </Container>
    );
};
