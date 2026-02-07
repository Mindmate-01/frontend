"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MoodLog {
    _id: string;
    emotion: string;
    intensity: number;
    createdAt: string;
}

// Primary color for charts (terracotta/rust color from theme)
const CHART_PRIMARY = "#9B4A2C";

export function MoodChart({ data }: { data: MoodLog[] }) {
    // Process data: reverse to show chronological, format date
    const chartData = [...data].reverse().map(log => ({
        date: new Date(log.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        intensity: log.intensity,
        emotion: log.emotion
    }));

    return (
        <Card className="col-span-4 bg-card">
            <CardHeader>
                <CardTitle>Mood Trends</CardTitle>
                <CardDescription>
                    Your emotional intensity over time.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={CHART_PRIMARY} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={CHART_PRIMARY} stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                stroke="currentColor"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                className="text-muted-foreground"
                            />
                            <YAxis
                                stroke="currentColor"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                domain={[0, 10]}
                                className="text-muted-foreground"
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    borderRadius: '8px',
                                    border: '1px solid hsl(var(--border))',
                                    color: 'hsl(var(--card-foreground))'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="intensity"
                                stroke={CHART_PRIMARY}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorIntensity)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
