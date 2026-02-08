"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/store";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, BookOpen, Calendar, Smile, Frown, Meh, Heart, Sun, Cloud, Loader2, Trash2, Edit3, X, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface JournalEntry {
    _id: string;
    title: string;
    content: string;
    mood: string | null;
    createdAt: string;
    updatedAt: string;
}

const moodOptions = [
    { value: "happy", label: "Happy", icon: Smile, color: "text-yellow-500" },
    { value: "grateful", label: "Grateful", icon: Heart, color: "text-pink-500" },
    { value: "calm", label: "Calm", icon: Sun, color: "text-blue-400" },
    { value: "reflective", label: "Reflective", icon: Cloud, color: "text-purple-400" },
    { value: "anxious", label: "Anxious", icon: Meh, color: "text-orange-400" },
    { value: "sad", label: "Sad", icon: Frown, color: "text-blue-600" },
];

export default function JournalPage() {
    const { token } = useAuthStore();
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

    // Form state
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [viewingEntry, setViewingEntry] = useState<JournalEntry | null>(null);

    const fetchEntries = async () => {
        if (!token) return;
        try {
            const { data } = await api.get("/journal");
            setEntries(data.entries || []);
        } catch (error) {
            console.error("Failed to fetch entries:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, [token]);

    const handleSave = async () => {
        if (!token || !content.trim()) return;
        setIsSaving(true);

        try {
            if (editingEntry) {
                await api.put(`/journal/${editingEntry._id}`, {
                    title: title || "Untitled Entry",
                    content,
                    mood,
                });
            } else {
                await api.post("/journal", {
                    title: title || "Untitled Entry",
                    content,
                    mood,
                });
            }
            await fetchEntries();
            resetForm();
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Failed to save entry:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!token) return;
        try {
            await api.delete(`/journal/${id}`);
            setEntries((prev) => prev.filter((e) => e._id !== id));
        } catch (error) {
            console.error("Failed to delete entry:", error);
        }
    };

    const resetForm = () => {
        setTitle("");
        setContent("");
        setMood(null);
        setEditingEntry(null);
    };

    const openEditDialog = (entry: JournalEntry) => {
        setEditingEntry(entry);
        setTitle(entry.title);
        setContent(entry.content);
        setMood(entry.mood);
        setIsDialogOpen(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getMoodIcon = (moodValue: string | null) => {
        const moodOption = moodOptions.find((m) => m.value === moodValue);
        if (!moodOption) return null;
        const Icon = moodOption.icon;
        return <Icon size={16} className={moodOption.color} />;
    };

    const getMoodLabel = (moodValue: string | null) => {
        const moodOption = moodOptions.find((m) => m.value === moodValue);
        return moodOption?.label || null;
    };

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <header className="px-6 py-5 border-b border-border bg-card">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold font-serif text-foreground">Journal</h1>
                        <p className="text-muted-foreground text-sm">Your private space for reflection and self-discovery.</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) resetForm();
                    }}>
                        <DialogTrigger asChild>
                            <Button className="rounded-xl gap-2">
                                <Plus size={18} />
                                New Entry
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle className="font-serif">
                                    {editingEntry ? "Edit Entry" : "New Journal Entry"}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                                <input
                                    type="text"
                                    placeholder="Entry title (optional)"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />

                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">How are you feeling?</p>
                                    <div className="flex flex-wrap gap-2">
                                        {moodOptions.map((option) => {
                                            const Icon = option.icon;
                                            return (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setMood(mood === option.value ? null : option.value)}
                                                    className={cn(
                                                        "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
                                                        mood === option.value
                                                            ? "border-primary bg-primary/10 text-foreground"
                                                            : "border-border hover:border-primary/50 text-muted-foreground"
                                                    )}
                                                >
                                                    <Icon size={16} className={option.color} />
                                                    <span className="text-sm">{option.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <textarea
                                    placeholder="Write your thoughts..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={8}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />

                                <div className="flex justify-end gap-3">
                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave} disabled={!content.trim() || isSaving}>
                                        {isSaving ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin mr-2" />
                                                Saving...
                                            </>
                                        ) : (
                                            "Save Entry"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 size={32} className="animate-spin text-primary" />
                    </div>
                ) : entries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                            <BookOpen size={32} className="text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">No entries yet</h3>
                        <p className="text-muted-foreground text-sm max-w-sm">
                            Start journaling to track your thoughts, feelings, and personal growth journey.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {entries.map((entry) => (
                            <Card
                                key={entry._id}
                                className="group hover:shadow-md transition-shadow bg-card cursor-pointer"
                                onClick={() => setViewingEntry(entry)}
                            >
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-lg font-semibold truncate">
                                                {entry.title}
                                            </CardTitle>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                                <Calendar size={12} />
                                                {formatDate(entry.createdAt)}
                                                {entry.mood && (
                                                    <span className="flex items-center gap-1 ml-2">
                                                        {getMoodIcon(entry.mood)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openEditDialog(entry);
                                                }}
                                            >
                                                <Edit3 size={14} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(entry._id);
                                                }}
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-4">
                                        {entry.content}
                                    </p>
                                    <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Click to read more...
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* View Entry Dialog */}
            <Dialog open={!!viewingEntry} onOpenChange={(open) => !open && setViewingEntry(null)}>
                <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-hidden flex flex-col">
                    <DialogHeader className="border-b border-border pb-4">
                        <div className="flex items-start justify-between pr-8">
                            <div>
                                <DialogTitle className="text-xl font-serif">
                                    {viewingEntry?.title}
                                </DialogTitle>
                                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={14} />
                                        {viewingEntry && formatDate(viewingEntry.createdAt)}
                                    </span>
                                    {viewingEntry?.mood && (
                                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10">
                                            {getMoodIcon(viewingEntry.mood)}
                                            <span className="text-xs">{getMoodLabel(viewingEntry.mood)}</span>
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto py-4">
                        <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                            {viewingEntry?.content}
                        </p>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <Button
                            variant="outline"
                            onClick={() => setViewingEntry(null)}
                        >
                            Close
                        </Button>
                        <Button
                            onClick={() => {
                                if (viewingEntry) {
                                    openEditDialog(viewingEntry);
                                    setViewingEntry(null);
                                }
                            }}
                        >
                            <Edit3 size={16} className="mr-2" />
                            Edit Entry
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
