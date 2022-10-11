import React from 'react';
import "./resume.css"
import NavBar from "../../components/navBar/navBar";
import inputResume from "./resume.json";
import ResumeBuilder from "./resumeBuilder";
// import { useState } from "react";
import * as ReactDOM from "react-dom/client";
import  { useNavigate } from 'react-router-dom'
import {Stack, Button} from 'react-bootstrap';

export default function Resume() {
  // const [data, setData] = useState(null);
  let Navigate = useNavigate();
  
  
  async function printPDF() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    await root.render(<React.StrictMode><ResumeBuilder resume={inputResume}/></React.StrictMode>)
    await window.print()
    Navigate("/resume");
    window.parent.location = window.parent.location.href;
  }
  
 
  // <p>{!data ? "Loading...." : data}</p>
  return (
      <div id="all">
        <NavBar variant="light"/>
        <Stack className='col-md-1 mx-auto'>
          <Button  variant='secondary' onClick={ () => {
            printPDF();
              }}>Print to Pdf</Button>
        </Stack>
        <ResumeBuilder resume={inputResume}/>
      </div>
  )
  }
/*
  function test(){
    fetch(process.env.NODE_ENV === "production"? "https://backend-2015.azurewebsites.net/api/sendHello": "http://localhost:7071/api/HttpTrigger1", {
      method: 'POST',
      body: JSON.stringify({name: "Test", html: <ResumeBuilder resume={inputResume}/>})
    })
    .then((res) => res.json())
    .then((data) => console.log(data.message));
    

  }*/




