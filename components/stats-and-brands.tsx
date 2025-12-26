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

    const brands = [
        ...profileData.preferred_vendors.cement,
        ...profileData.preferred_vendors.steel,
        ...profileData.preferred_vendors.bitumen
    ].filter((v, i, a) => a.indexOf(v) === i) // Unique brands

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
                            With an average annual turnover of <strong>₹197 Crores</strong> and a strong balance sheet,
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
                <div className="mt-24 pt-12 border-t border-gray-100">
                    <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">Trusted Brand Partners</p>
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 items-center">
                        {/* Static images for known partners */}
                        <img src="/images/brands/indian-oil.png" alt="Indian Oil" className="h-16 w-auto object-contain hover:scale-110 transition-transform" />
                        <img src="/images/brands/nhai.png" alt="NHAI" className="h-16 w-auto object-contain hover:scale-110 transition-transform" />
                        <img src="/images/brands/punj-lloyd.jpeg" alt="Punj Lloyd" className="h-16 w-auto object-contain hover:scale-110 transition-transform" />

                        {brands.slice(0, 7).map(brand => (
                            <span key={brand} className="text-xl font-bold text-[#0B2C4D]">{brand}</span>
                        ))}
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
