"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts"
import { TrendingUp, Truck, HardHat, Building2, CheckCircle2, Factory, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/bg-texture-1.jpg"
                    alt="Background Texture"
                    className="w-full h-full object-cover grayscale opacity-[0.2]"
                />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Financial Growth */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
                    >
                        <h2 className="text-4xl font-bold text-[#0B2C4D] mb-6 tracking-tight">Financial Growth</h2>
                        <p className="text-gray-600 mb-8 text-lg font-light leading-relaxed">
                            With an average annual turnover of <strong className="text-[#F28C28] text-2xl">₹{(financialsData.average_annual_turnover / 10000000).toFixed(1)} Cr</strong> for the last 5 years,
                            BLPL demonstrates unshakeable financial stability and execution capability for large-scale infrastructure projects.
                        </p>

                        <div className="h-[350px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis
                                        dataKey="year"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: '#6B7280', fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `₹${value}Cr`}
                                        tick={{ fill: '#6B7280' }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(242, 140, 40, 0.1)' }}
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                                            backgroundColor: '#0B2C4D',
                                            color: '#fff'
                                        }}
                                        itemStyle={{ color: '#fff' }}
                                        formatter={(value: any) => [`₹${value} Cr`, 'Turnover']}
                                    />
                                    <Bar dataKey="turnover" radius={[6, 6, 0, 0]} barSize={40}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill="url(#colorGradient)" />
                                        ))}
                                    </Bar>
                                    <defs>
                                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#F28C28" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#F28C28" stopOpacity={0.6} />
                                        </linearGradient>
                                    </defs>
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
        <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 z-0 group-hover:bg-[#F28C28]/10 transition-colors duration-500"></div>
            <CardContent className="p-8 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-[#F28C28] transition-colors duration-500 group-hover:scale-110 transform">
                    <Icon className="w-7 h-7 text-[#F28C28] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-4xl font-bold text-[#0B2C4D] mb-2 tracking-tight group-hover:translate-x-1 transition-transform">{value}</h3>
                <p className="font-semibold text-gray-800 text-lg mb-1">{label}</p>
                <p className="text-sm text-gray-500">{sub}</p>
            </CardContent>
        </Card>
    )
}
