import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black/90 text-white py-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-400">
          © {currentYear} Simulistic. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;