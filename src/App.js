import React from "react";
import './App.css';
import Main from './pages/main/main';
import { Route, Routes} from 'react-router-dom';
import Resume from './pages/resume/resume';
import Practice from './pages/practice/practice';
import ResumeInputBuilder from "./pages/resume/resumeInputBuilder";
import Login from "./pages/login/login";
import SimpleMap from "./pages/maps";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/practice" element={<Practice />}/>
          <Route path="/resumeBuilder" element={<ResumeInputBuilder/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/map" element={<SimpleMap/>}/>
        </Routes>
    </>
  );
}

export default App;
