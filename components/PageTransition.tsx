"use client"

import { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [contentReady, setContentReady] = useState(false)

  useEffect(() => {
    // Mark as mounted on client
    setMounted(true)
    
    // Add a class to the document to prevent animations during loading
    document.documentElement.classList.add('preload')
    
    // Preload critical resources
    const preloadResources = async () => {
      // Wait for browser to complete initial render
      await new Promise(resolve => requestAnimationFrame(() => {
        requestAnimationFrame(resolve)
      }))
      
      // Wait for window load event to ensure all resources are loaded
      if (document.readyState !== 'complete') {
        await new Promise(resolve => window.addEventListener('load', resolve, { once: true }))
      }
      
      // Add a small delay after load to ensure everything is ready
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Hide loading screen with fade effect
      setLoading(false)
      
      // Wait for loading screen to fade out before showing content
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Remove the preload class to allow animations
      document.documentElement.classList.remove('preload')
      
      // Show content
      setContentReady(true)
    }
    
    preloadResources()
    
    // Handle page visibility changes (e.g., when user switches tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // When page becomes visible again, ensure content is shown
        setLoading(false)
        setTimeout(() => {
          document.documentElement.classList.remove('preload')
          setContentReady(true)
        }, 300)
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.body.style.overflow = ''
      document.documentElement.classList.remove('preload')
    }
  }, [])

  // Don't render anything during SSR
  if (!mounted) return null

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            className="fixed inset-0 bg-white z-[9999] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            key="loader"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading amazing hair experiences...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div style={{ visibility: contentReady ? 'visible' : 'hidden' }}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: contentReady ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      </div>
    </>
  )
} 