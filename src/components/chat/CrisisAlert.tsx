import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Phone, ShieldAlert } from "lucide-react";

interface CrisisAlertProps {
    open: boolean;
}

export function CrisisAlert({ open, onSafe }: { open: boolean; onSafe?: () => void }) {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent className="border-destructive/50 border-2 bg-white dark:bg-zinc-950 shadow-2xl sm:max-w-md">
                <AlertDialogHeader>
                    <div className="flex items-center gap-2 text-destructive mb-2">
                        <ShieldAlert className="h-6 w-6" />
                        <AlertDialogTitle className="text-xl">Safety Pause</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-foreground">
                        We've detected that you might be going through a difficult time right now.
                        For your safety, this chat session has been paused.
                        <br /><br />
                        Please reach out to a professional or a helpline immediately. You are not alone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-3 my-4">
                    <div className="bg-background border p-3 rounded-md flex items-center justify-between">
                        <div>
                            <p className="font-semibold">Nigeria Suicide Prevention</p>
                            <p className="text-sm text-muted-foreground">0806 210 6493</p>
                        </div>
                        <Button variant="outline" size="icon" asChild>
                            <a href="tel:08062106493"><Phone size={18} /></a>
                        </Button>
                    </div>
                    <div className="bg-background border p-3 rounded-md flex items-center justify-between">
                        <div>
                            <p className="font-semibold">Lagos Emergency</p>
                            <p className="text-sm text-muted-foreground">112 / 767</p>
                        </div>
                        <Button variant="outline" size="icon" asChild>
                            <a href="tel:112"><Phone size={18} /></a>
                        </Button>
                    </div>
                </div>

                <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-full" asChild>
                        <a href="tel:112">Call Emergency Services</a>
                    </AlertDialogAction>
                    {onSafe && (
                        <Button variant="ghost" onClick={onSafe} className="w-full sm:w-full text-muted-foreground hover:text-foreground">
                            I am safe now
                        </Button>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

// Minimal stub for Button to avoid circular dep if needed, but we imported from @/components/ui/button
import { Button } from "@/components/ui/button";
