import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, ExternalLink } from "lucide-react";

export default function ResourcesPage() {
    const helplines = [
        {
            name: "Nigeria Suicide Prevention Initiative",
            description: "24/7 Crisis Hotline for immediate support.",
            phone: "0806 210 6493",
            website: "http://n-sip.gov.ng/"
        },
        {
            name: "Mentally Aware Nigeria Initiative (MANI)",
            description: "Youth-focused mental health support and advocacy.",
            phone: "0809 111 6264",
            website: "https://mentallyaware.org/"
        },
        {
            name: "Lagos State Emergency",
            description: "General emergency response for Lagos residents.",
            phone: "112",
            website: null
        },
    ];

    return (
        <div className="p-8 space-y-8 overflow-y-auto h-full">
            <div>
                <h2 className="text-3xl font-bold font-serif tracking-tight">Emergency Resources</h2>
                <p className="text-muted-foreground">You are not alone. Help is available.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {helplines.map((item) => (
                    <Card key={item.name}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-primary" />
                                {item.name}
                            </CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Button className="flex-1 gap-2" asChild>
                                    <a href={`tel:${item.phone.replace(/\s/g, '')}`}>
                                        <Phone size={16} /> Call {item.phone}
                                    </a>
                                </Button>
                                {item.website && (
                                    <Button variant="outline" size="icon" asChild>
                                        <a href={item.website} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink size={16} />
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
