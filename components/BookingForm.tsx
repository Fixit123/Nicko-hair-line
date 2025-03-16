"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface BookingFormProps {
  services: string[]
}

export default function BookingForm({ services }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [customService, setCustomService] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [customTime, setCustomTime] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")
    setError("")
    
    // Save a reference to the form
    const form = e.currentTarget
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: selectedService === "other" ? customService : selectedService,
      date: formData.get("date"),
      time: selectedTime === "custom" ? customTime : selectedTime,
    }

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit booking")
      }

      setMessage("Booking request sent successfully! We'll confirm your appointment shortly.")
      form.reset() // Use the saved reference instead
      setSelectedService("")
      setCustomService("")
      setSelectedTime("")
      setCustomTime("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-2xl mx-auto border border-white/20"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 bg-white/80 text-black placeholder-gray-500 transition-all duration-200"
              placeholder="Your name"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 bg-white/80 text-black placeholder-gray-500 transition-all duration-200"
              placeholder="your.email@example.com"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 bg-white/80 text-black placeholder-gray-500 transition-all duration-200"
              placeholder="(123) 456-7890"
            />
          </motion.div>

          <motion.div 
            className="space-y-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              Service
            </label>
            <select
              name="service"
              id="service"
              required
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 bg-white/80 text-black transition-all duration-200"
            >
              <option value="" className="text-gray-500">Select a service</option>
              {services.map((service) => (
                <option key={service} value={service} className="text-black">
                  {service}
                </option>
              ))}
              <option value="other">Other (specify)</option>
            </select>
            {selectedService === "other" && (
              <motion.input
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                type="text"
                value={customService}
                onChange={(e) => setCustomService(e.target.value)}
                placeholder="Enter your desired service"
                required
                className="mt-2 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 bg-white/80 text-black placeholder-gray-500 transition-all duration-200"
              />
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              required
              min={new Date().toISOString().split("T")[0]}
              className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 bg-white/80 text-black transition-all duration-200"
            />
          </motion.div>

          <motion.div 
            className="space-y-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <select
              name="time"
              id="time"
              required
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 bg-white/80 text-black transition-all duration-200"
            >
              <option value="" className="text-gray-500">Select a time</option>
              {[...Array(11)].map((_, i) => {
                const hour = i + 9 // Start from 9 AM
                const time = `${hour.toString().padStart(2, "0")}:00`
                return (
                  <option key={time} value={time} className="text-black">
                    {time}
                  </option>
                )
              })}
              <option value="custom">Other time (specify)</option>
            </select>
            {selectedTime === "custom" && (
              <motion.input
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                type="time"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 bg-white/80 text-black transition-all duration-200"
              />
            )}
          </motion.div>
        </div>

        <div className="flex flex-col items-center space-y-4 pt-4">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto px-10 py-4 bg-black/90 text-white font-medium rounded-full hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md backdrop-blur-sm"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Book Appointment"
            )}
          </motion.button>

          {message && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 text-center font-medium bg-green-50/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-green-100/50 shadow-sm w-full"
            >
              {message}
            </motion.p>
          )}
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-center font-medium bg-red-50/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-red-100/50 shadow-sm w-full"
            >
              {error}
            </motion.p>
          )}
        </div>
      </form>
    </motion.div>
  )
}

