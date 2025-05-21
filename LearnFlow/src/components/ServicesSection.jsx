import React from 'react'
import { BsStack } from 'react-icons/bs'
import { HiLightBulb } from 'react-icons/hi'
import { FiSettings } from 'react-icons/fi'
import { BiTime } from 'react-icons/bi'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

const ServicesSection = () => {
  const services = [
    {
      icon: <BsStack className="w-8 h-8 text-indigo-600" />,
      title: "Web Design",
      description: "One for all and all for one, Muskehounds are always ready.",
      link: "#learn-more"
    },
    {
      icon: <HiLightBulb className="w-8 h-8 text-amber-400" />,
      title: "Ad-Creatives", 
      description: "Alphabet Village and the subline of her own road.",
      link: "#learn-more"
    },
    {
      icon: <FiSettings className="w-8 h-8 text-red-400" />,
      title: "Automation",
      description: "Little Blind Text should turn around and return.",
      link: "#learn-more"
    },
    {
      icon: <BiTime className="w-8 h-8 text-cyan-400" />,
      title: "Infographics",
      description: "Nothing the copy said could convince her.",
      link: "#learn-more"
    }
  ]

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div
        variants={fadeIn('up', 0.3)}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-16"
      >
        {/* Header */}
        <motion.div 
          variants={fadeIn('right', 0.4)}
          className="w-full lg:w-1/2"
        >
          <motion.h2 
            variants={textVariant(0.2)}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            Personalize Your Learning with Smart Features
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 0.5)}
            className="text-gray-600 text-lg mb-6"
          >
            Customize your journey, stay organized, and unlock your full potential with tools built for modern learners. Discuss your learning goals, track achievements, and overcome challenges with ease.
          </motion.p>
          <motion.div 
            variants={fadeIn('up', 0.6)}
            className="space-y-4"
          >
            <motion.div 
              variants={fadeIn('right', 0.7)}
              className="flex items-start gap-3"
            >
              <div className="w-5 h-5 mt-1 rounded-full bg-indigo-100 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
              </div>
              <span className="text-gray-600 text-base">Personalized learning paths</span>
            </motion.div>
            <motion.div 
              variants={fadeIn('right', 0.8)}
              className="flex items-start gap-3"
            >
              <div className="w-5 h-5 mt-1 rounded-full bg-indigo-100 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
              </div>
              <span className="text-gray-600 text-base">AI-enhanced topic suggestions</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={fadeIn('left', 0.4)}
          className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={fadeIn('up', 0.3 * (index + 1))}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <motion.div 
                variants={fadeIn('down', 0.4 * (index + 1))}
                className="mb-4"
              >
                {service.icon}
              </motion.div>
              <motion.h3 
                variants={textVariant(0.3)}
                className="text-xl font-semibold mb-2"
              >
                {service.title}
              </motion.h3>
              <motion.p 
                variants={fadeIn('up', 0.5 * (index + 1))}
                className="text-gray-600 mb-4 text-sm sm:text-base"
              >
                {service.description}
              </motion.p>
              <motion.a 
                variants={fadeIn('up', 0.6 * (index + 1))}
                href={service.link}
                className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
              >
                LEARN MORE
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ServicesSection
