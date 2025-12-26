import { Truck, Factory, Droplets, Leaf, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SectorsSection() {
  const sectors = [
    {
      title: "Construction & Infrastructure",
      description: "Building national highways, state roads, and bridges with advanced machinery.",
      image: "/images/site-view-1.jpg",
      icon: Truck
    },
    {
      title: "Oil & Gas Industrial",
      description: "Specialized civil, structural, and piping works for refineries (IOCL, HURL).",
      image: "/images/facility-wide.jpg",
      icon: Factory
    },
    {
      title: "Irrigation & Canals",
      description: "Large-scale canal lining and water resource management projects.",
      image: "/images/site-view-2.jpg",
      icon: Droplets
    },
    {
      title: "Ethanol Production",
      description: "Sustainable energy contribution through our grain-based ethanol plant.",
      image: "/images/site-view-7.jpg",
      icon: Leaf
    }
  ]

  return (
    <section id="sectors" className="py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[#F28C28] font-bold uppercase tracking-wider text-sm">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#0B2C4D]">Key Business Sectors</h2>
          </div>
          <Link href="/projects">
            <Button variant="outline" className="hidden md:flex border-[#0B2C4D] text-[#0B2C4D] hover:bg-[#0B2C4D] hover:text-white">
              View All Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, index) => {
            const Icon = sector.icon
            return (
              <div
                key={index}
                className="group relative bg-white rounded-xl shadow-sm border border-transparent hover:border-[#F28C28] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-[400px] flex flex-col cursor-pointer"
              >
                {/* Image Background for Card */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C4D]/95 via-[#0B2C4D]/60 to-transparent p-6 flex flex-col justify-end">
                    <div className="bg-white/10 backdrop-blur-md w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white border border-white/20 group-hover:scale-110 group-hover:bg-[#F28C28] transition-all duration-300">
                      <Icon className="w-6 h-6 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{sector.title}</h3>
                    <p className="text-gray-200 text-sm line-clamp-3">{sector.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
