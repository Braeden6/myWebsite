import React from 'react';
import NavBar from "../components/navBar"
import {AiFillGithub, AiFillLinkedin} from "react-icons/ai"
import image from '../images/main-selfie.jpg'
import '../CSS/main.css'
import { Stack, Container, Card, Button, Carousel } from "react-bootstrap";

//<Image src={main} id="mainImage"/> 
export default function Main() {
    return (
      <>     
      <Container id="mainAll">
        <NavBar variant="dark"/>
        <Carousel interval={10000} id="carousel">
          <Carousel.Item>
            <Stack id="item">
              <Card style={{ width:'24rem'} } bg="white"  text="black" className="text-center mx-auto bg-opacity-75" >
                <Card.Img src={image} style={{bg:'black'}} className="p-4 m-auto rounded-circle" id="carousel-image"/>
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
            </Stack>
          </Carousel.Item>
            <Carousel.Item>
            <Stack id="item">
              <Card style={{ width:'24rem'} } bg="white"  text="black" className="mx-auto bg-opacity-75">
                <Card.Header className="text-center"><h1>This Website</h1></Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Front-end:</strong> Uses React and Bootstrap, and hosted on Azure Web App. For the map, 
                    it makes call to free APIs, based on given longitude and latitude, and gets information for the location.
                  </Card.Text>
                  <Card.Text>
                  <strong>Back-end:</strong> Uses Node.js and CosmosDB, and hosted on Azure Function App.
                  </Card.Text>
                  <Card.Text>
                    This website is still under development and is a running project of mine.
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
              </Stack>
            </Carousel.Item>
          </Carousel>
      </Container>
      </>

    )
  }
