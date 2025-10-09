import React from 'react'
import './App.css'

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Home from './components/Home/Home';
import Blog from './pages/Blog';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';


import { ContactUsProvider } from './context/ContactUsContext';
import { PropertiesProvider } from './context/PropertiesContext';
import { FeaturedProductsProvider } from './context/FeaturedProductsContext';




function App() {
  return (
    <ContactUsProvider>
      <PropertiesProvider>
        <FeaturedProductsProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </FeaturedProductsProvider>
      </PropertiesProvider>
    </ContactUsProvider>
  );
}

export default App;
