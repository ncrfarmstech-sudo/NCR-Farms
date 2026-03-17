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




const MAINTENANCE = true;

function App() {
  if (MAINTENANCE) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f9f6] px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#234436] mb-4">
          🚧 Under Maintenance
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-6 leading-relaxed">
          We're currently making some improvements to serve you better. Please check back shortly.
        </p>
        <p className="text-sm text-gray-400">— NCR Farms Team</p>
      </div>
    );
  }

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
