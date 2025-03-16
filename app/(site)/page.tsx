"use client"

import React, { useState, useEffect, Suspense } from "react"
import type { ReactElement, SyntheticEvent } from 'react'
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import PageTransition from "@/components/PageTransition"

// Loading placeholder component
const LoadingPlaceholder = (): ReactElement => (
  <div className="bg-gray-100 rounded-lg p-8 w-full flex items-center justify-center" style={{ height: "400px" }}>
    <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
)

// Dynamically import components with loading states
const BookingForm = dynamic<{ services: string[] }>(() => import("@/components/BookingForm"), {
  loading: (): ReactElement => <LoadingPlaceholder />,
  ssr: false
})

const StackingCardScroll = dynamic<{ services: typeof allServices }>(() => import("@/components/StackingCardScroll"), {
  loading: (): ReactElement => <LoadingPlaceholder />,
  ssr: false
})

const TestimonialCarousel = dynamic<{ testimonials: typeof testimonials }>(() => import("@/components/TestimonialCarousel"), {
  loading: (): ReactElement => <LoadingPlaceholder />,
  ssr: false
})

const allServices = [
  {
    name: "Braids",
    imageSrc: "/image/braid.webp",
    description: "Expertly crafted braids for a stunning look.",
  },
  {
    name: "Ponytail",
    imageSrc: "/image/zopony.webp",
    description: "Sleek and stylish ponytails for a flawless look.",
  },
  {
    name: "Dreads",
    imageSrc: "/image/dreads.webp",
    description: "Stylish dreads that make a statement.",
  },
]

const testimonials = [
  {
    name: "Damilola Olayinka",
    service: "Braids",
    quote: "Best braids in the city! Nickos transformed my look completely.",
    
  },
  {
    name: "Blessing Olatunde",
    service: "Locks",
    quote: "The attention to detail with my locks was incredible. Highly recommend!",
    
  },
  {
    name: "Olaoluwa Olaiya",
    service: "Hair Coloring",
    quote: "My hair color has never looked better. The service here is top-notch.",
    
  },
]

const heroImages = [
  {
    src: "/image/hairfly.webp",
    alt: "A professional model with a modern braided hairstyle",
  },
  {
    src: "/image/hairwash.webp",
    alt: "A professional model with a stylish hair wash",
  },
]

// Preload images function
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    
    // Check if image is already in browser cache
    const img = new window.Image();
    img.src = src;
    
    // If image is already complete, resolve immediately
    if (img.complete) {
      resolve();
      return;
    }
    
    // Otherwise wait for load
    img.onload = () => resolve();
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      resolve(); // Resolve anyway to not block
    };
  });
};

export default function Home(): ReactElement {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  // Preload critical images - but don't block rendering
  useEffect(() => {
    // Preload all critical images in the background
    const preloadImages = async () => {
      try {
        // Use lower priority to not block main thread
        setTimeout(() => {
          Promise.all([
            ...heroImages.map(image => preloadImage(image.src)),
            preloadImage("/image/nicko.webp"),
            preloadImage("/image/paint2.webp")
          ]).catch(error => {
            console.error('Error preloading images:', error);
          });
        }, 100);
      } catch (error) {
        console.error('Error in preload setup:', error);
      }
    };

    preloadImages();
  }, []);

  // Simple image rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>): void => {
    e.currentTarget.src = "/placeholder.svg"
  }

  return (
    <PageTransition>
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          {/* Hero Section */}
          <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={heroImages[currentImageIndex].src || "/placeholder.svg"}
                alt={heroImages[currentImageIndex].alt}
                fill
                priority={true}
                loading="eager"
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={75}
                className="object-cover filter brightness-90"
                onError={handleImageError}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
            <div className="relative z-20 text-center text-white px-4">
              <h1 className="text-4xl md:text-7xl font-bold mb-4">
                Elevate Your Style
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Experience Unparalleled Hair Artistry at Nickos Hair
              </p>
              <div>
                <Link
                  href="#booking"
                  className="bg-gold text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300"
                >
                  Schedule Your Transformation
                </Link>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <Suspense fallback={<LoadingPlaceholder />}>
            <motion.section
              id="services"
              className="bg-white py-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Our Featured Services</h2>
                <StackingCardScroll services={allServices} />
                <div className="text-center mt-12">
                  <Link
                    href="/services"
                    className="bg-gold text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300"
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </motion.section>
          </Suspense>

          {/* Stylist Spotlight Section */}
          <Suspense fallback={<LoadingPlaceholder />}>
            <motion.section
              className="py-20 bg-gray-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <motion.div
                  className="md:w-1/2 mb-8 md:mb-0"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src="/image/nicko.webp"
                    alt="Professional portrait of Nickos, a skilled hair stylist"
                    width={500}
                    height={500}
                    priority
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </motion.div>
                <motion.div
                  className="md:w-1/2 md:pl-12"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Nickos</h2>
                  <p className="text-lg mb-6">
                    With 15 years of experience in transformative hair artistry, Nickos is dedicated to elevating your style
                    and confidence. His expertise ensures you receive the best service tailored to your unique needs.
                  </p>
                  <Link
                    href="#booking"
                    className="bg-yellow-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300"
                  >
                    Book with Nickos
                  </Link>
                </motion.div>
              </div>
            </motion.section>
          </Suspense>

          {/* Booking Section */}
          <Suspense fallback={<LoadingPlaceholder />}>
            <motion.section
              id="booking"
              className="relative py-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/image/paint2.webp"
                  alt="Salon interior"
                  fill
                  sizes="100vw"
                  quality={100}
                  className="brightness-50 object-cover"
                />
              </div>

              {/* Content Container */}
              <div className="relative z-10 container mx-auto px-4 text-center text-white">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="max-w-4xl mx-auto"
                >
                  <h2 className="text-5xl md:text-7xl font-bold mb-4">Find Your Confidence</h2>
                  <h3 className="text-3xl md:text-5xl font-bold mb-6">SAVE UP TO 30% OFF</h3>
                  <p className="text-sm mb-8 text-gray-300">
                    *Limited time offer. Terms and conditions apply. Valid for new clients only.
                  </p>

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-center mb-16"
                    >
                      <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Book Your Session</h2>
                      <p className="text-white-600 text-lg max-w-2xl mx-auto">
                        Schedule your appointment with our expert stylists
                      </p>
                    </motion.div>
                    <BookingForm services={allServices.map((service) => service.name)} />
                  </div>
                </motion.div>
              </div>
            </motion.section>
          </Suspense>

          {/* Testimonials Section */}
          <Suspense fallback={<LoadingPlaceholder />}>
            <motion.section
              id="testimonials"
              className="py-16 relative overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Background elements - simplified */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 -z-10"></div>
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
              
              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-8"
                >
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-2">What Our Clients Say</h2>
                  <div className="w-16 h-1 bg-black mx-auto mb-4"></div>
                  <p className="text-gray-600 text-base max-w-xl mx-auto">
                    Hear from our satisfied clients
                  </p>
                </motion.div>
                <TestimonialCarousel testimonials={testimonials} />
              </div>
            </motion.section>
          </Suspense>
        </div>
      </ErrorBoundary>
    </PageTransition>
  )
}

