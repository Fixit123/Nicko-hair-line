import Image from "next/image"
import Link from "next/link"

const services = [
  {
    name: "Pedicure",
    description: "Perfectly groomed feet for a soft and polished look.",
    image: "/image/pedicure.webp",
  },
  {
    name: "Nails",
    description: "Beautifuly designed nails for a classy finish.",
    image: "/image/alinails.webp",
  },
  {
    name: "Facials",
    description: "Refresh and glow woth our rejuvenating facial treatments.",
    image: "/image/facial.webp",
  },
  {
    name: "Didi",
    description: "Neatly woven didi hairstyle for a classic and elegant look.",
    image: "/image/zoeyw2.webp",
  },
  {
    name: "Eye Lashes",
    description: "Delicately curled eyelashes for a bold and captivating look.",
    image: "/image/eyelash.webp",
  },
  {
    name: "Wigs",
    description: "Stylish and versatile wigs for a flawless, natural look.",
    image: "/image/wigs.webp",
  },
]

export default function Services() {
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
            Our Services
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience the artistry of our expert stylists with our comprehensive range of premium hair services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {services.map((service) => (
            <div 
              key={service.name} 
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out"
            >
              {/* Service Image Container */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
              </div>

              {/* Service Content */}
              <div className="p-8">
                <h2 className="text-2xl font-playfair font-semibold mb-3 text-gray-900">{service.name}</h2>
                <p className="text-gray-600 mb-6 line-clamp-2">{service.description}</p>
              </div>

              {/* Elegant Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-4 right-4 w-px h-8 bg-gold/20 transform rotate-45"></div>
                <div className="absolute top-4 right-4 w-8 h-px bg-gold/20 transform rotate-45"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 