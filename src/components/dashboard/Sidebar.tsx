"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import api from "@/lib/api";
import { MessageSquare, HeartPulse, Phone, LogOut, Plus, Search, Sparkles, BookOpen, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatSession {
    _id: string;
    title: string;
    lastMessageAt: string;
    status: string;
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    onSessionSelect?: (sessionId: string) => void;
    activeSessionId?: string | null;
}

export function Sidebar({ className, onSessionSelect, activeSessionId }: SidebarProps) {
    const router = useRouter();
    const { user, token, logout } = useAuthStore();
    const pathname = usePathname();
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const navItems = [
        { href: "/dashboard/chat", label: "Chat", icon: MessageSquare },
        { href: "/dashboard/journal", label: "Journal", icon: BookOpen },
        { href: "/dashboard/wellness", label: "Wellness", icon: HeartPulse },
        { href: "/dashboard/resources", label: "Resources", icon: Phone },
    ];

    // Fetch chat sessions
    useEffect(() => {
        const fetchSessions = async () => {
            if (!token) return;
            try {
                const { data } = await api.get("/chat/sessions");
                setSessions(data);
            } catch (error) {
                console.error("Failed to fetch sessions:", error);
            }
        };

        fetchSessions();
    }, [token]);

    const handleNewChat = async () => {
        if (!token) return;
        try {
            const { data: newSession } = await api.post("/chat/start");
            setSessions((prev) => [newSession, ...prev]);
            if (onSessionSelect) {
                onSessionSelect(newSession._id);
            }
            router.push("/dashboard/chat");
        } catch (error) {
            console.error("Failed to create session:", error);
        }
    };

    const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!token) return;
        try {
            await api.delete(`/chat/session/${sessionId}`);
            setSessions((prev) => prev.filter((s) => s._id !== sessionId));
        } catch (error) {
            console.error("Failed to delete session:", error);
        }
    };

    const filteredSessions = sessions.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    if (!user) return null;

    return (
        <aside className={cn("w-[280px] flex-shrink-0 bg-card border-r border-border pt-6 pb-4 px-4 gap-6 transition-colors duration-300 h-full flex flex-col", className)}>
            <div className="px-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        <Sparkles size={18} className="fill-current" />
                    </div>
                    <span className="text-xl font-bold font-serif tracking-tight text-foreground">MindMate</span>
                </div>
                <ModeToggle />
            </div>

            <div className="px-0 relative mb-2">
                <Button
                    onClick={handleNewChat}
                    className="w-full justify-center gap-2 rounded-xl font-semibold shadow-none transition-all hover:opacity-90 active:scale-[0.98] bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-sm mb-4"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    New Chat
                </Button>

                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 bg-background border border-border rounded-lg pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                    />
                </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href === "/dashboard/chat" && pathname.startsWith("/dashboard/chat"));
                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3 h-11 rounded-xl font-medium text-[15px] px-3 transition-colors",
                                    isActive
                                        ? "bg-secondary text-secondary-foreground font-semibold"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                <Icon size={20} className={cn(isActive ? "text-primary" : "text-muted-foreground")} />
                                {item.label}
                            </Button>
                        </Link>
                    )
                })}
            </nav>

            {/* Chat History */}
            {pathname.startsWith("/dashboard/chat") && filteredSessions.length > 0 && (
                <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">Recent Chats</p>
                    <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                        {filteredSessions.map((session) => (
                            <div
                                key={session._id}
                                onClick={() => onSessionSelect?.(session._id)}
                                className={cn(
                                    "group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all",
                                    activeSessionId === session._id
                                        ? "bg-secondary"
                                        : "hover:bg-muted"
                                )}
                            >
                                <MessageSquare size={16} className="text-muted-foreground shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate text-foreground">
                                        {session.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDate(session.lastMessageAt)}
                                    </p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MoreHorizontal size={14} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            className="text-destructive focus:text-destructive"
                                            onClick={(e) => handleDeleteSession(session._id, e)}
                                        >
                                            <Trash2 size={14} className="mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* User Section */}
            <div className="mt-auto space-y-2">
                <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted transition-colors cursor-pointer group border border-transparent hover:border-border/50">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
                        {user.pseudonymId?.slice(0, 1) || "U"}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-foreground truncate">Passenger {user.pseudonymId?.slice(0, 4)}</p>
                        <p className="text-[10px] text-muted-foreground truncate uppercase tracking-wider font-medium">Free Plan</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                            logout();
                            router.push("/login");
                        }}
                    >
                        <LogOut size={16} />
                    </Button>
                </div>
            </div>
        </aside>
    );
}
