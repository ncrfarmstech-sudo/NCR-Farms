import React from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import FeaturedProductDetails from './pages/FeaturedProductDetails';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Footer from './components/common/Footer';



import { ContactUsProvider } from './context/ContactUsContext';
import { PropertiesProvider } from './context/PropertiesContext';
import { FeaturedProductsProvider } from './context/FeaturedProductsContext';


import WhatsappAndCallsButton from './components/common/WhatsappAndCallsButton';




function App() {
  return (
    <ContactUsProvider>
      <PropertiesProvider>
        <FeaturedProductsProvider>



          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/featured-products/:id" element={<FeaturedProductDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
          <Footer />




          <WhatsappAndCallsButton />
          <ToastContainer />
        </FeaturedProductsProvider>
      </PropertiesProvider>
    </ContactUsProvider>
  );
}

export default App;
