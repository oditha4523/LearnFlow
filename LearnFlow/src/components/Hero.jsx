import React from 'react'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import heroImage from '../assets/astro2.png'

const Hero = () => {
  return (
    <section
      id="home"
      className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-16 max-w-7xl mx-auto"
    >
      {/* Left Column */}
      <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
        {/* Optional Badge */}
        {/* <motion.div variants={fadeIn('right', 0.2)} initial="hidden" whileInView="show">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
            <span className="text-blue-600">★</span>
            <span className="text-sm font-medium">Jump start your growth</span>
          </div>
        </motion.div> */}

        {/* Title */}
        <motion.h1
          variants={textVariant(0.3)}
          initial="hidden"
          whileInView="show"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
        >
          Empower Your{' '}
          <span className="text-blue-600 relative inline-block">
            Programming Journey
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-200/60"></span>
          </span>{' '}
          with AI-Powered Roadmaps
          <span className="inline-block ml-2 animate-pulse">⏰</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          className="text-gray-600 text-base sm:text-lg md:text-xl max-w-xl mx-auto md:mx-0"
        >
          Get the most accurate leads, sales team training, conversions, and tools — all in one place, one billing.
        </motion.p>

        {/* Call to Action Buttons (optional) */}
        <motion.div
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          whileInView="show"
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <a
            href="#get-started"
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Right Column - Hero Image */}
      <motion.div
        variants={fadeIn('left', 0.5)}
        initial="hidden"
        whileInView="show"
        className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end"
      >
        <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <img
            src={heroImage}
            alt="AI Programming Illustration"
            className="rounded-xl relative z-10 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
