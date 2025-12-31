"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Truck, HardHat, Building2, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import financialsData from "@/data/financials.json"
import profileData from "@/data/profile.json"
import capabilitiesData from "@/data/capabilities.json"

export default function StatsAndBrands() {
    // Format turnover data for chart
    const chartData = financialsData.turnover.map(t => ({
        year: t.year,
        turnover: (t.amount_inr / 10000000).toFixed(0) // Convert to Cr
    })).reverse()

    const partners = [
        { type: 'img', src: '/images/brands/indian-oil.png', alt: 'Indian Oil' },
        { type: 'img', src: '/images/brands/nhai.png', alt: 'NHAI' },
        { type: 'img', src: '/images/brands/punj-lloyd.jpeg', alt: 'Punj Lloyd' },
        { type: 'text', value: 'Prism' },
        { type: 'img', src: '/images/brands/birla.jpeg', alt: 'Birla' },
        { type: 'img', src: '/images/brands/ambhuja.png', alt: 'Ambuja Cement' },
        { type: 'img', src: '/images/brands/ultratech.png', alt: 'Ultratech' },
    ]

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Financial Growth */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-[#0B2C4D] mb-6">Consistent Growth Track Record</h2>
                        <p className="text-gray-600 mb-8">
                            With an average annual turnover of <strong>₹{(financialsData.average_annual_turnover / 10000000).toFixed(0)} Crores</strong> and a strong balance sheet,
                            BLPL demonstrates financial stability and execution capability for large-scale infrastructure projects.
                        </p>

                        <div className="h-[300px] w-full bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value} Cr`} />
                                    <Tooltip
                                        cursor={{ fill: '#f3f4f6' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="turnover" fill="#F28C28" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Right: Operational Capabilities */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <StatCard
                            icon={Truck}
                            value={`${(capabilitiesData.earthwork_capacity.max_annual_quantity_m3 / 100000).toFixed(1)}L+ m³`}
                            label="Annual Earthwork Capacity"
                            sub="Massive Fleet Deployment"
                        />
                        <StatCard
                            icon={Building2}
                            value={`${(capabilitiesData.concrete_work_capacity.max_annual_quantity_m3 / 1000).toFixed(0)}k+ m³`}
                            label="Annual Concrete Capacity"
                            sub="High-Speed Pavers"
                        />
                        <StatCard
                            icon={TrendingUp}
                            value={`₹${profileData.key_stats.current_order_book_crores} Cr`}
                            label="Current Order Book"
                            sub="Strong Pipeline"
                        />
                        <StatCard
                            icon={CheckCircle2}
                            value="100%"
                            label="Self-Reliant Execution"
                            sub="No Subcontracting Policy"
                        />
                    </div>
                </div>

                {/* Brands Ticker */}
                <div className="mt-24 pt-12 border-t border-gray-100 overflow-hidden">
                    <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">Trusted Brand Partners</p>

                    {/* Marquee Container */}
                    {/* Marquee Container */}
                    <div className="relative flex overflow-hidden group mask-linear-gradient select-none">
                        {/* First Block */}
                        <motion.div
                            className="flex shrink-0 gap-16 items-center min-w-full pr-16"
                            animate={{ x: "-100%" }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 30
                            }}
                        >
                            {[...partners, ...partners].map((partner, i) => (
                                <div key={i} className="flex items-center justify-center min-w-[150px] h-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                                    {partner.type === 'img' ? (
                                        <img
                                            src={partner.src}
                                            alt={partner.alt}
                                            className="h-16 w-auto object-contain hover:scale-110 transition-transform"
                                        />
                                    ) : (
                                        <span className="text-2xl font-bold text-[#0B2C4D]">{partner.value}</span>
                                    )}
                                </div>
                            ))}
                        </motion.div>

                        {/* Second Block (Duplicate) */}
                        <motion.div
                            className="flex shrink-0 gap-16 items-center min-w-full pr-16"
                            animate={{ x: "-100%" }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 30
                            }}
                        >
                            {[...partners, ...partners].map((partner, i) => (
                                <div key={`${i}-duplicate`} className="flex items-center justify-center min-w-[150px] h-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                                    {partner.type === 'img' ? (
                                        <img
                                            src={partner.src}
                                            alt={partner.alt}
                                            className="h-16 w-auto object-contain hover:scale-110 transition-transform"
                                        />
                                    ) : (
                                        <span className="text-2xl font-bold text-[#0B2C4D]">{partner.value}</span>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function StatCard({ icon: Icon, value, label, sub }: any) {
    return (
        <Card className="border-none shadow-lg shadow-gray-100 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-[#F28C28] border border-transparent group relative z-10">
            <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-[#F28C28] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#F28C28] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-3xl font-bold text-[#0B2C4D] mb-1">{value}</h3>
                <p className="font-medium text-gray-700">{label}</p>
                <p className="text-sm text-gray-500 mt-1">{sub}</p>
            </CardContent>
        </Card>
    )
}
