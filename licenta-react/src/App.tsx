import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Documentation from './components/Documentation/Documentation';
import ErrorPage from './components/Utils/ErrorPage';
import Home from './components/Home';
import Login from './components/Authentification/Login';
import Preferences from './components/Preferences/Preferences';
import Register from './components/Authentification/Register';
import { RequireAuth } from 'react-auth-kit';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/docs" element={<Documentation/>}/>
          <Route path="/pref"  element={
            <RequireAuth loginPath='/login'>
              <Preferences/>
            </RequireAuth>
          }/>
          <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
