import React from "react";
import './App.css';
import Main from './pages/main/main';
import { Route, Routes} from 'react-router-dom';
import MyResume from "./pages/resume/myResume";
import Practice from './pages/practice/practice';
import ResumeBuilder from "./pages/resume/resumeBuilder";
import SimpleMap from "./pages/map/maps";

function App() {
    return (
    <>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/myResume" element={<MyResume />} />
          <Route path="/practice" element={<Practice/>}/>
          <Route path="/resumeBuilder" element={<ResumeBuilder/>}/>
          <Route path="/map" element={<SimpleMap/>}/>
        </Routes>        
    </>
  );
}

export default App;
