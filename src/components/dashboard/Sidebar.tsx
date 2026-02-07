"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { MessageSquare, HeartPulse, Phone, LogOut, Plus, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const pathname = usePathname();

    const navItems = [
        { href: "/dashboard/chat", label: "Chat", icon: MessageSquare },
        { href: "/dashboard/wellness", label: "Wellness", icon: HeartPulse },
        { href: "/dashboard/resources", label: "Resources", icon: Phone },
    ];

    if (!user) return null;

    return (
        <aside className={cn("w-[280px] flex-shrink-0 bg-card border-r border-border pt-6 pb-4 px-4 gap-6 transition-colors duration-300 h-full", className)}>
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
                <Link href="/dashboard/chat">
                    <Button className="w-full justify-center gap-2 rounded-xl font-semibold shadow-none transition-all hover:opacity-90 active:scale-[0.98] bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-sm mb-4">
                        <Plus size={18} strokeWidth={2.5} />
                        New Chat
                    </Button>
                </Link>

                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full h-10 bg-background border border-border rounded-lg pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                    />
                </div>
            </div>

            <div className="space-y-6 flex-1">
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
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
            </div>

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
