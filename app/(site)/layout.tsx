"use client"

import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { useEffect, useState } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const [renderError, setRenderError] = useState<Error | null>(null)

  useEffect(() => {
    try {
      setMounted(true)
      
      const handleBeforeUnload = () => {
        sessionStorage.setItem('pageRefreshed', 'true')
      }
      
      window.addEventListener('beforeunload', handleBeforeUnload)
      
      const wasRefreshed = sessionStorage.getItem('pageRefreshed') === 'true'
      if (wasRefreshed) {
        sessionStorage.removeItem('pageRefreshed')
        
        try {
          const timer = setTimeout(() => {
            window.location.reload()
          }, 0)
          
          return () => clearTimeout(timer)
        } catch (error) {
          setRenderError(error instanceof Error ? error : new Error(String(error)))
        }
      }
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    } catch (error) {
      setRenderError(error instanceof Error ? error : new Error(String(error)))
    }
  }, [mounted])

  if (renderError) {
    throw renderError
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-gold animate-spin"></div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen w-full">
        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
        <main className="flex-grow w-full">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
} 