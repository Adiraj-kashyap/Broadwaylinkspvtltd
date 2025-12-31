"use client"
import { motion } from "framer-motion"
import historyData from "@/data/history.json"

export default function HistorySection() {
  // Use data from JSON
  const milestones = historyData.map(item => ({
    year: item.year,
    event: item.description
  }))

  const values = [
    { title: "Excellence in Execution", description: "Quality-first approach to every project" },
    { title: "Safety First", description: "Rigorous safety protocols and standards" },
    { title: "Environmental Responsibility", description: "Sustainable and eco-conscious practices" },
    { title: "Innovation & Technology", description: "Modern methods and equipment deployment" },
  ]

  return (
    <section id="journey" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-[#0B2C4D] text-balance"
        >
          Our Journey
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Timeline */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-8">Milestones</h3>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-20 font-bold text-[#F28C28] flex-shrink-0 group-hover:scale-110 transition-transform">{milestone.year}</div>
                  <div className="flex-1 pb-4 border-l-2 border-gray-300 pl-4 group-hover:border-[#F28C28] transition-colors relative">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300 group-hover:bg-[#F28C28] transition-colors border-2 border-white"></div>
                    <p className="text-gray-700 group-hover:text-gray-900 transition-colors">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-8">Core Values</h3>
            <div className="grid grid-cols-1 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#F5F7FA] border-l-4 border-[#F28C28] p-6 rounded-lg hover:shadow-lg hover:translate-x-1 transition-all duration-300 group"
                >
                  <p className="font-semibold text-[#0B2C4D] mb-2 group-hover:text-[#F28C28] transition-colors">{value.title}</p>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
