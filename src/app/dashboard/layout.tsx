"use client";

import { useAuthStore } from "@/lib/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { user } = useAuthStore();

    useEffect(() => {
        if (!useAuthStore.getState().token) {
            router.push("/login");
        }
    }, [router]);

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden md:flex flex-col h-screen sticky top-0" />

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur border-b border-border z-50 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="-ml-2">
                                <Menu size={24} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="p-0 w-[280px] border-r bg-card">
                            <div className="sr-only">
                                <SheetTitle>Navigation Menu</SheetTitle>
                                <SheetDescription>Main navigation and sidebar</SheetDescription>
                            </div>
                            <Sidebar className="w-full border-none h-full flex flex-col bg-card" />
                        </SheetContent>
                    </Sheet>
                    <span className="font-bold font-serif text-lg">MindMate</span>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen md:h-screen overflow-hidden bg-background relative text-foreground transition-colors duration-300 pt-16 md:pt-0">
                {children}
            </main>
        </div>
    );
}
