import NavBar from "../../components/navBar/navBar"
import main from './main.mp4';
import './main.css'
import { Container, Row, Col } from "react-bootstrap";

export default function Main() {
    return (
      <>
        <video src={main} autoPlay muted loop id="mainVideo"/>
        <NavBar variant="dark"/>
      </>
    )
  }