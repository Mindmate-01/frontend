"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { MoodChart } from "@/components/wellness/MoodChart";
import { MoodLoggingDialog } from "@/components/wellness/MoodLoggingDialog";
import { Loader2 } from "lucide-react";

export default function WellnessPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            const { data } = await api.get("/mood/history");
            setHistory(data);
        } catch (error) {
            console.error("Failed to fetch mood history", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground">
                <Loader2 className="animate-spin mr-2" /> Loading wellness data...
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 overflow-y-auto h-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold font-serif tracking-tight">Wellness Dashboard</h2>
                    <p className="text-muted-foreground">Track your emotional journey.</p>
                </div>
                <MoodLoggingDialog onLogSuccess={fetchHistory} />
            </div>

            <div className="grid gap-4 md:grid-cols-1">
                <MoodChart data={history} />
            </div>
        </div>
    );
}
