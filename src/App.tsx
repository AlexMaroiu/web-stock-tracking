import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CandleStickChart from './components/CandleStickChart';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
