import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Documentation from './components/Documentation/Documentation';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Preferences from './components/Preferences';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/docs" element={<Documentation/>}/>
          <Route path="/pref" element={<Preferences/>}/>
          <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
