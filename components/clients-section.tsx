"use client"
import { motion } from "framer-motion"

export default function ClientsSection() {
  const clients = {
    Government: [
      "Ministry of Road Transport & Highways",
      "National Highways Authority of India",
      "Indian Railways",
      "State Public Works Departments",
    ],
    "Public Sector": ["ONGC", "Indian Oil Corporation", "NTPC", "Power Grid Corporation"],
    "Select Private Sector": [
      "Major infrastructure developers",
      "Industrial and energy companies",
      "Multinational construction firms",
    ],
  }

  return (
    <section id="clients" className="py-16 md:py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-[#0B2C4D] text-balance"
        >
          Our Clients
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(clients).map(([category, clientList], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-transparent hover:border-[#F28C28] group"
            >
              <h3 className="text-xl font-bold text-[#0B2C4D] mb-6 border-b-2 border-gray-100 pb-3 group-hover:text-[#F28C28] transition-colors">{category}</h3>
              <ul className="space-y-4">
                {clientList.map((client, index) => (
                  <li key={index} className="text-gray-700 flex items-start group-hover/item">
                    <span className="text-[#F28C28] mr-3 transform group-hover:scale-125 transition-transform inline-block">•</span>
                    <span className="group-hover:text-gray-900 transition-colors">{client}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
