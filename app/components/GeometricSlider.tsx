"use client";

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Geometric Harmony",
    description: "Explore the perfect balance of shapes and colors",
    image: "/images/slide1.jpg",
    color: "#FF6B6B"
  },
  {
    id: 2,
    title: "Abstract Flow",
    description: "Where mathematics meets artistic expression",
    image: "/images/slide2.jpg",
    color: "#4ECDC4"
  },
  {
    id: 3,
    title: "Dynamic Forms",
    description: "Experience the movement of geometric patterns",
    image: "/images/slide3.jpg",
    color: "#45B7D1"
  }
];

export default function GeometricSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.2,
            zIndex: currentSlide === index ? 1 : 0
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-r"
            style={{ 
              backgroundImage: `linear-gradient(45deg, ${slide.color}88, transparent)` 
            }}
          />
          
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="max-w-4xl mx-auto px-6 text-white">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: currentSlide === index ? 0 : 20, opacity: currentSlide === index ? 1 : 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-6xl font-bold mb-4"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: currentSlide === index ? 0 : 20, opacity: currentSlide === index ? 1 : 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl"
              >
                {slide.description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
      >
        →
      </button>
    </div>
  );
} 