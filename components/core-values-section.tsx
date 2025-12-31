"use client"
import { motion } from "framer-motion"
import { Target, Shield, Leaf, Cpu, Scale, Heart } from "lucide-react"

const values = [
    {
        icon: Target,
        title: "Excellence in Execution",
        description: "We deliver world-class infrastructure with zero compromise on quality, ensuring every project stands as a testament to our engineering precision."
    },
    {
        icon: Shield,
        title: "Safety First",
        description: "Human life is our most valuable asset. We adhere to rigorous safety protocols (ISO 45001:2018) to ensure a zero-accident workplace."
    },
    {
        icon: Leaf,
        title: "Environmental Responsibility",
        description: "We are committed to sustainable construction. Our operations comply with ISO 14001:2015 standards to minimize environmental impact."
    },
    {
        icon: Cpu,
        title: "Innovation & Technology",
        description: "We leverage cutting-edge technology and a massive fleet of modern equipment to optimize efficiency and speed of delivery."
    },
    {
        icon: Scale,
        title: "Integrity & Transparency",
        description: "We build trust through honest dealings, transparency in operations, and unwavering ethical standards with all our stakeholders."
    },
    {
        icon: Heart,
        title: "Employee Welfare",
        description: "Our workforce is our strength. We foster a supportive environment that values skill development, well-being, and professional growth."
    }
]

export default function CoreValuesSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-[#F28C28] font-bold uppercase tracking-wider text-sm">Our DNA</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 text-[#0B2C4D]">Foundations of Our Success</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
                        The principles that drive our decision making and define our corporate culture.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F28C28] transition-colors duration-300">
                                <value.icon className="w-8 h-8 text-[#0B2C4D] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0B2C4D] mb-3 group-hover:text-[#F28C28] transition-colors duration-300">
                                {value.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
