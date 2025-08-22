import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" style={{ zIndex: 1100 }}>
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative animate-fade-in flex flex-col max-h-[90vh]"
        style={{ zIndex: 1200 }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="overflow-y-auto flex-1 pr-2" style={{ maxHeight: '70vh' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
