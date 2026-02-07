"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { Loader2, Plus } from "lucide-react";

const EMOTIONS = ["happy", "excited", "neutral", "stressed", "anxious", "sad", "angry"];

export function MoodLoggingDialog({ onLogSuccess }: { onLogSuccess: () => void }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emotion, setEmotion] = useState("neutral");
    const [intensity, setIntensity] = useState(5);
    const [note, setNote] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await api.post("/mood", { emotion, intensity, note });
            setOpen(false);
            // Reset form
            setEmotion("neutral");
            setIntensity(5);
            setNote("");
            onLogSuccess();
        } catch (error) {
            console.error("Failed to log mood", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus size={16} /> Check In
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>How are you feeling?</DialogTitle>
                    <DialogDescription>
                        Log your current mood to track your wellness journey.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Emotion</Label>
                        <div className="flex flex-wrap gap-2">
                            {EMOTIONS.map((e) => (
                                <Button
                                    key={e}
                                    type="button"
                                    variant={emotion === e ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setEmotion(e)}
                                    className="capitalize"
                                >
                                    {e}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="intensity">Intensity (1-10): {intensity}</Label>
                        <input
                            id="intensity"
                            type="range"
                            min="1"
                            max="10"
                            value={intensity}
                            onChange={(e) => setIntensity(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Mild</span>
                            <span>Severe</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="note">Note (Optional)</Label>
                        <Input
                            id="note"
                            placeholder="Why do you feel this way?"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Log
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
