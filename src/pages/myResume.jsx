import React, {useState, useEffect} from 'react';
import "../CSS/resume.css";
import NavBar from "../components/navBar";
import ResumeViewer from "../helpers/resume/resumeViewer"
import * as ReactDOM from "react-dom/client";
import  { useNavigate } from 'react-router-dom'
import {Stack, Button} from 'react-bootstrap';

export default function MyResume() {
  let Navigate = useNavigate();

  const [ resume, setResume ] = useState(null);

  useEffect(() => {
    fetch((process.env.NODE_ENV === "production"? process.env.REACT_APP_PRODUCTION_URL: process.env.REACT_APP_DEV_URL) + "getMyResume",{
      method: 'GET'
    })
    .then((res) => res.json())
    .then((data) => setResume(data.resume));
}, [])

useEffect(() => {
  console.log(resume);
}, [resume])


  
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
    <div id="all">
      <NavBar variant="light"/>
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



