import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ShieldCheck, MapPin, QrCode, Lock, Leaf, ArrowRight, Sprout, FlaskConical, Shield, Truck, User } from "lucide-react";

const ROLES = [
  { id: "farmer", label: "Farmer / Collector", icon: Sprout, to: "/farmer/dashboard" },
  { id: "processing", label: "Processing Unit", icon: Truck, to: "/processing/dashboard" },
  { id: "lab", label: "Laboratory", icon: FlaskConical, to: "/laboratory/dashboard" },
  { id: "regulator", label: "Regulator", icon: Shield, to: "/regulator/dashboard" },
  { id: "consumer", label: "Consumer", icon: User, to: "/consumer/dashboard" },
];

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("farmer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = ROLES.find((r) => r.id === role)?.to ?? "/farmer/dashboard";
    navigate({ to: target });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left visual side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden gradient-hero text-white">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-20 right-20 size-80 rounded-full bg-leaf/30 blur-3xl" />
        <div className="absolute bottom-10 left-10 size-96 rounded-full bg-emerald/40 blur-3xl" />

        <div className="relative z-10 p-12 flex flex-col justify-between w-full">
          <Logo variant="light" />

          <div className="space-y-8 max-w-md">
            <div>
              <h1 className="text-4xl font-bold leading-tight font-display">From the foothills of the Nilgiris to your hands — every step verified.</h1>
              <p className="mt-4 text-white/80 leading-relaxed">Join 3,200+ farmers, 180+ processors, and 42 accredited laboratories building India's transparent Ayurvedic supply chain.</p>
            </div>

            {/* Mini provenance card */}
            <div className="glass-dark rounded-2xl p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/60">
                <span className="size-1.5 rounded-full bg-emerald animate-pulse" /> Live on AyurTrace
              </div>
              <div className="mt-3 space-y-2.5">
                {[
                  { icon: Sprout, t: "Harvest", v: "Kotagiri · Ramesh Kumar" },
                  { icon: MapPin, t: "GPS", v: "11.4916°N · 76.7337°E" },
                  { icon: FlaskConical, t: "Lab", v: "DNA 99.6% match" },
                  { icon: Lock, t: "Block", v: "18,420,931 · Verified" },
                ].map((r) => (
                  <div key={r.t} className="flex items-center gap-3 text-sm">
                    <div className="size-7 rounded-lg bg-white/10 flex items-center justify-center">
                      <r.icon className="size-3.5" />
                    </div>
                    <span className="text-white/60 w-16 text-xs">{r.t}</span>
                    <span className="font-medium">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              {[
                { i: ShieldCheck, t: "Blockchain Secured" },
                { i: MapPin, t: "GPS Verified" },
                { i: QrCode, t: "QR Traceable" },
              ].map((f) => (
                <div key={f.t} className="flex items-center gap-2 text-white/80">
                  <f.i className="size-4" /> {f.t}
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-white/50">© 2026 AyurTrace · Ministry of AYUSH</div>
        </div>
      </div>

      {/* Right form side */}
      <div className="flex-1 flex flex-col p-6 lg:p-12">
        <div className="lg:hidden mb-8"><Logo /></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald">
              <Leaf className="size-4" /> Sign in to AyurTrace
            </div>
            <h2 className="text-3xl font-bold mt-2 font-display">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Access your portal to manage traceability records.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Select Role</label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {ROLES.map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-[10px] font-medium transition-all ${
                        role === r.id
                          ? "border-primary bg-primary/5 text-primary shadow-soft"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <r.icon className="size-4" />
                      <span className="text-center leading-tight">{r.label.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email or Mobile</label>
                <input
                  type="text"
                  defaultValue="ramesh@ayurtrace.in"
                  className="mt-2 w-full h-11 px-4 rounded-xl border border-border bg-card focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="mt-2 w-full h-11 px-4 rounded-xl border border-border bg-card focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="size-4 rounded accent-primary" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-primary font-medium hover:underline">Forgot password?</a>
              </div>

              <button type="submit" className="w-full h-12 rounded-xl gradient-hero text-white font-semibold shadow-glow flex items-center justify-center gap-2 hover:opacity-95">
                Sign In <ArrowRight className="size-4" />
              </button>

              <div className="relative my-4">
                <div className="border-t border-border" />
                <span className="absolute inset-0 -top-2.5 mx-auto w-fit bg-background px-3 text-xs text-muted-foreground">or</span>
              </div>

              <Link to="/consumer/dashboard" className="w-full h-12 rounded-xl border border-border bg-card hover:bg-muted font-semibold flex items-center justify-center gap-2">
                <QrCode className="size-4" /> Continue as Consumer
              </Link>
            </form>

            <p className="text-center mt-6 text-sm text-muted-foreground">
              New farmer or processor? <a href="#" className="text-primary font-medium hover:underline">Request onboarding</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
