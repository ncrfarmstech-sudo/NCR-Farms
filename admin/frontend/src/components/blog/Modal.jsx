import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4 overflow-y-auto" style={{ zIndex: 1100 }}>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl relative animate-fade-in my-8" style={{ zIndex: 1200, maxHeight: '90vh', overflowY: 'auto' }}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
