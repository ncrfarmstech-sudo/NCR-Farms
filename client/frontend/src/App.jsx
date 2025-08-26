import React from 'react'
import './App.css'

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Home from './components/Home/Home';
import Blog from './pages/Blog';
import Properties from './pages/Properties';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';

import { ContactUsProvider } from './context/ContactUsContext';
import { PropertiesProvider } from './context/PropertiesContext';




function App() {
  return (
    <ContactUsProvider>
      <PropertiesProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </PropertiesProvider>
    </ContactUsProvider>
  );
}

export default App;
