import React from "react";
import './App.css';
import Main from './pages/main/main';
import { Route, Routes} from 'react-router-dom';
import Resume from './pages/resume/resume';
import Practice from './pages/practice/practice';

function App() {
  return (
    <>
      <div className="container"> 
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/test" element={<></>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
