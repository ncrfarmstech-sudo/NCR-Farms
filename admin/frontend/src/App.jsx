import Navbar from './components/common/Navbar';
import AppRoutes from './AppRoutes';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="flex">
    <Navbar />
    <div className="flex-1">
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  </div>
);

export default App;