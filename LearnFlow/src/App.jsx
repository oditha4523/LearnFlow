
import React from 'react';
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/signup.jsx";
import HomePage from './Pages/HomePage.jsx';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </main>
  );
}

export default App;
