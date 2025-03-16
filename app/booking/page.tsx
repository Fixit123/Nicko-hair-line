import BookingForm from '@/components/BookingForm'

const services = [
  "Braids",
  "Ponytail",
  "Dreads",
  "Hair Coloring",
  "Haircut",
  "Hair Treatment"
]

export default function BookingPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Book Your Appointment</h1>
      <BookingForm services={services} />
    </div>
  )
} 