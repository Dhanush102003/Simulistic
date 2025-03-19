import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, Box, Cpu, BookOpen } from 'lucide-react';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

const videos = [
    // First video path
  "/public/videos/Src (1).mp4",  // Second video path
  "/public/videos/Src (2).mp4",
  "/public/videos/854224-hd_1280_720_30fps.mp4"  // Third video path
];

const services = [
  {
    title: 'CFD',
    icon: <Activity className="w-8 h-8" />,
    description: 'Advanced Computational Fluid Dynamics solutions for complex flow analysis and optimization.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNlnvDvgj6VsDfd222Ma5TQSZTfQXdlUNpriBndMVlXhAyNd-ih7oimzQ&s'
  },
  {
    title: 'FEA',
    icon: <Box className="w-8 h-8" />,
    description: 'Comprehensive Finite Element Analysis for structural and thermal simulations.',
    image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.ansys.com%2Fis%2Fimage%2Fansys%2Fsim-ai-wp-crashsim%3Fwid%3D1030%26fmt%3Dwebp%26op_usm%3D0.9%2C1.0%2C20%2C0%26fit%3Dconstrain%2C0&tbnid=9OHPmALWEwcrqM&vet=10CAgQxiAoBmoXChMI6ODe19ORjAMVAAAAAB0AAAAAEAc..i&imgrefurl=https%3A%2F%2Fwww.ansys.com%2Fblog%2Faccelerating-automotive-safety-through-ai-powered-design&docid=d8jP4tqzmFz7xM&w=1030&h=397&itg=1&q=FEA%20crash%20image&ved=0CAgQxiAoBmoXChMI6ODe19ORjAMVAAAAAB0AAAAAEAc'
  },
  {
    title: 'CAD/Design',
    icon: <Cpu className="w-8 h-8" />,
    description: 'Innovative Computer-Aided Design solutions for product development.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    title: 'Mentoring',
    icon: <BookOpen className="w-8 h-8" />,
    description: 'Expert guidance and training in engineering simulation tools and methodologies.',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=800&h=600'
  }
];

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  useEffect(() => {
    // When current video index changes, play the new video
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.play();
    }
  }, [currentVideoIndex]);

  // Press Ctrl + Shift + A to toggle admin dashboard
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (showAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {videos.map((videoUrl, index) => (
            <video
              key={index}
              ref={el => videoRefs.current[index] = el}
              muted
              playsInline
              onEnded={handleVideoEnd}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                currentVideoIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ))}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        <div className="relative z-20 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-red-500">Sim</span>
            <span className="text-yellow-500">ulis</span>
            <span className="text-green-500">tic</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            Engineering Excellence Through Advanced Simulation
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Our Services
        </motion.h2>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rainbow-button bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors overflow-hidden group"
            >
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-white transform group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8"
          >
            About Simulistic
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 mb-6"
          >
            At Simulistic, we're pioneering the future of engineering through advanced simulation technologies. Our team of expert engineers and analysts brings decades of combined experience in CFD, FEA, and CAD/Design to deliver innovative solutions for complex engineering challenges.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300"
          >
            We believe in empowering the next generation of engineers through our comprehensive mentoring programs, sharing our expertise and insights to foster innovation and excellence in the field of engineering simulation.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Contact Us
        </motion.h2>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;