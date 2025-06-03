import React from 'react'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

const FeaturesSection = ({ onBecomePartner }) => {
  const features = [
    {
      icon: "🔍", 
      title: "Discover what you need",
      description: "Just enter a keyword, our AI and RAG system do the rest. From basics to advanced, you'll get a structured, trustworthy path.",
      size: "large"
    },
    {
      icon: "⚙️",
      title: "Visualize Your Journey", 
      description: "Interactive roadmap nodes offer key concepts, descriptions, and learning resources. Click to dive deeper.",
      size: "medium"
    },
    {
      icon: "🚀",
      title: "Start learning fast",
      description: "Get started immediately. No fluff just guided, intelligent learning that evolves with your goals.",
      size: "medium"
    },
    {
      icon: "📊",
      title: "Track Your Progress", 
      description: "Monitor your learning journey with detailed analytics and milestone tracking to stay motivated.",
      size: "medium"
    }
  ]

  return (
    <motion.section 
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="max-w-7xl mx-auto px-4 py-16"
    >
      <motion.div 
        variants={fadeIn('up', 0.3)}
        className="text-center mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          How Can We Guide Your Learning?
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Discover how our roadmap generator transforms self-learning in programming.
        </motion.p>
      </motion.div>
      
      {/* Bento Grid Container - New Layout */}
      <motion.div 
        variants={fadeIn('up', 0.5)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
      >
        {/* Left Side - CTA Card Only */}
        <motion.div 
          variants={fadeIn('right', 0.6)}
          className="flex flex-col"
        >
          <motion.div 
            variants={fadeIn('right', 0.7)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-center text-white hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-center"
          >
            <motion.h3 
              variants={textVariant(0.3)}
              className="text-3xl font-bold mb-6"
            >
              Ready to Transform Your Learning Journey?
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 0.8)}
              className="mb-8 text-blue-100 text-lg leading-relaxed"
            >
              Join thousands of learners who have accelerated their programming skills with our AI-powered roadmaps. Start your personalized learning journey today.
            </motion.p>
            <motion.button 
              variants={fadeIn('up', 0.9)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg text-lg mx-auto"
              onClick={onBecomePartner}
            >
              GET STARTED NOW
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Side - 2x2 Grid of Feature Cards */}
        <motion.div 
          variants={fadeIn('left', 0.6)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Feature Card 1 - Top Left */}
          <motion.div 
            variants={fadeIn('left', 0.7)}
            className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-3xl p-4 hover:shadow-2xl transition-all duration-300 group"
          >
            <motion.div 
              variants={fadeIn('down', 0.8)}
              className="w-10 h-10 bg-purple-200 rounded-xl mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto"
            >
              <motion.span 
                variants={fadeIn('up', 0.9)}
                className="text-sm"
              >
                {features[0].icon}
              </motion.span>
            </motion.div>
            <motion.h3 
              variants={textVariant(0.4)}
              className="text-sm font-bold mb-2 text-gray-800 text-center"
            >
              {features[0].title}
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 1.0)}
              className="text-gray-600 leading-relaxed text-xs text-center"
            >
              {features[0].description}
            </motion.p>
          </motion.div>

          {/* Feature Card 2 - Top Right */}
          <motion.div 
            variants={fadeIn('left', 0.8)}
            className="bg-gradient-to-br from-red-50 to-pink-100 rounded-3xl p-4 hover:shadow-2xl transition-all duration-300 group"
          >
            <motion.div 
              variants={fadeIn('down', 0.9)}
              className="w-10 h-10 bg-red-200 rounded-xl mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto"
            >
              <motion.span 
                variants={fadeIn('up', 1.0)}
                className="text-sm"
              >
                {features[1].icon}
              </motion.span>
            </motion.div>
            <motion.h3 
              variants={textVariant(0.5)}
              className="text-sm font-bold mb-2 text-gray-800 text-center"
            >
              {features[1].title}
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 1.1)}
              className="text-gray-600 leading-relaxed text-xs text-center"
            >
              {features[1].description}
            </motion.p>
          </motion.div>

          {/* Feature Card 3 - Bottom Left */}
          <motion.div 
            variants={fadeIn('left', 0.9)}
            className="bg-gradient-to-br from-orange-50 to-yellow-100 rounded-3xl p-4 hover:shadow-2xl transition-all duration-300 group"
          >
            <motion.div 
              variants={fadeIn('down', 1.0)}
              className="w-10 h-10 bg-orange-200 rounded-xl mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto"
            >
              <motion.span 
                variants={fadeIn('up', 1.1)}
                className="text-sm"
              >
                {features[2].icon}
              </motion.span>
            </motion.div>
            <motion.h3 
              variants={textVariant(0.6)}
              className="text-sm font-bold mb-2 text-gray-800 text-center"
            >
              {features[2].title}
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 1.2)}
              className="text-gray-600 leading-relaxed text-xs text-center"
            >
              {features[2].description}
            </motion.p>
          </motion.div>

          {/* Feature Card 4 - Bottom Right */}
          <motion.div 
            variants={fadeIn('left', 1.0)}
            className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-4 hover:shadow-2xl transition-all duration-300 group"
          >
            <motion.div 
              variants={fadeIn('down', 1.1)}
              className="w-10 h-10 bg-green-200 rounded-xl mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto"
            >
              <motion.span 
                variants={fadeIn('up', 1.2)}
                className="text-sm"
              >
                {features[3].icon}
              </motion.span>
            </motion.div>
            <motion.h3 
              variants={textVariant(0.7)}
              className="text-sm font-bold mb-2 text-gray-800 text-center"
            >
              {features[3].title}
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 1.3)}
              className="text-gray-600 leading-relaxed text-xs text-center"
            >
              {features[3].description}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default FeaturesSection