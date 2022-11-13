import React from "react";
import Main from './pages/main';
import { Route, Routes} from 'react-router-dom';
import MyResume from "./pages/myResume";
import Practice from './pages/practice';
import ResumeBuilder from "./pages/resumeBuilder";
import SimpleMap from "./pages/maps";

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
