import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center space-x-4"
      >
        <div className="bg-white/10 p-3 rounded-full">
          <Phone className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold">Phone</h3>
          <p className="text-gray-300">+91 (900) 392-3072</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex items-center space-x-4"
      >
        <div className="bg-white/10 p-3 rounded-full">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold">Location</h3>
          <p className="text-gray-300">24 - Saravanapati<br />Coimbatore, 641035</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex items-center space-x-4"
      >
        <div className="bg-white/10 p-3 rounded-full">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold">Email</h3>
          <p className="text-gray-300">dhanushbalakrishnan1102003@gmail.com</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactInfo