
import NavBar from '../components/NavBar';
import { Container, Col } from 'react-bootstrap';

const Schedule = () => {
   
    return (
        <Container fluid>
            <div className='py-3 flex'>
                <Col sm="3" xs="2" md="2" className='w-60'>
                    <NavBar />
                </Col>

                <Col className='ml-16 ' sm="9" xs="10" md="10">
                  
                  </Col>
            </div>
        </Container>
    );
};

export default Schedule