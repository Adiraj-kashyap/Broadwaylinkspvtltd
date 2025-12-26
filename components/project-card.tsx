
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, ArrowRight } from "lucide-react"

interface ProjectCardProps {
    id: number
    name: string
    section: string
    address: string
    value: string
    completion: string
}

export function ProjectCard({ id, name, section, address, value, completion }: ProjectCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-border/50 overflow-hidden group bg-white hover:-translate-y-1">
            <div className="relative w-full aspect-video bg-muted overflow-hidden">
                {/* Placeholder for Project Image with sophisticated gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B2C4D] via-[#1a4b7c] to-[#0B2C4D] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <div className="text-white/10 font-bold text-6xl tracking-tighter select-none">BLPL</div>
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

                <Badge className={`absolute top-4 right-4 shadow-sm ${section === 'Completed' ? 'bg-green-600 hover:bg-green-700' : 'bg-[#F28C28] hover:bg-[#d97b20]'}`}>
                    {section}
                </Badge>
            </div>

            <CardHeader className="pb-3 space-y-2">
                <div className="h-1 w-12 rounded-full bg-gray-200 mb-2 group-hover:bg-[#F28C28] transition-colors duration-300" />
                <CardTitle className="leading-snug text-xl font-bold line-clamp-2 min-h-[3.5rem] tracking-tight text-[#0B2C4D]">
                    {name}
                </CardTitle>
                <CardDescription className="flex items-start gap-1.5 pt-1">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="line-clamp-1 text-sm font-medium">{address || "Location N/A"}</span>
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow pb-4">
                <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                    {value && (
                        <div className="flex justify-between items-center group/item">
                            <span className="text-muted-foreground">Contract Value</span>
                            <span className="font-semibold text-gray-800 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 group-hover/item:border-gray-200 transition-colors">
                                {value}
                            </span>
                        </div>
                    )}
                    {completion && (
                        <div className="flex justify-between items-center group/item">
                            <span className="text-muted-foreground flex items-center gap-1.5">
                                <CalendarDays className="w-3.5 h-3.5" /> Completion
                            </span>
                            <span className="font-medium text-gray-700">{completion}</span>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="pt-0 pb-6">
                <Link href={`/projects/${id}`} className="w-full">
                    <Button className="w-full bg-gray-50 text-[#0B2C4D] border border-gray-200 hover:bg-[#0B2C4D] hover:text-white hover:border-[#0B2C4D] transition-all duration-300 font-semibold shadow-sm">
                        View Project Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
