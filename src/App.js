import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Importa el componente Footer
import Add from './screens/add'; 
import Inicio from './screens/inicio'; 
import Edit from './screens/edit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />  
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
