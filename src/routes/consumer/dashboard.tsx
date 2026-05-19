import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, Badge } from "@/components/ui-kit/Panel";
import { IndiaMap } from "@/components/maps/IndiaMap";
import {
  LayoutDashboard, QrCode, History, ShieldCheck, Leaf, Sprout, FlaskConical,
  Truck, Boxes, Package, MapPin, CheckCircle2, Star, FileBadge, Lock, ArrowRight,
} from "lucide-react";
import { BATCHES, REGIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/consumer/dashboard")({ component: ConsumerDashboard });

const nav: NavItem[] = [
  { label: "Scan Product", to: "/consumer/dashboard", icon: QrCode },
  { label: "My Verifications", to: "/consumer/dashboard", icon: History },
  { label: "Verified Products", to: "/consumer/dashboard", icon: ShieldCheck },
  { label: "Sustainability", to: "/consumer/dashboard", icon: Leaf },
];

const featured = BATCHES[0];

function ConsumerDashboard() {
  return (
    <PortalShell portalName="Consumer Portal" portalTagline="Authenticity verification" nav={nav} user={{ name: "Aarav Nair", role: "Consumer", initials: "AN" }}>
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Scanner */}
        <div className="lg:col-span-2">
          <div className="gradient-hero rounded-2xl p-6 text-white shadow-card relative overflow-hidden">
            <div className="absolute -top-16 -right-16 size-48 rounded-full bg-leaf/30 blur-3xl" />
            <div className="relative">
              <div className="text-xs uppercase tracking-wider opacity-80">Verify any AyurTrace product</div>
              <h1 className="text-2xl font-bold font-display mt-2">Scan the QR on the pack</h1>
              <div className="mt-5 aspect-square max-w-xs mx-auto bg-white/10 rounded-2xl border-2 border-dashed border-white/30 relative overflow-hidden flex items-center justify-center">
                <QrCode className="size-24 opacity-60" />
                <div className="absolute inset-x-0 h-12 scan-line" />
                <div className="absolute top-3 left-3 size-6 border-t-2 border-l-2 border-white/80" />
                <div className="absolute top-3 right-3 size-6 border-t-2 border-r-2 border-white/80" />
                <div className="absolute bottom-3 left-3 size-6 border-b-2 border-l-2 border-white/80" />
                <div className="absolute bottom-3 right-3 size-6 border-b-2 border-r-2 border-white/80" />
              </div>
              <button className="mt-5 w-full h-11 rounded-xl bg-white text-primary font-semibold">Open Camera</button>
              <div className="mt-3 text-center text-xs opacity-80">or enter Batch ID manually</div>
              <input placeholder="AYT-ASH-02418" className="mt-2 w-full h-11 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-center font-mono outline-none focus:bg-white/20" />
            </div>
          </div>

          <Panel title="Recently Verified" className="mt-5">
            <div className="space-y-2">
              {BATCHES.slice(0, 4).map((b) => (
                <div key={b.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/40">
                  <div className="size-9 rounded-lg bg-emerald/10 flex items-center justify-center text-lg">{b.herb.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{b.herb.name}</div>
                    <div className="text-[10px] text-muted-foreground font-mono">{b.id}</div>
                  </div>
                  <CheckCircle2 className="size-4 text-emerald" />
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Product detail */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="gradient-hero p-6 text-white flex items-start justify-between flex-wrap gap-3">
              <div>
                <div className="text-xs uppercase tracking-wider opacity-80">Verified Authentic</div>
                <div className="text-2xl font-bold font-display mt-1">Ashwagandha Root Powder · 240g</div>
                <div className="text-sm opacity-80 mt-1 font-mono">{featured.id}</div>
              </div>
              <div className="text-right">
                <ShieldCheck className="size-10 inline" />
                <div className="text-xs uppercase tracking-wider mt-1">On-chain verified</div>
              </div>
            </div>

            <div className="p-6 grid sm:grid-cols-4 gap-3">
              {[
                { l: "Sustainability", v: "94", t: "emerald" as const },
                { l: "DNA Match", v: "99.6%", t: "info" as const },
                { l: "Moisture", v: "9.2%", t: "success" as const },
                { l: "Trust Score", v: "A+", t: "warning" as const },
              ].map((s) => (
                <div key={s.l} className="bg-muted/40 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold font-display">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Journey timeline */}
            <div className="px-6 pb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Provenance Journey</div>
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-emerald before:via-saffron before:to-emerald">
                {[
                  { icon: Sprout, t: "Harvested by Ramesh Kumar", s: "Kotagiri, Nilgiris · Tamil Nadu", d: "Aug 12, 2026" },
                  { icon: Boxes, t: "Aggregated at Coimbatore Hub", s: "Merged with 3 batches · 240 kg", d: "Aug 14, 2026" },
                  { icon: FlaskConical, t: "Lab Verified · NABL-7821", s: "DNA, moisture & pesticide passed", d: "Aug 16, 2026" },
                  { icon: Package, t: "Processed & Packaged", s: "Cold dried · Stone-ground · Serialized", d: "Aug 18, 2026" },
                  { icon: Truck, t: "Distributed via cold chain", s: "Bengaluru → Mumbai retail", d: "Aug 22, 2026" },
                  { icon: QrCode, t: "Verified by you", s: "Authenticity confirmed on-chain", d: "Just now" },
                ].map((e, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-6 size-5 rounded-full gradient-leaf flex items-center justify-center border-2 border-background">
                      <e.icon className="size-2.5 text-white" />
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-sm">{e.t}</div>
                        <div className="text-xs text-muted-foreground">{e.s}</div>
                      </div>
                      <div className="text-xs text-muted-foreground whitespace-nowrap">{e.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Panel title="Farm Origin">
              <div className="max-w-[220px] mx-auto"><IndiaMap markers={[{ lat: REGIONS[0].lat, lng: REGIONS[0].lng, label: "Farm" }]} /></div>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <MapPin className="size-4 text-emerald" />
                <span>Kotagiri, Nilgiris · 11.49°N, 76.73°E</span>
              </div>
            </Panel>
            <Panel title="Meet the Farmer">
              <div className="flex items-center gap-3">
                <div className="size-14 rounded-full gradient-leaf flex items-center justify-center text-white font-bold">RK</div>
                <div>
                  <div className="font-semibold">Ramesh Kumar</div>
                  <div className="text-xs text-muted-foreground">Farmer ID F-2847 · 18 years experience</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="size-3 fill-saffron text-saffron" />)}
                    <span className="text-xs text-muted-foreground ml-1">Trusted partner</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic">"Three generations of my family have farmed these slopes. Every plant is harvested by hand with respect for the forest."</p>
            </Panel>
            <Panel title="Lab Certificate">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                <FileBadge className="size-8 text-primary" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">CoA-{featured.id}.pdf</div>
                  <div className="text-xs text-muted-foreground font-mono truncate">ipfs://Qm{featured.txHash.slice(4, 18)}…</div>
                </div>
                <Badge tone="success"><Lock className="size-3" /> IPFS</Badge>
              </div>
              <Link to="/consumer/dashboard" className="mt-3 text-xs text-primary font-medium flex items-center gap-1">View full report <ArrowRight className="size-3" /></Link>
            </Panel>
            <Panel title="Blockchain Proof">
              <div className="font-mono text-xs space-y-1.5">
                <div className="flex justify-between"><span className="text-muted-foreground">Block</span><span>{featured.block.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Confirms</span><span className="text-emerald">324</span></div>
                <div className="text-muted-foreground">Tx hash</div>
                <div className="break-all bg-muted/40 p-2 rounded">{featured.txHash}</div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
