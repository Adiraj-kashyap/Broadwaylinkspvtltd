
"use client"

import { use, useMemo, useState } from "react"
import fleetData from "@/data/fleet.json"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Printer } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { ChevronRight, Settings, Hash, Search } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type FleetItem = {
    equipment: string
    brand: string
    model: string
    chassisNo?: string
    regNo?: string
    year?: string
    location?: string
    remarks?: string
    activeStatus?: string
    capacity?: string
    engineMake?: string
    engineModel?: string
    enginePower?: string
    engineSerial?: string
}

function FleetRow({ item, idx }: { item: FleetItem; idx: number }) {
    const [showEngine, setShowEngine] = useState(false)
    const hasEngine = !!item.engineMake

    return (
        <TableRow className="hover:bg-blue-50/50 transition-colors cursor-default group">
            <TableCell className="font-medium text-gray-400 w-[60px]">{idx + 1}</TableCell>

            {/* Equipment Name */}
            <TableCell className="font-semibold text-gray-700 group-hover:text-[#0B2C4D] min-w-[180px]">
                {item.equipment}
                {item.regNo !== "N/A" && (
                    <div className="text-xs text-gray-400 font-normal mt-0.5 font-mono bg-gray-100 inline-block px-1 rounded">
                        {item.regNo}
                    </div>
                )}
            </TableCell>

            {/* Location */}
            <TableCell className="text-gray-600 w-[120px]">{item.location}</TableCell>

            {/* Sliding Details Cell */}
            <TableCell className="relative overflow-hidden w-[450px]">
                <div className="relative h-12 w-full">
                    {/* Machine Details (Default View) */}
                    <div
                        className={`absolute inset-0 flex items-center gap-4 transition-transform duration-500 ease-in-out ${showEngine ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
                    >
                        <div className="flex flex-col w-[180px]">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Make</span>
                            <span className="font-medium text-[#0B2C4D] truncate" title={item.brand}>{item.brand}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200 shrink-0"></div>
                        <div className="flex flex-col w-[180px]">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Model</span>
                            <span className="font-medium truncate" title={item.model}>{item.model}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200 shrink-0"></div>
                        <div className="flex flex-col w-[100px]">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Capacity</span>
                            <span className="font-medium truncate" title={item.capacity}>{item.capacity || "-"}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200 shrink-0"></div>
                        <div className="flex flex-col items-center justify-center min-w-[30px]">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="p-1.5 rounded-full hover:bg-gray-100 cursor-help transition-colors text-gray-400 hover:text-[#0B2C4D]">
                                            <span className="text-[10px] font-bold border border-current px-1 rounded">ID</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="font-mono text-xs">Chassis: {item.chassisNo || "N/A"}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>

                    {/* Engine Details (Sliding View) */}
                    <div
                        className={`absolute inset-0 flex items-center gap-4 transition-transform duration-500 ease-in-out ${showEngine ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
                    >
                        <div className="flex items-center gap-2 text-orange-600 font-bold mr-2 w-[80px] shrink-0">
                            <Settings className="w-4 h-4" /> Engine
                        </div>
                        <div className="flex flex-col w-[180px]">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Make</span>
                            <span className="font-medium text-[#0B2C4D] truncate" title={item.engineMake}>{item.engineMake || "-"}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200 shrink-0"></div>
                        <div className="flex flex-col w-[180px]">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Model</span>
                            <span className="font-medium truncate" title={item.engineModel}>{item.engineModel || "-"}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200 shrink-0"></div>
                        <div className="flex flex-col w-[100px]">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Power</span>
                            <span className="font-medium truncate" title={item.enginePower}>{item.enginePower || "-"}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <div className="flex flex-col items-center justify-center min-w-[30px]">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="p-1.5 rounded-full hover:bg-gray-100 cursor-help transition-colors text-gray-400 hover:text-orange-500">
                                            <span className="text-[10px] font-bold border border-current px-1 rounded">ID</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="font-mono text-xs">Engine Serial: {item.engineSerial || "N/A"}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
            </TableCell>

            {/* Action / Trigger */}
            <TableCell className="w-[50px]">
                {hasEngine && (
                    <button
                        onClick={() => setShowEngine(!showEngine)}
                        className={`p-2 rounded-full hover:bg-orange-50 transition-all duration-300 ${showEngine ? "text-[#F28C28] rotate-180 bg-orange-100" : "text-gray-400"}`}
                        title={showEngine ? "Show Machine Details" : "Show Engine Details"}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                )}
            </TableCell>

            {/* Status */}
            <TableCell className="text-right">
                <Badge variant={item.activeStatus === "Active" ? "default" : "secondary"} className={item.activeStatus === "Active" ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200" : "bg-gray-100 text-gray-500"}>
                    {item.activeStatus}
                </Badge>
            </TableCell>
        </TableRow>
    )
}

export default function BrandPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const filterId = decodeURIComponent(resolvedParams.id);
    const [searchQuery, setSearchQuery] = useState("")

    const filteredEquipment = useMemo(() => {
        // Filter by either brand OR equipment name
        return fleetData.filter((item) => {
            const matchesId = item.brand === filterId || item.equipment === filterId
            if (!matchesId) return false

            const query = searchQuery.toLowerCase()
            return (
                item.brand?.toLowerCase().includes(query) ||
                item.model?.toLowerCase().includes(query) ||
                item.chassisNo?.toLowerCase().includes(query) ||
                item.equipment?.toLowerCase().includes(query) ||
                item.location?.toLowerCase().includes(query) ||
                item.engineMake?.toLowerCase().includes(query) ||
                item.engineModel?.toLowerCase().includes(query)
            )
        })
    }, [filterId, searchQuery]) as FleetItem[]

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-[#0B2C4D] text-white pt-24 pb-12 px-4 shadow-lg print:hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <Link href="/fleet" className="inline-flex items-center text-blue-300 hover:text-white mb-4 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Fleet
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-4">
                            <span className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-3xl">
                                {filterId.charAt(0)}
                            </span>
                            {filterId}
                        </h1>
                        <p className="opacity-90 ml-20 text-lg">Total Units: <span className="font-bold text-[#F28C28]">{filteredEquipment.length}</span></p>
                    </div>

                    <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10" onClick={() => window.print()}>
                        <Printer className="w-4 h-4 mr-2" /> Print Inventory
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 py-12 flex-grow">
                <Card className="shadow-xl border-none overflow-hidden">
                    <CardHeader className="bg-white border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 py-4">
                        <CardTitle className="text-[#0B2C4D] flex items-center gap-2">
                            Equipment Ledger
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 ml-2">
                                {filteredEquipment.length} Items
                            </Badge>
                        </CardTitle>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search serial, model, location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28] focus:border-transparent bg-white text-sm w-full md:w-[300px]"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 hover:bg-gray-50 uppercase text-xs tracking-wider">
                                        <TableHead className="w-[60px] font-bold text-[#0B2C4D]">#</TableHead>
                                        <TableHead className="font-bold text-[#0B2C4D]">Equipment</TableHead>
                                        <TableHead className="font-bold text-[#0B2C4D]">Location</TableHead>
                                        <TableHead className="font-bold text-[#0B2C4D]">Specification & Details</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                        <TableHead className="font-bold text-[#0B2C4D] text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredEquipment.map((item, idx) => (
                                        <FleetRow key={idx} item={item} idx={idx} />
                                    ))}
                                    {filteredEquipment.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                                No equipment found for <span className="font-bold">{filterId}</span>.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
