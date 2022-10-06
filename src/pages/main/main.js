import NavBar from "../../components/navBar/navBar"
import main from './main.gif';
import './main.css'
import { Stack, Image } from "react-bootstrap";

export default function Main() {
    return (
      <>     
      <div id="mainAll">
        <Image src={main} id="mainImage"/> 
        <NavBar variant="dark"/>
          <Stack id="main" >
            <h1 className="mt-5">Braeden Norman's Resume Website</h1>
            <hr id="line"/>
            <h2>Still under construction</h2>
          </Stack>
      </div>
      </>

    )
  }
