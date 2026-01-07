
"use client"

import { motion } from "framer-motion"
import { ArrowRight, Award, ShieldCheck, Users, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import profileData from "@/data/profile.json"
import financialsData from "@/data/financials.json"

interface CompanyIntroProps {
  hideJourneyButton?: boolean
}

export default function CompanyIntroSection({ hideJourneyButton = false }: CompanyIntroProps) {

  // Get latest financial data
  const latestFinancials = financialsData.financial_position[0]
  const netWorthCr = (latestFinancials.net_worth / 10000000).toFixed(0)
  const assetsCr = (latestFinancials.total_assets / 10000000).toFixed(0)

  return (
    <section id="about" className="py-24 bg-white overflow-hidden relative">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/projects/10.jpg"
          alt="Background Texture"
          className="w-full h-full object-cover grayscale opacity-[0.1]"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-12 bg-[#F28C28]"></span>
              <span className="text-[#F28C28] font-bold uppercase tracking-wider text-sm">About BLPL</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B2C4D] mb-6 leading-tight">
              Building India's Infrastructure Since 2001.
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Broadway Links Private Limited (BLPL) is a premier infrastructure development company headquartered in Begusarai, Bihar.
              With a net worth of <span className="font-bold text-[#0B2C4D]">₹{netWorthCr} Crores</span> and a robust asset base of <span className="font-bold text-[#0B2C4D]">₹{assetsCr} Crores</span>, we execute large-scale projects in Highways, Irrigation, and Industrial Oil & Gas sectors.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We pride ourselves on being <span className="font-bold text-[#0B2C4D]">100% self-reliant</span>, owning a massive fleet of {profileData.key_stats.fleet_size_plus}+ advanced equipment, ensuring timely delivery without subcontracting dependencies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center justify-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 shadow-sm w-full sm:w-auto">
                <img src="/images/iso-9001-2015.png" alt="ISO 9001:2015" className="w-8 h-8 mr-3 object-contain" />
                <span className="font-medium text-[#0B2C4D] whitespace-nowrap">ISO 9001:2015</span>
              </div>
              <div className="flex items-center justify-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 shadow-sm w-full sm:w-auto">
                <img src="/images/iso-45001-2018.png" alt="ISO 45001:2018" className="w-8 h-8 mr-3 object-contain" />
                <span className="font-medium text-[#0B2C4D] whitespace-nowrap">ISO 45001:2018</span>
              </div>
              <div className="flex items-center justify-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 shadow-sm w-full sm:w-auto">
                <img src="/images/iso-14001-2015.jpg" alt="ISO 14001:2015" className="w-8 h-8 mr-3 object-contain" />
                <span className="font-medium text-[#0B2C4D] whitespace-nowrap">ISO 14001:2015</span>
              </div>
            </div>

            {!hideJourneyButton && (
              <div className="mt-8">
                <Link href="/about">
                  <Button className="bg-[#0B2C4D] hover:bg-[#0B2C4D]/90 text-white px-8 py-6 rounded-full text-lg group hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300">
                    Our Journey <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[500px] lg:h-full min-h-[500px]"
          >
            <div className="relative z-10 h-full rounded-2xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C4D]/90 via-transparent to-transparent z-20"></div>
              <img
                src="/images/site-view-high-res.jpg"
                alt="Infrastructure Projects"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-30">
                <div className="flex gap-8 border-t border-white/20 pt-8 text-white">
                  <div>
                    <div className="text-5xl font-bold mb-1 tracking-tight">23+</div>
                    <div className="text-sm opacity-90 font-medium uppercase tracking-wider">Years of Excellence</div>
                  </div>
                  <div>
                    <div className="text-5xl font-bold mb-1 tracking-tight">₹2200Cr+</div>
                    <div className="text-sm opacity-90 font-medium uppercase tracking-wider">Completed Works</div>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}