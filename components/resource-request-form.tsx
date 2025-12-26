
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Boxes, AlertCircle, FileText, ChevronRight } from "lucide-react"

const formSchema = z.object({
    projectName: z.string().min(2, {
        message: "Project name must be at least 2 characters.",
    }),
    resourceType: z.string({
        required_error: "Please select a resource type.",
    }),
    quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Quantity must be a positive number"
    }),
    urgency: z.enum(["low", "medium", "high"]),
    notes: z.string().optional(),
})

export function ResourceRequestForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            quantity: "1",
            notes: "",
            urgency: "medium"
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        toast({
            title: "Request Submitted Successfully",
            description: `Requisition for ${values.quantity} units sent to Admin Hub.`,
            duration: 5000,
        })
    }

    return (
        <Card className="border-none shadow-2xl bg-white overflow-visible relative z-10">
            <div className="bg-[#0B2C4D] p-8 text-white rounded-t-xl">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Boxes className="w-6 h-6 text-[#F28C28]" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Resource Requisition
                    </h2>
                </div>
                <p className="text-blue-100/80 text-sm ml-11">
                    Official channel for site in-charges to request machinery, manpower, or materials.
                </p>
            </div>

            <CardContent className="p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="projectName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-gray-400" /> Project / Site Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. Barauni Refinery Expansion - Zone A"
                                                className="h-12 bg-gray-50 border-gray-400 focus:border-[#0B2C4D] focus:ring-1 focus:ring-[#0B2C4D] transition-all"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="resourceType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                                                <Boxes className="w-4 h-4 text-gray-400" /> Resource Category
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 bg-gray-50 border-gray-400 focus:ring-[#0B2C4D]">
                                                        <SelectValue placeholder="Select type..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-white border-gray-200 shadow-xl z-50 max-h-[300px]">
                                                    <SelectItem value="excavator" className="focus:bg-gray-100 cursor-pointer py-3">Heavy Machinery (Excavator, Dozer)</SelectItem>
                                                    <SelectItem value="crane" className="focus:bg-gray-100 cursor-pointer py-3">Lifting Equipment (Crane, Hydra)</SelectItem>
                                                    <SelectItem value="vehicle" className="focus:bg-gray-100 cursor-pointer py-3">Logistics (Truck, Trailer)</SelectItem>
                                                    <SelectItem value="manpower" className="focus:bg-gray-100 cursor-pointer py-3">Skilled Manpower</SelectItem>
                                                    <SelectItem value="material-steel" className="focus:bg-gray-100 cursor-pointer py-3">Raw Material: Steel/TMT</SelectItem>
                                                    <SelectItem value="material-cement" className="focus:bg-gray-100 cursor-pointer py-3">Raw Material: Cement/RMC</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-semibold">Quantity / Count</FormLabel>
                                            <FormControl>
                                                <Input type="number" className="h-12 bg-gray-50 border-gray-400 focus:border-[#0B2C4D]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="urgency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-gray-400" /> Priority Level
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-12 bg-gray-50 border-gray-400 focus:ring-[#0B2C4D]">
                                                    <SelectValue placeholder="Select priority..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-white border-gray-200 shadow-xl z-50">
                                                <SelectItem value="low" className="py-3 text-green-600 focus:bg-green-50">Low (Planned - Next 30 Days)</SelectItem>
                                                <SelectItem value="medium" className="py-3 text-blue-600 focus:bg-blue-50">Medium (Standard - 7-14 Days)</SelectItem>
                                                <SelectItem value="high" className="py-3 text-red-600 focus:bg-red-50 font-medium">High (Immediate / Critical)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="text-xs text-gray-400 ml-1">
                                            *High priority requests trigger an immediate alert to the RD.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-gray-400" /> Operational Details
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Specify model numbers, gate pass requirements, or specific usage details..."
                                                className="min-h-[100px] bg-gray-50 border-gray-400 resize-none focus:border-[#0B2C4D]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="pt-2">
                            <Button type="submit" size="lg" className="w-full bg-[#F28C28] hover:bg-[#d97b20] text-white font-bold h-14 text-lg shadow-xl shadow-orange-900/10 transition-all hover:scale-[1.01]">
                                Submit Requisition <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
