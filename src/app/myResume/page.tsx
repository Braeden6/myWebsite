"use client"
/*
  Braeden's Personal Website
  Author: Braeden Norman
  Date: 2022-10-27

  Helpful Information

  Print Window JavaScript: https://developer.mozilla.org/en-US/docs/Web/API/Window/print
 */
import React, {useState, useEffect} from 'react';
import "./resume.css";
import NavBar from "../components/orgamisms/navBar";
import ResumeViewer from "../components/orgamisms/resumeViewer"
// import * as ReactDOM from "react-dom/client";
// import  { useNavigate } from 'react-router-dom'
import {Stack, Button} from 'react-bootstrap';
import { AuthProvider } from '../utils/auth';
// import { variables } from "../configFiles/variables";

export default function MyResume() {
  // let Navigate = useNavigate();

  const [ resume, setResume ] = useState(null);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_URL + "/myresume")
    fetch(process.env.NEXT_PUBLIC_API_URL + "/myresume",{
        method: 'GET'
      })
    .then((res) => res.json())
    .then((data) => {
      setResume(data)
    });
}, [])
  
  // async function printPDF() {
  //   const root = ReactDOM.createRoot(document.getElementById('root'));
  //   await root.render(<React.StrictMode>
  //                       {resume? <ResumeViewer resume={resume}/> : <></>}
  //                     </React.StrictMode>)
  //   await window.print()
  //   Navigate("/myResume");
  //   window.parent.location = window.parent.location.href;
  // }
  
  return (
    <div id="myResumeAll">
    <AuthProvider>
      <NavBar/>
      <div id="myResume">
        <Stack className='mx-4 align-items-center justify-content-center text-center' >
          <Button  variant='primary' onClick={ () => {
            // printPDF();
              }} disabled={resume===null || true}>Print Resume</Button>
        </Stack>
        {resume? <ResumeViewer resume={resume}/> : <></>}
      </div>
    
    </AuthProvider>
    </div>
  )
}



