import NavBar from "../../components/navBar/navBar"
import main from './main.mp4';
import './main.css'

export default function Main() {
    return (
      <div>
        <video src={main} autoPlay muted loop id="mainVideo"/>
        <NavBar/>
    </div>
    )
  }