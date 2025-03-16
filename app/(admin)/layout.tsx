import "../globals.css"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Nickos Hair',
  description: 'Admin dashboard for managing bookings and messages',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This is a simple wrapper that doesn't add HTML or body tags
  return children;
} 