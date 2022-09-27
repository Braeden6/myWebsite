import './App.css';
import Main from './pages/main/main';
import { Route, Routes} from 'react-router-dom';
import Resume from './pages/resume/resume';

function App() {
  return (
    <>
      <div className="container"> 
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
