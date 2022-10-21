import React from 'react';
import "./resume.css"
import NavBar from "../../components/navBar/navBar";
import inputResume from "./resume.json";
import ResumeViewer from "./resumeViewer";
import * as ReactDOM from "react-dom/client";
import  { useNavigate } from 'react-router-dom'
import {Stack, Button} from 'react-bootstrap';

export default function MyResume() {
  let Navigate = useNavigate();
  
  async function printPDF() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    await root.render(<React.StrictMode>
                        <ResumeViewer resume={inputResume}/>
                      </React.StrictMode>)
    await window.print()
    Navigate("/myResume");
    window.parent.location = window.parent.location.href;
  }
  
  return (
    <div id="all">
      <NavBar variant="light"/>
      <Stack className='mx-4 align-items-center justify-content-center text-center'>
        <Button  variant='primary' onClick={ () => {
          printPDF();
            }}>Print Resume</Button>
      </Stack>
      <ResumeViewer resume={inputResume}/>
    </div>
  )
}



