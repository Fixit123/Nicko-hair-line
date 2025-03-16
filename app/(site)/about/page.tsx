import Image from "next/image"
import Link from "next/link"

export default function About() {
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
            About Nickos Hair
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-12">
            Where passion meets expertise in creating beautiful, confident looks
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/image/nickobrand.webp"
              alt="Nickos Hair Salon"
              width={500}
              height={300}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
          
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-sm">
              <h2 className="text-3xl font-playfair font-semibold mb-4 text-gray-900">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Founded in 2010, Nickos Hair has been at the forefront of hair artistry, combining traditional techniques
                with cutting-edge trends. Our passion for hair and commitment to excellence have made us a trusted name in
                the industry.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-sm">
              <h2 className="text-3xl font-playfair font-semibold mb-4 text-gray-900">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At Nickos Hair, we believe that every client deserves to feel confident and beautiful. Our mission is to
                provide exceptional hair services that not only meet but exceed our clients' expectations, helping them
                express their unique style and personality.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center justify-center bg-gold/90 hover:bg-gold text-white py-3 px-6 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ease-out"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 