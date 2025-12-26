"use client"

import { Badge } from "@/components/ui/badge"

const equipment = [
  "Volvo",
  "Ingersoll Rand",
  "Caterpillar",
  "Komatsu",
  "L&T",
  "JCB",
  "Apollo",
  "KYB Conmat",
  "Schwing Stetter",
  "Metso",
  "Atlas Copco",
  "Liugong",
  "Putzmeister",
  "Ashok Leyland",
  "Tata",
]

export default function FleetSection() {
  return (
    <section id="fleet" className="section-container bg-gradient-to-b from-muted/50 to-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Equipment Fleet</h2>
          <p className="section-subtitle">
            Industry-leading automated construction equipment from world-renowned manufacturers
          </p>
        </div>

        {/* Key Stat */}
        <div className="bg-gradient-to-r from-primary to-blue-800 text-white rounded-lg p-8 mb-12 shadow-lg">
          <div className="text-center">
            <p className="text-sm font-semibold opacity-90 mb-2">Current Order Book</p>
            <h3 className="text-4xl md:text-5xl font-bold">₹12,528 Million</h3>
            <p className="text-blue-100 mt-2">From government and private sector clients</p>
          </div>
        </div>

        {/* Equipment Brands */}
        <div className="bg-white rounded-lg p-8 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6">Partner Equipment Brands</h3>
          <div className="flex flex-wrap gap-3">
            {equipment.map((brand, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm font-medium bg-muted text-foreground border-border hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {brand}
              </Badge>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Pieces of equipment</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <p className="text-muted-foreground">Equipment brands partnered</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">#1</div>
            <p className="text-muted-foreground">Fleet ownership in Bihar</p>
          </div>
        </div>
      </div>
    </section>
  )
}
