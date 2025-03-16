"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ServiceCard from "./ServiceCard"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Service {
  name: string
  imageSrc: string
  description: string
}

interface StackingCardScrollProps {
  services: Service[]
}

export default function StackingCardScroll({ services }: StackingCardScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [direction, setDirection] = useState(0)

  // Check if mobile and update on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const totalPages = isMobile ? services.length : 1

  const nextPage = () => {
    if (!isMobile) return
    setDirection(1)
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    if (!isMobile) return
    setDirection(-1)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  // Auto-advance slides every 5 seconds on mobile only
  useEffect(() => {
    if (!isMobile) return
    
    const timer = setInterval(() => {
      nextPage()
    }, 5000)
    return () => clearInterval(timer)
  }, [isMobile, totalPages])

  return (
    <div ref={containerRef} className="relative min-h-[80vh] py-10">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-white to-gold/5">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative mx-auto px-4 z-10">
        <div className="relative overflow-hidden">
          {isMobile ? (
            // Mobile View with Sliding
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                initial={{ 
                  x: direction > 0 ? "100%" : "-100%",
                  opacity: 0 
                }}
                animate={{ 
                  x: 0,
                  opacity: 1 
                }}
                exit={{ 
                  x: direction < 0 ? "100%" : "-100%",
                  opacity: 0 
                }}
                transition={{
                  x: { type: "tween", duration: 0.3 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full px-4"
              >
                <div className="w-full">
                  <ServiceCard {...services[currentPage]} />
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            // Desktop/Tablet View with Grid
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Navigation Buttons - Only show on mobile */}
          {isMobile && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={prevPage}
                className="pointer-events-auto -translate-x-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextPage}
                className="pointer-events-auto translate-x-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all z-20"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          )}

          {/* Pagination Dots - Only show on mobile */}
          {isMobile && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentPage ? 1 : -1)
                    setCurrentPage(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentPage === index ? 'bg-gold w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

