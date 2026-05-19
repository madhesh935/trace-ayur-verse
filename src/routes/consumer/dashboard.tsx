import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Badge } from "@/components/ui-kit/Panel";
import { IndiaMap } from "@/components/maps/IndiaMap";
import {
  QrCode, History, ShieldCheck, Leaf, Sprout, FlaskConical,
  Truck, Boxes, Package, MapPin, CheckCircle2, Star, FileBadge, Lock,
  ArrowRight, Dna, Droplets, Award, Search, Camera, RotateCcw, Download,
} from "lucide-react";
import { BATCHES, REGIONS } from "@/lib/mock-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/consumer/dashboard")({ component: ConsumerDashboard });

const nav: NavItem[] = [
  { label: "Scan Product",      to: "/consumer/dashboard",     icon: QrCode, i18nKey: "nav.scan" },
  { label: "My Verifications",  to: "/consumer/verifications", icon: History, i18nKey: "nav.verifications" },
  { label: "Verified Products", to: "/consumer/verified",      icon: ShieldCheck, i18nKey: "nav.verified" },
  { label: "Sustainability",    to: "/consumer/sustainability", icon: Leaf, i18nKey: "nav.sustainability" },
];

const featured = BATCHES[0];

const METRICS = [
  { icon: Award,       label: "Sustainability", value: "94/100", sub: "Top 8% in India",    color: "text-emerald", bg: "bg-emerald/10 border-emerald/30" },
  { icon: Dna,         label: "DNA Match",      value: "99.6%",  sub: "Withania somnifera", color: "text-primary", bg: "bg-primary/10 border-primary/30" },
  { icon: Droplets,    label: "Moisture",       value: "9.2%",   sub: "Pass · Limit ≤12%",  color: "text-emerald", bg: "bg-emerald/10 border-emerald/30" },
  { icon: ShieldCheck, label: "Trust Score",    value: "A+",     sub: "NMPB Certified",     color: "text-saffron", bg: "bg-saffron/10 border-saffron/30" },
];

const JOURNEY = [
  { icon: Sprout,       step: "Harvested",  who: "Ramesh Kumar",              detail: "Kotagiri, Nilgiris · Tamil Nadu",        date: "Aug 12, 2026" },
  { icon: Boxes,        step: "Aggregated", who: "Coimbatore Processing Hub", detail: "4 batches merged · 240 kg total",         date: "Aug 14, 2026" },
  { icon: FlaskConical, step: "Lab Tested", who: "NABL-7821 · Dr. Priya Iyer",detail: "DNA, moisture & pesticide cleared",       date: "Aug 16, 2026" },
  { icon: Package,      step: "Packaged",   who: "GMP Facility, Coimbatore",  detail: "Cold dried · Stone-ground · Serialized",  date: "Aug 18, 2026" },
  { icon: Truck,        step: "Shipped",    who: "Cold-chain fleet",           detail: "Bengaluru → Mumbai retail network",       date: "Aug 22, 2026" },
  { icon: QrCode,       step: "Verified",   who: "You · Aarav Nair",           detail: "Authenticity confirmed on-chain",         date: "Just now" },
];

const RECENT = BATCHES.slice(0, 8).map((b, i) => ({
  ...b,
  brand: ["Himalaya","Patanjali","Dabur","Baidyanath","Kerala Ayurveda","Vaidyaratnam","Charak","Zandu"][i],
  timeAgo: ["Just now","1h ago","Yesterday","2d ago","3d ago","4d ago","5d ago","6d ago"][i],
}));

