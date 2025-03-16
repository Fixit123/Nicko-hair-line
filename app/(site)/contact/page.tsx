"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import BookingForm from "@/components/BookingForm"
import ContactForm from "@/app/components/ContactForm"

const services = [
  "Haircut",
  "Hair Coloring",
  "Highlights",
  "Balayage",
  "Hair Treatment",
  "Styling",
  "Blowout",
  "Extensions"
]

export default function Contact() {
  return (
    <section className="bg-[#FDFBF7] relative">
      {/* Subtle geometric patterns */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Professional accent elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-24">
        {/* Elegant Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 text-gray-900">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Get in touch with us for appointments, inquiries, or any questions you may have
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-sm">
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-playfair font-semibold mb-6 text-gray-900">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">Ogo-oluwa Street Gas-line ,
                    Ijoko Ota Ogun State.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+234 7037042790</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">Nickoshair94@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-playfair font-semibold mb-6 text-gray-900">Business Hours</h2>
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium text-gray-900">Monday - Friday</h3>
                    <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Saturday</h3>
                    <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Sunday</h3>
                    <p className="text-gray-600">Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 