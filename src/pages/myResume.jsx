/*
  Braeden's Personal Website
  Author: Braeden Norman
  Date: 2022-10-27

  Helpful Information

  Print Window JavaScript: https://developer.mozilla.org/en-US/docs/Web/API/Window/print
 */
import React, {useState, useEffect} from 'react';
import "../CSS/resume.css";
import NavBar from "../components/navBar";
import ResumeViewer from "../helpers/resume/resumeViewer"
import * as ReactDOM from "react-dom/client";
import  { useNavigate } from 'react-router-dom'
import {Stack, Button} from 'react-bootstrap';
import { variables } from "../configFiles/variables";

export default function MyResume() {
  let Navigate = useNavigate();

  const [ resume, setResume ] = useState(null);

  useEffect(() => {
    fetch(variables.BACKEND_URL + "users/getMyResume",{
        method: 'GET'
      })
    .then((res) => res.json())
    .then((data) => setResume(data.resume));
}, [])
  
  async function printPDF() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    await root.render(<React.StrictMode>
                        {resume? <ResumeViewer resume={resume}/> : <></>}
                      </React.StrictMode>)
    await window.print()
    Navigate("/myResume");
    window.parent.location = window.parent.location.href;
  }
  
  return (
    <div id="myResumeAll">
      <NavBar color="black"/>
      <div id="myResume">
        <Stack className='mx-4 align-items-center justify-content-center text-center' >
          <Button  variant='primary' onClick={ () => {
            printPDF();
              }} disabled={resume===null}>Print Resume</Button>
        </Stack>
        {resume? <ResumeViewer resume={resume}/> : <></>}
      </div>
    </div>
  )
}



