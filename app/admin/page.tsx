
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-[#0B2C4D]">Admin Dashboard</h1>
                    <Button>Logout</Button>
                </div>

                <Tabs defaultValue="fleet" className="w-full">
                    <TabsList className="bg-white p-1 rounded-md mb-6">
                        <TabsTrigger value="fleet" className="w-40">Fleet Management</TabsTrigger>
                        <TabsTrigger value="projects" className="w-40">Projects</TabsTrigger>
                        <TabsTrigger value="requests" className="w-40">Resource Requests</TabsTrigger>
                        <TabsTrigger value="reports" className="w-40">Reports</TabsTrigger>
                    </TabsList>

                    <TabsContent value="fleet">
                        <Card>
                            <CardHeader>
                                <CardTitle>Fleet Inventory</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Fleet management table will go here.</p>
                                {/* Interactive Table Component to be implemented */}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="projects">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Records</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Project management list will go here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="requests">
                        <Card>
                            <CardHeader>
                                <CardTitle>Incoming Resource Requests</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Requests from project incharges.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
