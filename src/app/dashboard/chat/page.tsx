"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2, MessageSquare, Brain, Zap, Moon, Search, Paperclip, Mic } from "lucide-react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { CrisisAlert } from "@/components/chat/CrisisAlert";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store";

interface Message {
    _id: string;
    sender: "user" | "ai" | "system";
    content: string;
}

export default function ChatPage() {
    const { user } = useAuthStore();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isLocked, setIsLocked] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initSession = async () => {
            try {
                const { data: sessions } = await api.get("/chat/sessions");
                let currentSessionId;

                if (sessions.length > 0) {
                    const recent = sessions[0];
                    currentSessionId = recent._id;
                    if (recent.status === 'locked') {
                        setIsLocked(true);
                    }
                } else {
                    const { data: newSession } = await api.post("/chat/start", {});
                    currentSessionId = newSession._id;
                }

                setSessionId(currentSessionId);
                const { data: msgs } = await api.get(`/chat/session/${currentSessionId}`);
                setMessages(msgs);
            } catch (error) {
                console.error("Failed to init chat", error);
            } finally {
                setLoading(false);
            }
        };

        initSession();
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || sending || !sessionId || isLocked) return;

        const content = input.trim();
        setInput("");
        setSending(true);

        const tempId = Date.now().toString();
        setMessages(prev => [...prev, { _id: tempId, sender: 'user', content }]);

        try {
            const { data } = await api.post(`/chat/session/${sessionId}/message`, { content });
            setMessages(prev => {
                const filtered = prev.filter(m => m._id !== tempId);
                return [...filtered, data.userMessage, data.aiMessage];
            });

            if (data.isLocked) {
                setIsLocked(true);
            }
        } catch (error) {
            console.error("Send failed", error);
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground">
                <Loader2 className="animate-spin mr-2" /> Loading...
            </div>
        );
    }

    const suggestions = [
        { title: "Synthesize Data", subtitle: "Turn your thoughts into clear points", icon: Brain },
        { title: "Creative Brainstorm", subtitle: "Generate ideas for self-care", icon: Zap },
        { title: "Check Facts", subtitle: "Learn about anxiety symptoms", icon: Search },
    ];

    const isEmpty = messages.length === 0;

    return (
        <div className="flex flex-col h-full bg-background relative selection:bg-primary/20 font-sans">
            <CrisisAlert
                open={isLocked}
                onSafe={async () => {
                    if (!sessionId) return;
                    try {
                        await api.post(`/chat/session/${sessionId}/unlock`);
                        setIsLocked(false);
                        // Optional: Refresh session/messages to sync status
                        const { data } = await api.get(`/chat/session/${sessionId}`);
                        setMessages(data);
                    } catch (error) {
                        console.error("Failed to unlock session", error);
                    }
                }}
            />

            {/* Header - Minimalist */}
            {!isEmpty && (
                <div className="px-6 py-4 border-b border-border bg-card sticky top-0 z-10 flex items-center justify-between">
                    <div>
                        <h2 className="font-bold font-serif text-lg tracking-tight text-foreground">MindMate</h2>
                    </div>
                </div>
            )}

            {/* Main Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
                {isEmpty ? (
                    // Cortex-style Empty State
                    <div className="flex flex-col items-center justify-center min-h-full h-full gap-8 animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto">

                        {/* Orb Visual */}
                        <div className="relative mb-4">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary/40 to-secondary/40 blur-[60px] animate-pulse" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/20 blur-[20px]" />
                        </div>

                        {/* Greeting */}
                        <div className="text-center space-y-2">
                            <h1 className="text-4xl md:text-5xl font-bold font-serif bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent pb-2">
                                Hello, {user?.pseudonymId ? `Passenger` : 'Friend'}
                            </h1>
                            <p className="text-2xl md:text-3xl font-medium text-foreground/80">
                                How can I assist you today?
                            </p>
                        </div>

                        {/* Centered Input Box */}
                        <div className="w-full max-w-2xl mt-8">
                            <form
                                onSubmit={handleSend}
                                className="relative flex items-center bg-card shadow-xl rounded-2xl border border-border/50 p-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all"
                            >
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="border-none shadow-none focus-visible:ring-0 text-lg py-6 pl-4 placeholder:text-muted-foreground/40 bg-transparent"
                                    autoFocus
                                />
                                <div className="flex items-center gap-2 pr-2">
                                    <Button size="icon" variant="ghost" type="button" className="text-muted-foreground hover:text-primary">
                                        <Paperclip size={20} />
                                    </Button>
                                    <Button
                                        size="icon"
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-10 w-10"
                                        type="submit"
                                        disabled={!input.trim() || sending}
                                    >
                                        <Send size={18} />
                                    </Button>
                                </div>
                            </form>

                            {/* Action Pills */}
                            <div className="flex gap-3 mt-4 justify-center">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium cursor-pointer hover:bg-primary/20 transition-colors">
                                    <SparklesIcon className="w-3 h-3" /> Deeper Research
                                </span>
                            </div>
                        </div>

                        {/* Suggestion Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-12">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(s.title + " ")}
                                    className="flex flex-col items-start p-4 rounded-xl border border-border bg-card hover:bg-accent transition-all hover:shadow-md text-left group h-full"
                                >
                                    <s.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                                    <h3 className="font-semibold text-sm mb-1 text-foreground/90">{s.title}</h3>
                                    <p className="text-xs text-muted-foreground">{s.subtitle}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Chat Messages List
                    <div className="space-y-6 max-w-3xl mx-auto pb-4">
                        {messages.map((msg) => (
                            <MessageBubble
                                key={msg._id}
                                content={msg.content}
                                sender={msg.sender}
                                isSystem={msg.sender === 'system'}
                            />
                        ))}
                        {sending && (
                            <div className="flex justify-start animate-pulse">
                                <div className="flex items-center gap-2 text-muted-foreground text-sm pl-2">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom Input (Only when not empty) */}
            {!isEmpty && (
                <div className="p-4 md:p-6 pt-2">
                    <div className="max-w-3xl mx-auto relative">
                        <form
                            onSubmit={handleSend}
                            className="relative flex items-center bg-card border shadow-lg rounded-[24px] focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all overflow-hidden"
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="w-full pl-6 pr-14 py-7 border-none bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/50 text-base"
                                disabled={isLocked || sending}
                                autoFocus
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={!input.trim() || isLocked || sending}
                                className={cn(
                                    "absolute right-2 h-10 w-10 rounded-full transition-all",
                                    input.trim()
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                )}
                            >
                                {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function SparklesIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
    )
}
