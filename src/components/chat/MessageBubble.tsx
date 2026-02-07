import { cn } from "@/lib/utils";

interface MessageBubbleProps {
    content: string;
    sender: "user" | "ai" | "system";
    isSystem?: boolean;
}

export function MessageBubble({ content, sender, isSystem }: MessageBubbleProps) {
    const isUser = sender === "user";

    if (isSystem) {
        return (
            <div className="flex justify-center mb-4">
                <div className="bg-destructive/10 border border-destructive/20 px-4 py-2 rounded-lg text-sm text-destructive max-w-md text-center">
                    {content}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex w-full mb-6 gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
            <div className={cn(
                "h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs select-none",
                isUser ? "bg-primary text-primary-foreground" : "bg-card border"
            )}>
                {isUser ? "U" : "AI"}
            </div>

            <div className={cn(
                "flex flex-col max-w-[80%]",
                isUser ? "items-end" : "items-start"
            )}>
                {/* Name Label (Optional, good for reference style) */}
                <span className="text-[10px] text-muted-foreground mb-1 px-1">
                    {isUser ? "You" : "MindMate"}
                </span>

                <div
                    className={cn(
                        "px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm",
                        isUser
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-card border text-card-foreground rounded-tl-sm"
                    )}
                >
                    {content}
                </div>
            </div>
        </div>
    );
}
