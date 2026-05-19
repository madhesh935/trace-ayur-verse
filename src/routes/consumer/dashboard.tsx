import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, Badge } from "@/components/ui-kit/Panel";
import { IndiaMap } from "@/components/maps/IndiaMap";
import {
  LayoutDashboard, QrCode, History, ShieldCheck, Leaf, Sprout, FlaskConical,
  Truck, Boxes, Package, MapPin, CheckCircle2, Star, FileBadge, Lock, ArrowRight, Dna, Droplets, Award,
} from "lucide-react";
import { BATCHES, REGIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/consumer/dashboard")({ component: ConsumerDashboard });

const nav: NavItem[] = [
  { label: "Scan Product", to: "/consumer/dashboard", icon: QrCode },
  { label: "My Verifications", to: "/consumer/verifications", icon: History },
  { label: "Verified Products", to: "/consumer/verified", icon: ShieldCheck },
  { label: "Sustainability", to: "/consumer/sustainability", icon: Leaf },
];

const featured = BATCHES[0];

const JOURNEY = [
  { icon: Sprout, label: "Harvested", detail: "by Ramesh Kumar", sub: "Kotagiri, Nilgiris · Tamil Nadu", date: "Aug 12, 2026", color: "bg-emerald" },
  { icon: Boxes, label: "Aggregated", detail: "Coimbatore Hub", sub: "Merged with 3 batches · 240 kg", date: "Aug 14, 2026", color: "bg-primary" },
  { icon: FlaskConical, label: "Lab Verified", detail: "NABL-7821 · Dr. Priya Iyer", sub: "DNA, moisture & pesticide passed", date: "Aug 16, 2026", color: "bg-emerald" },
  { icon: Package, label: "Packaged", detail: "GMP Facility · Coimbatore", sub: "Cold dried · Stone-ground · Serialized", date: "Aug 18, 2026", color: "bg-primary" },
  { icon: Truck, label: "Shipped", detail: "Cold chain logistics", sub: "Bengaluru → Mumbai retail network", date: "Aug 22, 2026", color: "bg-saffron" },
  { icon: QrCode, label: "Verified", detail: "By you · On-chain confirmed", sub: "Authenticity recorded permanently", date: "Just now", color: "bg-emerald" },
];

function ConsumerDashboard() {
  return (
    <PortalShell portalName="Consumer Portal" portalTagline="Authenticity verification" nav={nav} user={{ name: "Aarav Nair", role: "Consumer", initials: "AN" }}>

      {/* ── HERO SCANNER + RESULT PANEL ─────────────────────────────────── */}
      <div className="grid lg:grid-cols-5 gap-6">

        {/* Left: Scanner */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Scanner Card */}
          <div className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-[1.5rem] p-6 relative overflow-hidden shadow-card">
            <div className="absolute -top-24 -right-24 size-64 rounded-full bg-primary/15 blur-[60px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-0.5 gradient-leaf" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">AyurTrace Scanner</span>
              </div>
              <h1 className="text-2xl font-bold font-display mt-2 text-foreground">Verify your product</h1>
              <p className="text-sm text-muted-foreground mt-1">Scan the QR code on any Ayurvedic pack for instant blockchain verification</p>

              {/* QR viewport */}
              <div className="mt-5 aspect-square max-w-[220px] mx-auto bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl border-2 border-dashed border-border relative overflow-hidden flex items-center justify-center">
                <QrCode className="size-20 text-primary/40" />
                <div className="absolute inset-x-0 h-10 scan-line" />
                {/* Corner markers */}
                {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((cls, i) => (
                  <div key={i} className={`absolute size-6 border-primary/70 ${cls}`} />
                ))}
              </div>

              <button className="mt-5 w-full h-12 rounded-xl gradient-hero text-white font-semibold shadow-glow hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                <QrCode className="size-4" /> Open Camera
              </button>
              <div className="mt-4 relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
                <div className="relative text-center"><span className="bg-card px-3 text-xs text-muted-foreground">or enter batch ID</span></div>
              </div>
              <input
                placeholder="e.g. AYT-ASH-02418"
                className="mt-3 w-full h-11 px-4 rounded-xl border border-border/60 bg-muted/30 text-center font-mono text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Recently Verified */}
          <Panel title="Recently Scanned" subtitle="Your last 4 verifications">
            <div className="space-y-2 -mx-1">
              {BATCHES.slice(0, 4).map((b, i) => (
                <div key={b.id} className={`flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer ${i === 0 ? "bg-emerald/5 border border-emerald/20" : ""}`}>
                  <div className="size-10 rounded-xl bg-gradient-to-br from-muted to-muted/50 border border-border/50 flex items-center justify-center text-xl shrink-0">{b.herb.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-foreground truncate">{b.herb.name}</div>
                    <div className="text-[11px] font-mono text-muted-foreground">{b.id}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <CheckCircle2 className="size-4 text-emerald" />
                    <div className="text-[10px] text-muted-foreground mt-0.5">{i === 0 ? "Just now" : `${i}d ago`}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/consumer/verifications" className="mt-4 flex items-center justify-center gap-1 text-xs font-semibold text-primary hover:underline">
              View all scans <ArrowRight className="size-3" />
            </Link>
          </Panel>
        </div>

        {/* Right: Product Verification Result */}
        <div className="lg:col-span-3 flex flex-col gap-5">

          {/* Product Header */}
          <div className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-[1.5rem] overflow-hidden shadow-card">
            <div className="gradient-hero px-7 py-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 size-48 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/70 mb-2">✓ Verified Authentic</div>
                  <h2 className="text-2xl font-bold font-display text-white">Ashwagandha Root Powder</h2>
                  <div className="text-white/80 text-sm mt-1">240g · Himalaya Wellness · Batch <span className="font-mono">{featured.id}</span></div>
                </div>
                <div className="flex flex-col items-center bg-white/15 border border-white/20 rounded-2xl px-5 py-3 backdrop-blur-sm">
                  <ShieldCheck className="size-8 text-white" />
                  <div className="text-[10px] text-white/80 font-semibold uppercase tracking-wider mt-1">On-Chain</div>
                </div>
              </div>
            </div>

            {/* Quality metrics */}
            <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Award, label: "Sustainability", value: "94 / 100", sub: "Top 8% in India", color: "text-emerald" },
                { icon: Dna, label: "DNA Match", value: "99.6%", sub: "Withania somnifera", color: "text-primary" },
                { icon: Droplets, label: "Moisture", value: "9.2%", sub: "Limit: ≤ 12%", color: "text-emerald" },
                { icon: ShieldCheck, label: "Trust Score", value: "A+", sub: "NMPB Certified", color: "text-saffron" },
              ].map((m) => (
                <div key={m.label} className="bg-muted/30 border border-border/40 rounded-xl p-4 flex flex-col items-center text-center hover:border-primary/30 transition-colors">
                  <m.icon className={`size-5 ${m.color} mb-2`} />
                  <div className={`text-xl font-bold font-display ${m.color}`}>{m.value}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-1">{m.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Journey timeline */}
            <div className="px-6 pb-6 border-t border-border/50 pt-5">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-5">Provenance Journey</div>
              <div className="relative pl-8">
                {/* vertical line */}
                <div className="absolute left-[14px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald via-primary to-emerald opacity-40" />
                <div className="space-y-5">
                  {JOURNEY.map((e, i) => (
                    <div key={i} className="relative flex items-start gap-4">
                      <div className={`absolute -left-8 size-7 rounded-full ${e.color} flex items-center justify-center border-2 border-background shadow-sm shrink-0 z-10`}>
                        <e.icon className="size-3.5 text-white" />
                      </div>
                      <div className="flex-1 bg-muted/20 border border-border/40 rounded-xl px-4 py-3 hover:border-primary/30 transition-colors">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div>
                            <div className="font-semibold text-sm text-foreground">{e.label} · <span className="font-normal text-muted-foreground">{e.detail}</span></div>
                            <div className="text-xs text-muted-foreground mt-0.5">{e.sub}</div>
                          </div>
                          <div className="text-[11px] text-muted-foreground whitespace-nowrap font-medium shrink-0">{e.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row: Map + Farmer + Certificate + Blockchain */}
          <div className="grid sm:grid-cols-2 gap-5">

            {/* Farm Origin Map */}
            <Panel title="Farm Origin" subtitle="Kotagiri, Nilgiris · Tamil Nadu">
              <div className="h-40 rounded-xl overflow-hidden -mx-1 mb-3">
                <IndiaMap markers={[{ lat: REGIONS[0].lat, lng: REGIONS[0].lng, label: "Farm" }]} />
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="size-4 text-emerald shrink-0" />
                <span className="text-foreground">Kotagiri, Nilgiris</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1 ml-6">11.4916°N, 76.7337°E · 2,108m altitude</div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <Badge tone="success">NMPB-TN-04</Badge>
                <span className="text-muted-foreground">Approved zone</span>
              </div>
            </Panel>

            {/* Meet the Farmer */}
            <Panel title="Meet the Farmer" subtitle="Verified & trusted partner">
              <div className="flex items-center gap-4 mb-4">
                <div className="size-16 rounded-2xl gradient-leaf flex items-center justify-center text-white text-xl font-bold shadow-glow shrink-0">RK</div>
                <div>
                  <div className="font-bold text-foreground text-[15px]">Ramesh Kumar</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Farmer ID: F-2847 · 18 years experience</div>
                  <div className="flex items-center gap-0.5 mt-1.5">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="size-3 fill-saffron text-saffron" />)}
                    <span className="text-xs text-muted-foreground ml-1.5">Trusted partner</span>
                  </div>
                </div>
              </div>
              <div className="bg-muted/30 border border-border/50 rounded-xl p-3">
                <p className="text-xs text-muted-foreground italic leading-relaxed">"Three generations of my family have farmed these slopes. Every plant is harvested by hand with respect for the forest."</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div className="bg-emerald/5 border border-emerald/20 rounded-lg p-2 text-center">
                  <div className="font-bold text-emerald">94</div>
                  <div className="text-muted-foreground">Trust Score</div>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-2 text-center">
                  <div className="font-bold text-primary">Kotagiri</div>
                  <div className="text-muted-foreground">Village</div>
                </div>
              </div>
            </Panel>

            {/* Lab Certificate */}
            <Panel title="Lab Certificate" subtitle="NABL-accredited · IPFS anchored">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileBadge className="size-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-foreground truncate">CoA-{featured.id}.pdf</div>
                  <div className="text-[11px] font-mono text-muted-foreground truncate mt-0.5">ipfs://Qm{featured.txHash.slice(4, 22)}…</div>
                </div>
                <Badge tone="success"><Lock className="size-3" /> IPFS</Badge>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  ["Lab", "NABL Bengaluru · ID-7821"],
                  ["Analyst", "Dr. Priya Iyer"],
                  ["DNA Test", "Authentic · 99.6%"],
                  ["Pesticide", "Not Detected (42 compounds)"],
                  ["Issued", "Aug 16, 2026"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-1.5 border-b border-border/40 last:border-0">
                    <span className="text-muted-foreground font-medium">{k}</span>
                    <span className="font-semibold text-foreground text-right">{v}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full h-10 rounded-xl border border-border hover:bg-muted/50 text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                <FileBadge className="size-4" /> Download Full CoA
              </button>
            </Panel>

            {/* Blockchain Proof */}
            <Panel title="Blockchain Proof" subtitle="Immutable on-chain record">
              <div className="space-y-2 text-xs mb-4">
                {[
                  ["Network", "AyurTrace Ledger"],
                  ["Block Number", featured.block.toLocaleString()],
                  ["Confirmations", "324"],
                  ["Status", "Finalized"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-1.5 border-b border-border/40 last:border-0">
                    <span className="text-muted-foreground font-medium">{k}</span>
                    <span className={`font-bold ${k === "Status" ? "text-emerald" : "text-foreground"}`}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-muted/30 border border-border/50 rounded-xl p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Transaction Hash</div>
                <div className="font-mono text-[11px] text-foreground break-all">{featured.txHash}</div>
              </div>
              <div className="mt-3 flex items-center gap-2 p-3 bg-emerald/5 border border-emerald/20 rounded-xl">
                <CheckCircle2 className="size-4 text-emerald shrink-0" />
                <span className="text-xs font-semibold text-emerald">Authenticity permanently verified on-chain</span>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
