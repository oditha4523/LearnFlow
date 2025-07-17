import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import YasithImage from "../assets/Yasith.jpg";
import SachinthaImage from "../assets/Sachintha.jpg";
import AshiniImage from "../assets/Ashini.jpg";
import NimeshaImage from "../assets/Nimesha.jpg";
import OdithaImage from "../assets/Oditha.jpg";

const testimonials = [
  {
    id: 1,
    name: "Yasith Banula", 
    image: YasithImage,
    text: "Currently studying Computing and Information Systems at Sabaragamuwa University of Sri Lanka, I have skills in Tailwind CSS, MySQL, and Git, with a keen interest in AI and Front-End Development.",
  },
  {
    id: 2,
    name: "Sachintha Lakshan",
    image: SachinthaImage, 
    text: "𝐈 𝐚𝐦 𝐬𝐭𝐮𝐝𝐞𝐧𝐭 𝐚𝐭 𝐅𝐚𝐜𝐮𝐥𝐭𝐲 𝐨𝐟 𝐂𝐨𝐦𝐩𝐮𝐭𝐢𝐧𝐠 𝐒𝐚𝐛𝐚𝐫𝐚𝐠𝐚𝐦𝐮𝐰𝐚 𝐔𝐧𝐢𝐯𝐞𝐫𝐬𝐢𝐭𝐲 𝐨𝐟 𝐒𝐫𝐢 𝐋𝐚𝐧𝐤𝐚 .Currently, I'm 𝐥𝐞𝐚𝐫𝐧𝐢𝐧𝐠 and 𝐞𝐱𝐩𝐥𝐨𝐫𝐢𝐧𝐠  𝐌𝐄𝐑𝐍 𝐒𝐭𝐚𝐜𝐤 Web development  ,𝐉𝐚𝐯𝐚 & 𝐒𝐩𝐫𝐢𝐧𝐠 𝐁𝐨𝐨𝐭 – Backend development",
  },
  {
    id: 3,
    name: "Ashini Ranaweera",
    image: AshiniImage,
    text: "I'm a passionate and creative professional with a strong interest in data-driven insights, strategic project management, and user-centered design. I enjoy building meaningful digital experiences",
  },
  {
    id: 4,
    name: "Nimesha Herath",
    image: NimeshaImage,
    text: "I'm a passionate and creative frontend developer with a strong enthusiasm for modern web technologies, especially React. I enjoy bringing ideas to life through clean, responsive, and user-friendly interfaces. ",
  },
  {
    id: 5,
    name: "Oditha Weerasekara",
    image: OdithaImage,
    text: "I'm a with a strong interest in emerging technologies, system design, and user-centered development.",
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div 
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="text-center mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Our Team
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600"
        >
          Things that make it the best place to start trading
        </motion.p>
      </motion.div>

      <motion.div 
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="relative"
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper md:mb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id} className='h-full md:py-12 py-4'>
              <motion.div 
                variants={fadeIn('up', 0.3 * (index + 1))}
                className="text-center bg-white p-4 rounded-lg shadow-md h-full flex flex-col"
              >
                <motion.div 
                  variants={fadeIn('down', 0.4 * (index + 1))}
                  className="w-24 h-24 mx-auto mb-4"
                >
                  <motion.img
                    variants={fadeIn('up', 0.5 * (index + 1))}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </motion.div>
                <motion.div 
                  variants={fadeIn('up', 0.4 * (index + 1))}
                  className="flex justify-center mb-2"
                >
                  {[...Array(5)].map((_, starIndex) => (
                    <motion.span 
                      key={starIndex} 
                      variants={fadeIn('up', 0.1 * starIndex)}
                      className="text-blue-600"
                    >
                      ★
                    </motion.span>
                  ))}
                </motion.div>
                <motion.h3 
                  variants={textVariant(0.3)}
                  className="font-semibold text-xl mb-3"
                >
                  {testimonial.name}
                </motion.h3>
                <motion.p 
                  variants={fadeIn('up', 0.6 * (index + 1))}
                  className="text-gray-600"
                >
                  {testimonial.text}
                </motion.p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <motion.div 
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="flex justify-center gap-4 mt-8"
        >
          <motion.button 
            variants={fadeIn('right', 0.8)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-prev-custom w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
          >
            <BsChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button 
            variants={fadeIn('left', 0.8)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-next-custom w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
          >
            <BsChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
