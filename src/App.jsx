import React, {} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile/Profile';
import Home from './pages/home/Home';
import Auth from './pages/Auth/Auth';
import Chat from './pages/Chat/Chat';

function App() {
  return (
    <>
      <div className="App">
        <div className="blur" style={{ top: '-18%', right: '0' }} />
        <div className="blur" style={{ top: '36%', left: '-8rem' }} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
