import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Documentation from './components/Documentation/Documentation';
import ErrorPage from './components/Utils/ErrorPage';
import Home from './components/Home';
import Login from './components/Authentification/Login';
import Preferences from './components/Preferences/Preferences';
import Register from './components/Authentification/Register';
import { RequireAuth } from 'react-auth-kit';
import Compare from './components/Compare/Compare';
import StockContext from './store/StockContext';
import StockType from './models/StockType';
import { useState } from 'react';
import { Analysis } from './models/Analysis';
import Allocation from './components/Allocation/Allocation';

function App() {
  const [stockData, setStockData] = useState<StockType>();
  const [analysis, setAnalysis] = useState<Analysis>();
  return (
    <StockContext.Provider value={{
        stock: stockData,
        setStock: setStockData,
        analysis: analysis,
        setAnalysis: setAnalysis,
      }}>
      <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/docs" element={<Documentation/>}/>
            <Route path="/Allocation" element={
              <RequireAuth loginPath='/login'>
                <Allocation/>
              </RequireAuth>
            }/>
            <Route path="/pref"  element={
              <RequireAuth loginPath='/login'>
                <Preferences/>
              </RequireAuth>
            }/>
            <Route path="/compare" element={
              <Compare/>
            }/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </Router>
    </StockContext.Provider>
  );
}

export default App;
