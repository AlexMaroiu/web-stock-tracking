import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import SearchPage from './pages/Search';

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
