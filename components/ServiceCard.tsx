"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

interface ServiceCardProps {
  name: string
  imageSrc: string
  description: string
}

export default function ServiceCard({ name, imageSrc, description }: ServiceCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className="mb-6 relative h-64 w-full" 
        style={{ position: 'relative', minHeight: '16rem' }}
      >
        <Image 
          src={imageError ? "/placeholder.svg" : imageSrc} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-md object-cover" 
          onError={() => setImageError(true)}
          priority={name === "Dreads"}
        />
      </div>
      <h3 className="text-2xl font-semibold mb-3">{name}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </motion.div>
  )
}

