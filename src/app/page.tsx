import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, MessageCircle, Phone } from "lucide-react";
import { SuicideCounter } from "@/components/ui/suicide-counter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-accent/20 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <Heart size={16} fill="currentColor" />
          </div>
          <span className="text-xl font-bold font-serif tracking-tight text-foreground">MindMate</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Log In</Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-full px-6 shadow-lg shadow-primary/20">Get Support</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-12 md:py-24 max-w-4xl mx-auto w-full">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-secondary text-secondary-foreground text-sm font-medium mb-4 mx-auto backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Safe, Private, & Always Here
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif tracking-tight text-foreground leading-[1.1]">
            You don’t have to <br className="hidden md:block" />
            <span className="text-primary italic">carry it all alone.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            When the world feels too heavy, MindMate is here to listen.
            No judgment, no pressure just a safe space to breathe, vent, and find hope again.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/register">
              <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105">
                Talk to Someone Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard/resources">
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg bg-background/50 backdrop-blur border-primary/20 hover:bg-secondary/50">
                Crisis Resources
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Global Impact / Statistics Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
              Mental health is a <br /><span className="text-primary italic">universal human right.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Yet, silence often surrounds our struggles. We are breaking that silence.
              MindMate is built on the belief that everyone deserves immediate, accessible support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="col-span-1 md:col-span-2 flex justify-center">
              <SuicideCounter />
            </div>

            <div className="bg-card/50 p-6 rounded-2xl shadow-sm border border-border/50 text-center">
              <p className="text-5xl font-bold text-primary mb-2">1 in 4</p>
              <p className="text-sm text-muted-foreground">Students experience mental health challenges during university.</p>
            </div>
            <div className="bg-card/50 p-6 rounded-2xl shadow-sm border border-border/50 text-center">
              <p className="text-5xl font-bold text-primary mb-2">24/7</p>
              <p className="text-sm text-muted-foreground">Availability of our AI companion. Because crisis doesn't follow a 9-to-5 schedule.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Journey Section */}
      <section className="relative z-10 py-24 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Your Path to Healing</h2>
          <p className="text-muted-foreground text-lg">MindMate is designed to support you at every step of your journey.</p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20 hidden md:block"></div>

          <div className="space-y-12 md:space-y-24">
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
              <div className="md:w-[45%] text-center md:text-right order-2 md:order-1">
                <h3 className="text-2xl font-bold font-serif mb-2">1. The Check-In</h3>
                <p className="text-muted-foreground">Log your mood or share what's on your mind. Just getting it out is the first relief.</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 hidden md:flex">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div className="md:w-[45%] order-1 md:order-2">
                <div className="bg-card p-6 rounded-2xl shadow-sm border border-border/50 rotate-1">
                  <span className="text-4xl">🌤️</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
              <div className="md:w-[45%] order-2 md:order-1 text-center md:text-right">
                <div className="bg-card p-6 rounded-2xl shadow-sm border border-border/50 -rotate-1">
                  <span className="text-4xl">💬</span>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 hidden md:flex">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div className="md:w-[45%] order-1 md:order-2 text-center md:text-left">
                <h3 className="text-2xl font-bold font-serif mb-2">2. Deep Conversation</h3>
                <p className="text-muted-foreground">Engage with our AI. It asks the right questions to help you unpack your feelings safely.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
              <div className="md:w-[45%] text-center md:text-right order-2 md:order-1">
                <h3 className="text-2xl font-bold font-serif mb-2">3. Discovery & Coping</h3>
                <p className="text-muted-foreground">Receive personalized strategies—grounding techniques, playlists, or breathing exercises.</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 hidden md:flex">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div className="md:w-[45%] order-1 md:order-2">
                <div className="bg-card p-6 rounded-2xl shadow-sm border border-border/50 rotate-1">
                  <span className="text-4xl">🌱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intimate Features / "How we help" */}
      <section className="relative z-10 py-24 px-6 bg-card/50 backdrop-blur-sm border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold font-serif">Deeply Private</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is our sacred core. Interactions are anonymous and encrypted. What you say here, stays here.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-bold font-serif">Always Listening</h3>
              <p className="text-muted-foreground leading-relaxed">
                It’s 3 AM and you can’t sleep? We’re here. Talk to an empathetic AI companion trained to support you through the darkest moments.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold font-serif">Gentle Guidance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Understand your emotions with mood tracking and find curated coping strategies to help you navigate stress and anxiety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Banner */}
      <section className="relative z-10 bg-primary/5 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-block p-3 rounded-full bg-background shadow-sm mb-4">
            <Phone size={32} className="text-destructive" />
          </div>
          <h2 className="text-3xl font-bold font-serif text-foreground">In Immediate Danger?</h2>
          <p className="text-lg text-muted-foreground">
            If you or someone you know is at risk of harm, please don't wait. Connection is the first step to healing.
          </p>
          <div className="pt-4">
            <Link href="/dashboard/resources">
              <Button variant="destructive" size="lg" className="rounded-full px-8 shadow-lg">
                Get Emergency Help
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-border/50 bg-background text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <span className="text-2xl font-bold font-serif text-primary/80">MindMate</span>
          <p className="text-sm text-muted-foreground max-w-sm">
            Built with love to ensure no student ever feels like they have to fight their battles alone.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Care</Link>
            <Link href="/dashboard/resources" className="hover:text-primary transition-colors">Resources</Link>
          </div>
          <p className="text-xs text-muted-foreground/50 mt-8">
            © 2026 MindMate Initiative.
          </p>
        </div>
      </footer>
    </div>
  );
}
