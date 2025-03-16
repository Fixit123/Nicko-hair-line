import type React from "react"
import "./globals.css"
import { Poppins, Playfair_Display } from "next/font/google"
import Script from "next/script"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
})

const playfair = Playfair_Display({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
})

export const metadata = {
  title: "Nickos Hair | Professional Hair Styling Services",
  description: "Elevate Your Crown at Nickos Hair - Expert Hair Styling Services. Book your appointment for braids, weaving, dreads, and more.",
  keywords: "hair salon, braids, weaving, dreads, hair styling, professional hair care",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable} preload`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <Script id="prevent-flash" strategy="beforeInteractive">
          {`
            (function() {
              // Create a style element to hide the body initially
              var style = document.createElement('style');
              style.textContent = 'body { opacity: 0 !important; }';
              document.head.appendChild(style);
              
              // Preload critical fonts and images
              var fontPreloadLinks = [
                { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap', rel: 'preload', as: 'style' },
                { href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap', rel: 'preload', as: 'style' }
              ];
              
              fontPreloadLinks.forEach(function(linkData) {
                var link = document.createElement('link');
                link.rel = linkData.rel;
                link.href = linkData.href;
                link.as = linkData.as;
                document.head.appendChild(link);
              });
              
              // Preload critical images
              var imagePreloadLinks = [
                '/image/hairfly.webp',
                '/image/hairwash.webp',
                '/image/nicko.webp',
                '/image/paint2.webp'
              ];
              
              imagePreloadLinks.forEach(function(src) {
                var link = document.createElement('link');
                link.rel = 'preload';
                link.href = src;
                link.as = 'image';
                document.head.appendChild(link);
              });
              
              // Remove the style when the page is fully loaded
              window.addEventListener('load', function() {
                // Use double requestAnimationFrame for smoother transition
                requestAnimationFrame(function() {
                  requestAnimationFrame(function() {
                    style.textContent = '';
                  });
                });
              });
            })();
          `}
        </Script>
      </head>
      <body className={`min-h-screen flex flex-col bg-white overflow-x-hidden w-full ${poppins.className}`}>
        <div className="content-wrapper w-full flex-grow flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}

