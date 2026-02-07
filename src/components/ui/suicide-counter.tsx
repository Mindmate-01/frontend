"use client";

import { useEffect, useState } from "react";

export function SuicideCounter() {
    // 800,000 deaths per year
    // per day: ~2191
    // per hour: ~91
    // per minute: ~1.5
    // per second: ~0.025 (one death every ~40 seconds)

    // Let's start from a base number representing "this year so far" roughly, or just a running counter for impact.
    // To make it "live" and impactful without being fake, we can show "Lives lost this year so far".

    const [count, setCount] = useState(0);

    useEffect(() => {
        // Calculate seconds since start of year
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const diffSeconds = (now.getTime() - startOfYear.getTime()) / 1000;

        // Rate: 800,000 / (365 * 24 * 60 * 60) = ~0.02536 deaths per second
        const ratePerSecond = 800000 / (365 * 24 * 60 * 60);

        const initialCount = Math.floor(diffSeconds * ratePerSecond);
        setCount(initialCount);

        const interval = setInterval(() => {
            setCount(prev => prev + 1);
        }, 40000); // Increment every 40 seconds (approx 1/0.025)

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-8 rounded-2xl text-center shadow-lg max-w-md mx-auto transform hover:scale-105 transition-transform duration-500">
            <h3 className="text-muted-foreground font-medium mb-4 uppercase tracking-widest text-sm">Lives Lost to Suicide This Year</h3>
            <div className="text-6xl md:text-7xl font-bold font-mono text-destructive mb-2 tracking-tighter">
                {count.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-4 italic">
                *Based on WHO estimate of 800,000 lives lost annually. One life every 40 seconds.
            </p>
        </div>
    );
}
