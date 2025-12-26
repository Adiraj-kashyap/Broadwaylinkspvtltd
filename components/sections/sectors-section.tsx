"use client"

import { Building2, Zap, Pickaxe, Waves, Pipette as Pipe, TrendingUp } from "lucide-react"

const infrastructure = [
  {
    icon: TrendingUp,
    title: "Roads & Highways",
    description: "Expressway and highway construction with precision engineering",
  },
  {
    icon: Waves,
    title: "Irrigation & Canal Lining",
    description: "Water resource management and canal infrastructure projects",
  },
  {
    icon: Pickaxe,
    title: "Stone Mining & Crushing",
    description: "Comprehensive mining operations and material processing",
  },
]

const oilGas = [
  {
    icon: Pipe,
    title: "Piling & Civil Works",
    description: "Deep foundation and structural construction for petroleum infrastructure",
  },
  {
    icon: Building2,
    title: "Structural Steel Fabrication",
    description: "High-precision steel supply, fabrication, and erection services",
  },
  {
    icon: Zap,
    title: "Specialized Services",
    description: "Underground/above-ground piping, fireproofing, and material handling",
  },
]

export default function SectorsSection() {
  return (
    <section id="sectors" className="section-container">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Core Sectors</h2>
          <p className="section-subtitle">Delivering excellence across infrastructure and energy sectors</p>
        </div>

        {/* Infrastructure Sector */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-secondary rounded-full" />
            Infrastructure Sector
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infrastructure.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-white to-muted border border-border rounded-lg shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 group"
                >
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Oil & Gas Sector */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-secondary rounded-full" />
            Oil & Gas / Hydrocarbon Sector
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {oilGas.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-white to-muted border border-border rounded-lg shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 group"
                >
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
