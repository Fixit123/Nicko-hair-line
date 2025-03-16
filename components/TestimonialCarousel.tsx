"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  name: string
  service: string
  quote: string
  image?: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial()
    }, 5000) // Auto-advance every 5 seconds

    return () => clearInterval(timer)
  }, []) // Fixed dependency

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-100/30 via-pink-100/30 to-blue-100/30 rounded-xl transform rotate-1 scale-105 blur-sm"></div>
      
      {/* Testimonial indicators */}
      <div className="flex justify-center space-x-2 mb-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-black w-5" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-white/80 backdrop-blur-md">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="p-6 md:p-8 relative"
          >
            <div className="absolute top-4 left-4 text-black/10">
              <Quote size={50} strokeWidth={1} />
            </div>
            
            <div className="relative z-10 ml-6 mt-4">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl italic mb-4 text-gray-800 leading-relaxed"
              >
                "{testimonials[currentIndex].quote}"
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="border-t border-gray-200 pt-3"
              >
                <p className="font-semibold">{testimonials[currentIndex].name}</p>
                <p className="text-gray-600 text-sm">{testimonials[currentIndex].service}</p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <button
        onClick={prevTestimonial}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white hover:scale-105 transition duration-300 z-10"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={18} className="text-gray-800" />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white hover:scale-105 transition duration-300 z-10"
        aria-label="Next testimonial"
      >
        <ChevronRight size={18} className="text-gray-800" />
      </button>
    </div>
  )
}

