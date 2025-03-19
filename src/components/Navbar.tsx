import React, { useState } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import JobModal from './JobModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);

  const navItems = ['Home', 'Services', 'About', 'Contact'];

  return (
    <>
      <nav className="fixed w-full bg-black/90 text-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex-shrink-0 text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-red-500">Sim</span>
              <span className="text-yellow-500">ulis</span>
              <span className="text-green-500">tic</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="rainbow-button hover:text-gray-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  onClick={() => setShowJobModal(true)}
                  className="rainbow-button bg-white/10 px-4 py-2 rounded-md hover:bg-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Us
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rainbow-button inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="rainbow-button block px-3 py-2 text-base font-medium hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => {
                  setShowJobModal(true);
                  setIsOpen(false);
                }}
                className="rainbow-button block w-full text-left px-3 py-2 text-base font-medium hover:text-gray-300"
              >
                Join Us
              </button>
            </div>
          </motion.div>
        )}
      </nav>
      <JobModal isOpen={showJobModal} onClose={() => setShowJobModal(false)} />
    </>
  );
};

export default Navbar;