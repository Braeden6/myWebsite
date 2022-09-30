import NavBar from "../../components/navBar/navBar"
import main from './main.mp4';
import './main.css'
import { Stack } from "react-bootstrap";

export default function Main() {
    return (
      <>
        <video src={main} autoPlay muted loop id="mainVideo"/>
        <NavBar variant="dark"/>
        <Stack className='col-md-3 mx-auto mt-5 ' id="main" >
          <h1 className="mt-5">Braeden Norman's Resume Website</h1>
          <hr id="line"></hr>
          <h2>Still under construction</h2>
        </Stack>
      </>
    )
  }