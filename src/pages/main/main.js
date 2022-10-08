import NavBar from "../../components/navBar/navBar"
import {AiFillGithub, AiFillLinkedin} from "react-icons/ai"

import image from './main.jpg'
import './main.css'
import { Stack, Image, Container, Card, Button, Carousel } from "react-bootstrap";

//<Image src={main} id="mainImage"/> 
export default function Main() {
    return (
      <>     
      <Container id="mainAll">
        <NavBar variant="dark"/>
        <Carousel>
          <Carousel.Item interval={10000}>
              <Card style={{ width:'24rem'} } bg="white"  text="black" className="text-center mx-auto bg-opacity-75">
                <Card.Img src={image} style={{bg:'black'}} className="p-4 rounded-circle"/>
                <Card.Header><h1>Braeden Norman</h1></Card.Header>
                <Card.Body>
                  <Card.Text className="my-0">
                    Computer Science BSc Graduate of 
                  </Card.Text>
                  <Card.Text>
                    University of British Columbia
                  </Card.Text>
                  <Card.Footer>
                    <Stack direction="horizontal" gap={3} className="align-items-center justify-content-center text-center">
                      <Button href="https://github.com/Braeden6" target="_blank" variant="dark"><AiFillGithub/></Button>
                      <Button href="https://linkedin.com/in/braeden-norman-49665a157" target="_blank" variant="dark"><AiFillLinkedin/></Button>
                    </Stack>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Carousel.Item>
            <Carousel.Item interval={10000}>
              <Card style={{ width:'24rem'} } bg="white"  text="black" className="mx-auto bg-opacity-75">
                <Card.Header className="text-center"><h1>This Website</h1></Card.Header>
                <Card.Body>
                  <Card.Text >
                    Front-end: uses React and Bootstrap, and hosted on Azure Web App.
                  </Card.Text>
                  <Card.Text>
                    Back-end: uses Node.js and CosmosDB, and hosted on Azure Function App.
                  </Card.Text>
                  <Card.Text>
                    It is still being worked on and is a work in progress.
                  </Card.Text>
                  <Card.Footer>
                    <Stack direction="horizontal" gap={3} className="align-items-center justify-content-center">
                      <Button href="https://github.com/Braeden6/myWebsite" target="_blank" variant="dark"><AiFillGithub/></Button>
                      <Card.Text className="my-0">
                        The repository for this website can be found here
                      </Card.Text>
                    </Stack>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Carousel.Item>
          </Carousel>
      </Container>
      </>

    )
  }
