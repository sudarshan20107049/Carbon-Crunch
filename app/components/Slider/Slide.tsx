'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SlideProps } from './types';
import Image from 'next/image';

export const Slide: React.FC<SlideProps> = ({
  title,
  description,
  imageUrl,
  color,
  isActive,
  index,
  totalSlides,
}) => {
  const slideVariants = {
    enter: {
      x: '100%',
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: '-100%',
      opacity: 0,
    },
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className={`absolute inset-0 flex items-center justify-center ${color} overflow-hidden`}
      initial="enter"
      animate={isActive ? "center" : "exit"}
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          className="text-white space-y-4"
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <h2 className="text-4xl md:text-6xl font-bold">{title}</h2>
          <p className="text-lg md:text-xl opacity-90">{description}</p>
          <div className="flex items-center space-x-2 text-sm">
            <span>{index + 1}</span>
            <div className="w-12 h-0.5 bg-white/50" />
            <span>{totalSlides}</span>
          </div>
        </motion.div>

        <motion.div
          className="relative h-[300px] md:h-[500px] w-full"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={isActive ? { scale: 1, opacity: 1 } : { scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-lg"
            priority={index === 0}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}; 