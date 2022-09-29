import './App.css';
import Main from './pages/main/main';
import { Route, Routes} from 'react-router-dom';
import Resume from './pages/resume/resume';
import Practice from './pages/pratice/pratice';

function App() {
  return (
    <>
      <div className="container"> 
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/practice" element={<Practice/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
