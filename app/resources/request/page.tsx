
import { ResourceRequestForm } from "@/components/resource-request-form"

export default function ResourceRequestPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col relative">
            {/* Decorative Background - Replaced missing SVG with CSS Gradient pattern */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-[#0B2C4D] -z-0 overflow-hidden">
                {/* subtle grid using css gradients */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>
                {/* Abstract Shapes */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute top-10 left-10 w-32 h-32 bg-[#F28C28]/20 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 flex-grow flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl">
                    <div className="mb-8 text-center text-white">
                        <h1 className="text-4xl font-bold mb-3 tracking-tight">Resource Hub</h1>
                        <p className="text-blue-200 text-lg">Streamlined requisition for efficient project execution.</p>
                    </div>
                    <ResourceRequestForm />
                </div>
            </div>
        </main>
    )
}
