
"use client"

import { useMemo } from "react"
import fleetData from "@/data/fleet.json"
import Link from "next/link"
import { ArrowRight, Box } from "lucide-react"

const brandImageMap: Record<string, string> = {
  "jcb": "/images/brands/jcb.jpg",
  "tata": "/images/brands/tata.png",
  "ashok leyland": "/images/brands/ashok-leyland.jpg",
  "kyb conmat": "/images/brands/kyb-conmat.jpg",
  "l&t komatsu": "/images/brands/komatsu.jpg",
  "komatsu": "/images/brands/komatsu.jpg",
  "beml": "/images/brands/beml.jpg",
  "liugong": "/images/brands/liugong.jpg",
  "cummins": "/images/brands/cummins.jpg",
  "maxmech": "/images/brands/maxmech.jpg",
  "bolero": "/images/brands/bolero.jpg",
  "kirloskar": "/images/brands/kirloskar.jpg"
}

export default function FleetSection() {
  const stats = useMemo(() => {
    const brandCounts: Record<string, number> = {}
    let totalEquipment = 0

    fleetData.forEach((item) => {
      const brand = item.brand || "Unknown"
      brandCounts[brand] = (brandCounts[brand] || 0) + 1
      totalEquipment++
    })

    const sortedBrands = Object.entries(brandCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([brand, count]) => ({ brand, count }))

    return { brandCounts, sortedBrands, totalEquipment }
  }, [])

  // Show top 4 brands + the "View All" card will take up slots
  // Filter out Caterpillar/CAT and duplicate Sinotruck
  const topBrands = stats.sortedBrands
    .filter(b => b.brand !== 'Caterpillar' && b.brand !== 'CAT' && b.brand !== 'Cat' && b.brand !== 'Sinotruck')
    .slice(0, 4)

  return (
    <section id="fleet" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B2C4D] mb-4 tracking-tight">
            Our <span className="text-[#F28C28]">Fleet</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Powering construction with a robust inventory of world-class machinery.
          </p>
        </div>

        {/* 
            Grid Layout Interpretation:
            3 Columns.
            Top Center Item spans 2 columns.
            We need exactly 1 Main Card + 4 Brand Cards = 5 Items.
            Row 1: [Main (2)] [Brand 1 (1)]
            Row 2: [Brand 2] [Brand 3] [Brand 4]
            Total 5 items filling 2 rows perfectly.
         */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">

          {/* The "Full Fleet Management" Card - Central/Prominent */}
          <Link href="/fleet" className="md:col-span-2 group relative z-20 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-[#F28C28] block">
            <div className="absolute inset-0 bg-[#0B2C4D] group-hover:scale-105 transition-transform duration-700 pointer-events-none"></div>

            {/* Decorative Elements */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#1a4b7c] rounded-full blur-3xl opacity-50 group-hover:bg-[#F28C28] group-hover:opacity-20 transition-colors duration-500 pointer-events-none"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-[#F28C28] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative h-full p-8 flex flex-col justify-between z-10 pointer-events-none">
              <div className="flex justify-between items-start pointer-events-auto">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4 backdrop-blur-sm border border-white/10 group-hover:bg-[#F28C28] group-hover:text-white transition-colors duration-300">
                    <Box className="w-4 h-4" /> Global Inventory
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Fleet Overview</h3>
                  <p className="text-blue-100 max-w-sm mb-4 md:mb-0 group-hover:text-white transition-colors">
                    Access detailed records of our {stats.totalEquipment}+ assets, active status, and deployment logs.
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 group-hover:text-white transition-colors">{stats.totalEquipment}</p>
                  <p className="text-white/60 text-sm font-medium tracking-widest uppercase group-hover:text-white/80">Total Units</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-4 pointer-events-auto">
                <span className="bg-[#F28C28] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 group-hover:bg-white group-hover:text-[#F28C28] transition-all shadow-lg shadow-orange-900/20 group-hover:shadow-xl">
                  Manage Fleet <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* Brand Cards - Filling the grid */}
          {topBrands.map((item, index) => {
            const brandKey = item.brand.toLowerCase()
            const imagePath = brandImageMap[brandKey]

            return (
              <Link href={`/fleet/${encodeURIComponent(item.brand)}`} key={index} className="group relative z-20 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#F28C28] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col block">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-[#F28C28] pointer-events-none"></div>

                <div className="p-8 flex-grow flex flex-col items-center justify-center text-center relative z-10 pointer-events-none">
                  {/* Logo or Placeholder */}
                  <div className={`w-20 h-20 mb-6 rounded-full bg-gray-50 flex items-center justify-center shadow-inner overflow-hidden border border-gray-100 group-hover:border-[#F28C28] transition-colors duration-300 ${!imagePath ? 'group-hover:text-white group-hover:bg-[#F28C28]' : 'bg-white'}`}>
                    {imagePath ? (
                      <img src={imagePath} alt={item.brand} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <span className="text-3xl font-bold text-gray-300 group-hover:text-white transition-colors">
                        {item.brand.charAt(0)}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#F28C28] transition-colors">{item.brand}</h4>
                  <p className="text-gray-500 font-medium group-hover:text-gray-900 transition-colors">{item.count} Machines</p>
                </div>

                <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#F28C28] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
