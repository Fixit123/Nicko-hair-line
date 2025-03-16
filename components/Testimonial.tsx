import Image from "next/image"

interface TestimonialProps {
  imageSrc: string
  quote: string
  name: string
}

export default function Testimonial({ imageSrc, quote, name }: TestimonialProps) {
  return (
    <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={`Client ${name}`}
        width={100}
        height={100}
        className="mx-auto mb-4 rounded-full"
      />
      <p className="italic">{quote}</p>
      <p className="font-semibold mt-2">- {name}</p>
    </div>
  )
}

