"use client"

import { motion } from "framer-motion"

export default function HeroSection() {
  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/site-view-1.jpg"
          alt="Infrastructure Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2C4D]/95 to-[#0B2C4D]/80"></div>
        {/* CSS Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            Broadway Links
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            End-to-End Infrastructure Execution for India
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Specialized in national highways, bridges, industrial projects, and oil & gas infrastructure. Over <span className="text-[#F28C28] font-bold">₹500 Cr</span> in
            active order book with a fleet of <span className="text-[#F28C28] font-bold">200+</span> equipment units.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleScroll("contact")}
              className="bg-[#F28C28] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d97b20] hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-orange-900/40"
            >
              Get in Touch
            </button>
            <button
              onClick={() => handleScroll("sectors")}
              className="border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#0B2C4D] hover:border-white transition-all hover:scale-105 active:scale-95 duration-300 shadow-md hover:shadow-xl"
            >
              View Sectors
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
