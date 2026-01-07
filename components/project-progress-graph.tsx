"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

export function ProjectProgressGraph({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null

    // 1. Identify all unique keys (resources) present across all years
    const allKeys = new Set<string>()
    data.forEach(item => {
        if (item.quantities) {
            Object.keys(item.quantities).forEach(k => allKeys.add(k))
        }
    })

    const keys = Array.from(allKeys).sort()
    const defaultKey = keys.find(k => k.includes("Concrete")) || keys.find(k => k.includes("Earth")) || keys[0]
    const [activeResource, setActiveResource] = useState<string>(defaultKey)

    const chartData = data.map(item => {
        const point: any = { year: item.year }
        if (item.quantities && item.quantities[activeResource]) {
            point.value = parseFloat(String(item.quantities[activeResource]).replace(/,/g, ''))
        } else {
            point.value = 0
        }
        return point
    })

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#0B2C4D]">Resource Timeline</h3>
                    <p className="text-sm text-gray-500">Breakdown of {activeResource} usage over project duration.</p>
                </div>

                <Select value={activeResource} onValueChange={setActiveResource}>
                    <SelectTrigger className="w-[200px] border-[#E2E8F0] shadow-sm text-[#0B2C4D] font-medium focus:ring-2 focus:ring-[#F28C28]">
                        <SelectValue placeholder="Select Resource" />
                    </SelectTrigger>
                    <SelectContent>
                        {keys.map((key) => (
                            <SelectItem key={key} value={key} className="text-[#0B2C4D]">
                                {key}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Stable Container to prevent layout shift */}
            <div className="h-[350px] w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeResource}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorResource" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F28C28" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#F28C28" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="year"
                                    stroke="#6B7280"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#6B7280"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0B2C4D',
                                        border: 'none',
                                        borderRadius: '8px',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                    formatter={(val: number) => [new Intl.NumberFormat('en-IN').format(val), activeResource]}
                                    labelStyle={{ color: '#F28C28', marginBottom: '5px', fontWeight: 'bold' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#F28C28"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorResource)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