/* ──────────────────────────────────────────────────── */
/*  SCANNER VIEW (before scan)                          */
/* ──────────────────────────────────────────────────── */
function ScannerView({ onScan }: { onScan: () => void }) {
  const { t } = useLang();
  return (
    <div className="flex flex-col gap-5">
      {/* Scanner card — centered, prominent */}
      <div className="max-w-md mx-auto w-full">
        <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden shadow-sm">
          <div className="h-1 w-full bg-gradient-to-r from-emerald via-primary to-leaf" />
          <div className="p-6 space-y-5">
            <div className="text-center">
              <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                <QrCode className="size-7 text-primary" />
              </div>
              <h2 className="text-xl font-bold font-display text-foreground">{t("consumer.scan_verify")}</h2>
              <p className="text-sm text-muted-foreground mt-1">{t("consumer.point_qr")}</p>
            </div>

            {/* Viewfinder */}
            <div className="relative w-full aspect-square rounded-2xl border-2 border-dashed border-primary/40 bg-gradient-to-br from-primary/5 via-muted/20 to-muted/5 overflow-hidden flex items-center justify-center">
              <QrCode className="size-28 text-muted-foreground/15" />
              <div className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-primary/35 to-transparent scan-line pointer-events-none" />
              {[
                "top-4 left-4 border-t-[4px] border-l-[4px]",
                "top-4 right-4 border-t-[4px] border-r-[4px]",
                "bottom-4 left-4 border-b-[4px] border-l-[4px]",
                "bottom-4 right-4 border-b-[4px] border-r-[4px]",
              ].map((cls, i) => (
                <div key={i} className={`absolute size-8 border-primary rounded-sm ${cls}`} />
              ))}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                  <div className="size-1.5 rounded-full bg-emerald animate-pulse" />
                  Scanning for QR code…
                </div>
              </div>
            </div>

            <button
              onClick={onScan}
              className="w-full h-13 rounded-xl gradient-hero text-white font-bold shadow-glow hover:scale-[1.02] active:scale-100 transition-transform flex items-center justify-center gap-2 text-base py-3.5"
            >
              <Camera className="size-5" /> {t("consumer.scan_verify")}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-border/40" />
              <span className="text-xs text-muted-foreground font-medium">{t("consumer.or_enter")}</span>
              <div className="flex-1 border-t border-border/40" />
            </div>

            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="e.g. AYT-ASH-02418"
                  className="w-full h-11 pl-9 pr-3 rounded-xl border border-border/60 bg-muted/30 font-mono text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>
              <button onClick={onScan} className="h-11 px-5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity">
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent scans below scanner */}
      <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
          <div>
            <div className="font-bold text-foreground">{t("consumer.recent_scans")}</div>
            <div className="text-xs text-muted-foreground">Your verification history</div>
          </div>
          <Link to="/consumer/verifications" className="text-xs text-primary font-bold flex items-center gap-1 hover:underline">
            View all <ArrowRight className="size-3" />
          </Link>
        </div>
        <div className="divide-y divide-border/40">
          {RECENT.map((b, i) => (
            <button
              key={b.id}
              onClick={onScan}
              className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors group text-left"
            >
              <div className="size-11 rounded-xl bg-muted/60 border border-border/40 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                {b.herb.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-foreground truncate">{b.herb.name}</div>
                <div className="text-xs text-muted-foreground truncate">{b.brand}</div>
                <div className="font-mono text-[10px] text-muted-foreground/70 mt-0.5">{b.id}</div>
              </div>
              <div className="text-right shrink-0 flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald" />
                  <span className="text-xs font-semibold text-emerald">Authentic</span>
                </div>
                <div className="text-[10px] text-muted-foreground">{b.timeAgo}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-border/40">
          <Link to="/consumer/verifications" className="w-full h-10 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/50 text-sm font-bold flex items-center justify-center gap-2 transition-colors text-foreground">
            View All Verifications <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────── */
/*  RESULT VIEW (after scan)                            */
/* ──────────────────────────────────────────────────── */
function ResultView({ onReset }: { onReset: () => void }) {
  const { t } = useLang();
  return (
    <div className="space-y-5">

      {/* ── Success banner ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-emerald flex items-center justify-center shadow-glow">
            <CheckCircle2 className="size-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg text-foreground">{t("consumer.verified_success")}</div>
            <div className="text-xs text-muted-foreground">Scanned just now · Blockchain record confirmed</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onReset} className="h-9 px-4 rounded-xl border border-border/60 bg-card/70 text-sm font-semibold flex items-center gap-2 hover:bg-muted/50 transition-colors">
            <RotateCcw className="size-4" /> {t("consumer.scan_another")}
          </button>
          <Link to="/consumer/verifications" className="h-9 px-4 rounded-xl border border-border/60 bg-card/70 text-sm font-semibold flex items-center gap-2 hover:bg-muted/50 transition-colors">
            <History className="size-4" /> {t("nav.verifications")}
          </Link>
        </div>
      </div>

      {/* ── Product hero ── */}
      <div className="rounded-2xl border border-emerald/30 bg-card/80 backdrop-blur-xl overflow-hidden shadow-sm">
        <div className="relative bg-gradient-to-br from-primary to-emerald/80 px-6 py-6 overflow-hidden">
          <div className="absolute -top-12 -right-12 size-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="size-5 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle2 className="size-3 text-white" />
                </div>
                <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Verified Authentic · On-Chain</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-white leading-tight">Ashwagandha Root Powder</h2>
              <div className="flex flex-wrap items-center gap-x-3 mt-2 text-white/70 text-sm">
                <span className="font-semibold text-white">240g</span>
                <span>Himalaya Wellness</span>
                <span className="font-mono text-xs bg-white/15 px-2 py-0.5 rounded">{featured.id}</span>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-center bg-white/15 border border-white/25 rounded-2xl px-5 py-4">
              <ShieldCheck className="size-8 text-white" />
              <div className="text-[9px] text-white/75 font-bold uppercase tracking-wider mt-1.5 text-center">Blockchain<br/>Verified</div>
            </div>
          </div>
        </div>

        {/* Quality metrics — 4 col stripe */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-border/50">
          {METRICS.map((m, i) => (
            <div key={m.label} className={`flex flex-col items-center py-5 px-4 text-center gap-1.5 hover:bg-muted/20 transition-colors ${i < 3 ? "border-r border-border/40" : ""}`}>
              <div className={`size-9 rounded-xl border flex items-center justify-center ${m.bg}`}>
                <m.icon className={`size-5 ${m.color}`} />
              </div>
              <div className={`text-xl font-bold font-display ${m.color}`}>{m.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{m.label === "Sustainability" ? t("nav.sustainability") : m.label}</div>
              <div className="text-[10px] text-muted-foreground">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Two-col: Journey + Sidebar ── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Journey timeline — 2 cols */}
        <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border/50">
            <div className="font-bold text-foreground">{t("consumer.supply_journey")}</div>
            <div className="text-xs text-muted-foreground">Every step verified and recorded on-chain</div>
          </div>
          <div className="p-6">
            <div className="relative pl-10">
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-emerald/60 via-primary/30 to-transparent" />
              <div className="space-y-3">
                {JOURNEY.map((s, i) => (
                  <div key={i} className="relative flex items-start gap-4">
                    <div className="absolute -left-10 size-8 rounded-full gradient-hero flex items-center justify-center border-2 border-background shadow-sm z-10">
                      <s.icon className="size-3.5 text-white" />
                    </div>
                    <div className="flex-1 flex items-start justify-between gap-3 bg-muted/20 border border-border/40 rounded-xl px-4 py-3 hover:bg-muted/40 hover:border-primary/20 transition-colors">
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-foreground">{s.step}
                          <span className="font-normal text-muted-foreground text-xs ml-1.5">· {s.who}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.detail}</div>
                      </div>
                      <div className="text-[11px] text-muted-foreground font-semibold shrink-0 whitespace-nowrap pt-0.5">{s.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Farmer + Lab Cert stacked */}
        <div className="flex flex-col gap-5">

          {/* Farmer */}
          <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden shadow-sm">
            <div className="h-1 w-full bg-gradient-to-r from-leaf to-emerald" />
            <div className="p-5 space-y-4">
              <div className="font-bold text-sm text-foreground">{t("consumer.meet_farmer")}</div>
              <div className="flex items-center gap-3">
                <div className="size-14 rounded-2xl gradient-leaf flex items-center justify-center text-white font-bold text-xl shadow-glow shrink-0">RK</div>
                <div>
                  <div className="font-bold text-foreground">Ramesh Kumar</div>
                  <div className="text-xs text-muted-foreground">ID: F-2847 · 18 yrs exp</div>
                  <div className="flex items-center gap-0.5 mt-1.5">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="size-3 fill-saffron text-saffron" />)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {[["94","Trust"],["2021","Since"],["Kotagiri","Village"]].map(([v,l]) => (
                  <div key={l} className="bg-muted/30 border border-border/40 rounded-xl py-2.5">
                    <div className="font-bold text-foreground text-sm">{v}</div>
                    <div className="text-muted-foreground text-[10px]">{l}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground italic bg-muted/20 border border-border/40 rounded-xl p-3 leading-relaxed">"Three generations of my family have farmed these slopes. Every plant is harvested by hand with respect for the forest."</p>
            </div>
          </div>

          {/* Lab Certificate */}
          <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-border/50">
              <div className="font-bold text-sm text-foreground">{t("consumer.lab_cert")}</div>
              <div className="text-xs text-muted-foreground">NABL accredited · IPFS anchored</div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
                <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileBadge className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-foreground truncate">CoA-{featured.id}.pdf</div>
                  <div className="text-[10px] font-mono text-muted-foreground truncate">ipfs://Qm{featured.txHash.slice(4,18)}…</div>
                </div>
                <Badge tone="success"><Lock className="size-2.5" /> IPFS</Badge>
              </div>
              {[["DNA","Authentic · 99.6%"],["Pesticide","Not Detected"],["Moisture","9.2% — Pass"],["Issued","Aug 16, 2026"]].map(([k,v]) => (
                <div key={k} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0 text-xs">
                  <span className="text-muted-foreground font-medium">{k}</span>
                  <span className="font-bold text-foreground">{v}</span>
                </div>
              ))}
              <button className="w-full h-9 rounded-xl border border-border/60 hover:bg-muted/50 text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                <Download className="size-3.5" /> {t("consumer.download_coa")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Map + Blockchain — full width row ── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Farm Origin Map — 2 cols */}
        <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between shrink-0">
            <div>
              <div className="font-bold text-foreground">Farm Origin Map</div>
              <div className="text-xs text-muted-foreground">GPS-stamped harvest location · verified on-chain</div>
            </div>
            <Badge tone="success"><MapPin className="size-3" /> GPS Verified</Badge>
          </div>
          <div className="flex-1 min-h-[220px] border-b border-border/40">
            <IndiaMap markers={[{ lat: REGIONS[0].lat, lng: REGIONS[0].lng, label: "Farm · Kotagiri" }]} />
          </div>
          <div className="p-4 grid grid-cols-4 gap-3">
            {[
              { l: "Location",   v: "Kotagiri, Nilgiris" },
              { l: "State",      v: "Tamil Nadu" },
              { l: "Coordinates",v: "11.49°N · 76.73°E" },
              { l: "Altitude",   v: "2,108 m" },
            ].map((f) => (
              <div key={f.l} className="bg-muted/30 border border-border/40 rounded-xl p-3">
                <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{f.l}</div>
                <div className="text-xs font-bold text-foreground mt-1">{f.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Proof */}
        <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-5 py-4 border-b border-border/50 shrink-0">
            <div className="font-bold text-foreground">{t("consumer.blockchain_proof")}</div>
            <div className="text-xs text-muted-foreground">Immutable on-chain record</div>
          </div>
          <div className="p-5 flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald/5 border border-emerald/20">
              <div className="size-9 rounded-full bg-emerald/15 flex items-center justify-center shrink-0">
                <CheckCircle2 className="size-5 text-emerald" />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">Authenticity Confirmed</div>
                <div className="text-[11px] text-emerald font-semibold">324 confirmations · Finalized</div>
              </div>
            </div>
            <div className="space-y-0 flex-1">
              {[
                ["Network",      "AyurTrace Ledger"],
                ["Block",        featured.block.toLocaleString()],
                ["Confirmations","324"],
                ["Status",       "Finalized ✓"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0 text-xs">
                  <span className="text-muted-foreground font-medium">{k}</span>
                  <span className={`font-bold ${k === "Status" ? "text-emerald" : "text-foreground"}`}>{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-muted/30 border border-border/40 rounded-xl p-3">
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold mb-1.5">Tx Hash</div>
              <div className="font-mono text-[10px] text-foreground break-all leading-relaxed">{featured.txHash}</div>
            </div>
            <button className="w-full h-10 rounded-xl gradient-hero text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow hover:scale-[1.02] transition-transform shrink-0">
              <Download className="size-3.5" /> {t("consumer.save_pdf")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────── */
/*  ROOT COMPONENT                                      */
/* ──────────────────────────────────────────────────── */
function ConsumerDashboard() {
  const [scanned, setScanned] = useState(false);
  const { t } = useLang();

  return (
    <PortalShell portalName="Consumer Portal" portalTagline="Authenticity verification" nav={nav} user={{ name: "Aarav Nair", role: "Consumer", initials: "AN" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight">
            {scanned ? "Scan Result" : t("consumer.scan_verify")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {scanned ? "Full provenance details for your scanned product" : t("consumer.tagline")}
          </p>
        </div>
        {scanned && (
          <button onClick={() => setScanned(false)} className="h-9 px-4 rounded-xl border border-border/60 bg-card/70 text-sm font-semibold flex items-center gap-2 hover:bg-muted/50 transition-colors">
            <RotateCcw className="size-4" /> {t("consumer.scan_another")}
          </button>
        )}
      </div>

      {scanned
        ? <ResultView onReset={() => setScanned(false)} />
        : <ScannerView onScan={() => setScanned(true)} />
      }
    </PortalShell>
  );
}
