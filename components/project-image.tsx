"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"
import { Building2 } from "lucide-react"

interface ProjectImageProps extends Omit<ImageProps, "onError"> {
    fallbackText?: string
}

export function ProjectImage({ fallbackText, className, ...props }: ProjectImageProps) {
    const [error, setError] = useState(false)

    if (error) {
        return (
            <div className={`flex flex-col items-center justify-center bg-zinc-900 text-zinc-700 ${className}`} style={{ width: '100%', height: '100%' }}>
                <Building2 className="w-16 h-16 mb-2 opacity-20" />
                {fallbackText && <span className="text-sm font-medium opacity-40 uppercase tracking-widest">{fallbackText}</span>}
            </div>
        )
    }

    return (
        <Image
            {...props}
            className={className}
            onError={() => setError(true)}
        />
    )
}
