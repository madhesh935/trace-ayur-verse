import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Leaf, ShieldCheck, MapPin, QrCode, FlaskConical, BarChart3, Boxes,
  ArrowRight, Sparkles, Globe, Lock, Activity, TreePine, Sprout, Microscope,
  Truck, FileCheck2, AlertTriangle, CheckCircle2, Github, Twitter, Linkedin,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { IndiaMap } from "@/components/maps/IndiaMap";
import { Panel, Badge } from "@/components/ui-kit/Panel";
import { COLLECTION_TREND, REGIONS, BATCHES } from "@/lib/mock-data";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <GpsSection />
      <BlockchainSection />
      <SustainabilitySection />
      <ConsumerSection />
      <AnalyticsPreview />
      <CtaSection />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#solution" className="hover:text-foreground">Platform</a>
          <a href="#blockchain" className="hover:text-foreground">Blockchain</a>
          <a href="#sustainability" className="hover:text-foreground">Sustainability</a>
          <a href="#analytics" className="hover:text-foreground">Analytics</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/consumer/dashboard" className="hidden sm:inline-flex h-9 items-center px-4 rounded-lg text-sm font-medium hover:bg-muted">
            Track Product
          </Link>
          <Link to="/login" className="h-9 inline-flex items-center px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 shadow-soft">
            Sign In <ArrowRight className="size-3.5 ml-1.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-20 -right-40 size-[500px] rounded-full bg-emerald/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 size-[500px] rounded-full bg-saffron/15 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 fade-up">
          <Badge tone="success">
            <Sparkles className="size-3" /> Ministry of AYUSH · NMPB Compliant
          </Badge>
          <h1 className="mt-5 text-5xl lg:text-6xl font-bold leading-[1.05] font-display">
            Blockchain-powered <span className="text-gradient">botanical traceability</span> for Ayurveda
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Track every Ayurvedic herb from collection to consumer with geo-tagged transparency,
            immutable blockchain provenance, AI-driven quality assurance, and real-time sustainability
            monitoring across India's medicinal plant supply chain.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/consumer/dashboard" className="h-12 inline-flex items-center px-6 rounded-xl gradient-hero text-white font-semibold shadow-glow hover:shadow-card transition-all">
              <QrCode className="size-4 mr-2" /> Track a Product
            </Link>
            <a href="#solution" className="h-12 inline-flex items-center px-6 rounded-xl border border-border bg-card font-semibold hover:bg-muted transition-all">
              Explore Platform
            </a>
            <Link to="/login" className="h-12 inline-flex items-center px-6 rounded-xl font-semibold hover:bg-muted">
              Sign in <ArrowRight className="size-4 ml-2" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-xl">
            {[
              { n: "12,847", l: "Verified Batches" },
              { n: "3,210", l: "Registered Farmers" },
              { n: "98.7%", l: "Authenticity Rate" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-bold font-display">{s.n}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      {/* Floating provenance card */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-5 relative z-10 fade-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-lg gradient-leaf flex items-center justify-center">
              <Leaf className="size-4 text-white" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Batch</div>
              <div className="font-semibold font-mono text-sm">AYT-ASH-02418</div>
            </div>
          </div>
          <Badge tone="success"><ShieldCheck className="size-3" /> Verified</Badge>
        </div>
        <div className="space-y-3">
          {[
            { icon: Sprout, label: "Harvested", val: "Kotagiri, Nilgiris · Ramesh Kumar", time: "2h ago" },
            { icon: Truck, label: "Aggregated", val: "Coimbatore Hub · Batch merged", time: "1h ago" },
            { icon: FlaskConical, label: "Lab Tested", val: "DNA + Moisture 9.2% · Passed", time: "32m ago" },
            { icon: Boxes, label: "Packaged", val: "Serialized QR · 240 units", time: "8m ago" },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="size-8 rounded-lg bg-emerald/10 text-emerald flex items-center justify-center shrink-0">
                <s.icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-xs text-muted-foreground truncate">{s.val}</div>
              </div>
              <div className="text-[10px] text-muted-foreground">{s.time}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
          <span className="font-mono text-muted-foreground">0x4a9f...e218b</span>
          <Badge tone="info"><Lock className="size-3" /> Block 18,420,931</Badge>
        </div>
      </div>

      {/* QR card */}
      <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl border border-border shadow-card p-4 z-20 fade-up">
        <div className="relative w-32 h-32 rounded-lg overflow-hidden grid-bg flex items-center justify-center">
          <QrPattern />
          <div className="absolute inset-x-0 h-8 scan-line" />
        </div>
        <div className="text-xs text-center mt-2 font-medium">Scan to verify</div>
      </div>

      {/* GPS chip */}
      <div className="absolute -top-4 -right-4 glass rounded-xl p-3 shadow-soft z-20">
        <div className="flex items-center gap-2">
          <div className="relative">
            <MapPin className="size-5 text-emerald" />
            <span className="absolute inset-0 rounded-full pulse-ring" />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase">Live GPS</div>
            <div className="text-xs font-mono">11.49°N · 76.73°E</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QrPattern() {
  // Stylized QR-like pattern
  const cells = Array.from({ length: 169 });
  return (
    <div className="grid grid-cols-13 gap-px w-28 h-28" style={{ gridTemplateColumns: "repeat(13, 1fr)" }}>
      {cells.map((_, i) => {
        const isCorner =
          (i % 13 < 3 && i < 39) ||
          (i % 13 > 9 && i < 39) ||
          (i % 13 < 3 && i > 129);
        const on = isCorner ? (i % 13 < 3 || i % 13 > 9 ? Math.floor(i / 13) % 3 !== 1 || i % 13 === 0 || i % 13 === 2 || i % 13 === 10 || i % 13 === 12 : true) : (i * 7) % 3 === 0;
        return <div key={i} className={on ? "bg-primary" : "bg-transparent"} />;
      })}
    </div>
  );
}

function Problem() {
  const items = [
    { icon: AlertTriangle, title: "Adulteration & Fakes", body: "~25% of Ayurvedic exports flagged for substituted or fake botanicals." },
    { icon: MapPin, title: "Unknown Origins", body: "Most herbs lack verifiable farm-of-origin or harvest documentation." },
    { icon: TreePine, title: "Unsustainable Harvesting", body: "Over-collection from protected forests threatens endangered species." },
    { icon: FileCheck2, title: "Manual, Fragmented Records", body: "Paper-based supply chains break export compliance and consumer trust." },
  ];
  return (
    <section className="py-24 border-y border-border bg-card/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <Badge tone="danger"><AlertTriangle className="size-3" /> The Problem</Badge>
          <h2 className="text-4xl font-bold font-display mt-4">A $10B industry built on opaque supply chains</h2>
          <p className="text-muted-foreground mt-3 text-lg">India produces 80% of the world's Ayurvedic raw materials — yet most herbs travel through fragmented networks with no proof of origin, authenticity, or sustainability.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {items.map((it) => (
            <div key={it.title} className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <div className="size-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
                <it.icon className="size-5" />
              </div>
              <h3 className="font-semibold mt-4 font-display">{it.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const stages = [
    { icon: Sprout, label: "Collection", sub: "Geo-tagged harvest", tone: "from-emerald/20 to-emerald/0" },
    { icon: Boxes, label: "Aggregation", sub: "Batch merging", tone: "from-leaf/30 to-leaf/0" },
    { icon: FlaskConical, label: "Lab Testing", sub: "DNA · moisture · pesticide", tone: "from-saffron/25 to-saffron/0" },
    { icon: Microscope, label: "Processing", sub: "Drying · grinding", tone: "from-earth/20 to-earth/0" },
    { icon: Truck, label: "Distribution", sub: "Cold-chain logistics", tone: "from-primary/15 to-primary/0" },
    { icon: QrCode, label: "Consumer", sub: "QR verification", tone: "from-emerald/25 to-emerald/0" },
  ];
  return (
    <section id="solution" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Badge tone="info"><Sparkles className="size-3" /> The Solution</Badge>
          <h2 className="text-4xl font-bold mt-4 font-display">From farm to formulation — verified at every step</h2>
          <p className="text-muted-foreground mt-3 text-lg">A six-stage traceability pipeline written immutably to the AyurTrace blockchain.</p>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-0 relative">
          <div className="hidden lg:block absolute top-12 left-[8%] right-[8%] h-px bg-gradient-to-r from-emerald via-saffron to-emerald opacity-40" />
          {stages.map((s, i) => (
            <div key={s.label} className="relative">
              <div className="bg-card border border-border rounded-2xl p-4 text-center shadow-card relative z-10">
                <div className={`size-14 rounded-2xl mx-auto bg-gradient-to-br ${s.tone} border border-border flex items-center justify-center`}>
                  <s.icon className="size-6 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground mt-3">Stage 0{i + 1}</div>
                <div className="font-semibold text-sm mt-0.5 font-display">{s.label}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GpsSection() {
  const markers = REGIONS.map((r) => ({ lat: r.lat, lng: r.lng, label: r.name }));
  return (
    <section className="py-24 bg-card/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge tone="success"><MapPin className="size-3" /> GPS Traceability</Badge>
          <h2 className="text-4xl font-bold mt-4 font-display">Every leaf, every coordinate</h2>
          <p className="text-muted-foreground mt-3 text-lg">Farmers capture geo-tagged collection records directly from the field — validated against approved harvest zones, protected forests, and species-specific quotas.</p>
          <div className="mt-8 space-y-3">
            {[
              { icon: MapPin, t: "Sub-meter GPS accuracy", d: "Captured offline-first via mobile app, synced when online." },
              { icon: TreePine, t: "Approved harvest zones", d: "Geo-fenced against NMPB protected and conservation areas." },
              { icon: Activity, t: "Live regional dashboards", d: "Regulators see real-time harvest density and species distribution." },
            ].map((f) => (
              <div key={f.t} className="flex gap-3 items-start">
                <div className="size-9 rounded-lg bg-emerald/10 text-emerald flex items-center justify-center shrink-0">
                  <f.icon className="size-4" />
                </div>
                <div>
                  <div className="font-medium">{f.t}</div>
                  <div className="text-sm text-muted-foreground">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-md mx-auto w-full">
          <IndiaMap markers={markers} />
        </div>
      </div>
    </section>
  );
}

function BlockchainSection() {
  return (
    <section id="blockchain" className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div className="bg-card rounded-2xl border border-border shadow-card p-6 font-mono text-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">AyurTrace Ledger</span>
              <Badge tone="success"><span className="size-1.5 rounded-full bg-emerald animate-pulse" /> Synced</Badge>
            </div>
            <div className="space-y-2">
              {BATCHES.slice(0, 5).map((b, i) => (
                <div key={b.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted transition-colors">
                  <div className="size-2 rounded-full bg-emerald shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-foreground font-medium truncate">{b.id}</div>
                    <div className="text-muted-foreground truncate">{b.txHash}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-foreground">Block {b.block.toLocaleString()}</div>
                    <div className="text-muted-foreground">{i === 0 ? "just now" : `${i * 4}m ago`}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <Badge tone="info"><Lock className="size-3" /> Blockchain Verification</Badge>
          <h2 className="text-4xl font-bold mt-4 font-display">Immutable provenance, cryptographically sealed</h2>
          <p className="text-muted-foreground mt-3 text-lg">Every collection, lab result, processing event, and shipment is hashed and committed to the AyurTrace blockchain — creating a tamper-proof audit trail from farm to consumer.</p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { v: "Hyperledger", l: "Permissioned chain" },
              { v: "IPFS", l: "Decentralized certs" },
              { v: "<2s", l: "Block finality" },
              { v: "100%", l: "Immutable history" },
            ].map((s) => (
              <div key={s.l} className="bg-card border border-border rounded-xl p-4">
                <div className="text-2xl font-bold font-display text-gradient">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SustainabilitySection() {
  return (
    <section id="sustainability" className="py-24 bg-card/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Badge tone="success"><TreePine className="size-3" /> Sustainability</Badge>
          <h2 className="text-4xl font-bold mt-4 font-display">Conservation built into every transaction</h2>
          <p className="text-muted-foreground mt-3 text-lg">Real-time biodiversity, quota, and ethical-sourcing metrics — visible to regulators and consumers alike.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {[
            { v: "94", l: "Avg Sustainability Score", d: "Across all verified batches", c: "emerald" },
            { v: "0 / 14", l: "Endangered Species Detected", d: "AI flagged in last 30 days", c: "leaf" },
            { v: "82%", l: "Within Harvest Quota", d: "NMPB regional compliance", c: "saffron" },
          ].map((s) => (
            <div key={s.l} className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <div className={`text-5xl font-bold font-display ${s.c === "emerald" ? "text-emerald" : s.c === "saffron" ? "text-saffron" : "text-leaf"}`}>{s.v}</div>
              <div className="font-semibold mt-3">{s.l}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsumerSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge tone="info"><QrCode className="size-3" /> Consumer Transparency</Badge>
          <h2 className="text-4xl font-bold mt-4 font-display">One scan. The full story.</h2>
          <p className="text-muted-foreground mt-3 text-lg">Consumers scan a QR on any AyurTrace-certified product to see the farm, the farmer, lab certificates, processing dates, and the blockchain proof — in 30 seconds.</p>
          <div className="mt-6">
            <Link to="/consumer/dashboard" className="h-12 inline-flex items-center px-6 rounded-xl gradient-hero text-white font-semibold shadow-glow">
              Try Consumer Verification <ArrowRight className="size-4 ml-2" />
            </Link>
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="gradient-hero p-6 text-white">
            <div className="text-xs uppercase tracking-wider opacity-80">Verified Authentic</div>
            <div className="text-2xl font-bold mt-1 font-display">Ashwagandha Root Powder</div>
            <div className="text-sm opacity-80 mt-1">Batch AYT-ASH-02418 · 240g</div>
          </div>
          <div className="p-6 space-y-4">
            {[
              { l: "Origin Farm", v: "Kotagiri, Nilgiris · 11.49°N" },
              { l: "Farmer", v: "Ramesh Kumar · F-2847" },
              { l: "Lab Verification", v: "DNA match 99.6% · Moisture 9.2%" },
              { l: "Sustainability", v: "Score 94 · NMPB compliant" },
              { l: "Blockchain", v: "Block 18,420,931 · 4 confirmations" },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{r.l}</span>
                <span className="font-medium text-right truncate ml-4">{r.v}</span>
              </div>
            ))}
            <div className="pt-4 border-t border-border flex items-center justify-center gap-2 text-emerald text-sm font-medium">
              <CheckCircle2 className="size-4" /> Authenticity verified on-chain
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnalyticsPreview() {
  return (
    <section id="analytics" className="py-24 bg-card/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-xl">
            <Badge tone="info"><BarChart3 className="size-3" /> Analytics</Badge>
            <h2 className="text-4xl font-bold mt-4 font-display">Insights for every stakeholder</h2>
            <p className="text-muted-foreground mt-3">Real-time KPIs across the entire Ayurvedic supply chain.</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          <Panel title="Monthly Herb Collection" subtitle="Aggregated across all verified farms" className="lg:col-span-2">
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={COLLECTION_TREND}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.68 0.17 155)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.68 0.17 155)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  <Area type="monotone" dataKey="kg" stroke="oklch(0.55 0.15 155)" fill="url(#g1)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>
          <Panel title="Regional Trust Score" subtitle="Top performing zones">
            <div className="space-y-3">
              {REGIONS.slice(0, 5).map((r, i) => {
                const score = 78 + (i * 4) % 20;
                return (
                  <div key={r.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{r.name}, {r.state}</span>
                      <span className="text-emerald font-semibold">{score}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full gradient-leaf" style={{ width: `${score}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative gradient-hero rounded-3xl p-12 lg:p-16 text-white overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute -top-20 -right-20 size-80 rounded-full bg-leaf/30 blur-3xl" />
          <div className="relative">
            <Globe className="size-10 opacity-80" />
            <h2 className="text-4xl lg:text-5xl font-bold mt-6 font-display max-w-2xl">Bring your Ayurvedic supply chain on-chain.</h2>
            <p className="mt-4 text-white/80 text-lg max-w-2xl">Onboard your cooperative, processing unit, or laboratory in under a week. Built for rural-first deployment with offline-capable mobile apps.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login" className="h-12 inline-flex items-center px-6 rounded-xl bg-white text-primary font-semibold hover:bg-white/90">
                Get Started <ArrowRight className="size-4 ml-2" />
              </Link>
              <a href="#" className="h-12 inline-flex items-center px-6 rounded-xl border border-white/30 font-semibold hover:bg-white/10">
                Request Government Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <Logo />
          <p className="text-sm text-muted-foreground mt-4 max-w-xs">Blockchain-powered botanical traceability for the global Ayurvedic supply chain.</p>
          <div className="flex gap-3 mt-4 text-muted-foreground">
            <a href="#"><Github className="size-4" /></a>
            <a href="#"><Twitter className="size-4" /></a>
            <a href="#"><Linkedin className="size-4" /></a>
          </div>
        </div>
        {[
          { h: "Platform", l: ["Farmers", "Processors", "Laboratories", "Regulators", "Consumers"] },
          { h: "Resources", l: ["Documentation", "API", "Whitepaper", "Sustainability Mission"] },
          { h: "Contact", l: ["partners@ayurtrace.in", "Bengaluru, India", "+91 80 4567 8900"] },
        ].map((c) => (
          <div key={c.h}>
            <div className="font-semibold text-sm">{c.h}</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.l.map((i) => <li key={i}><a href="#" className="hover:text-foreground">{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-border flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
        <span>© 2026 AyurTrace · Built for Ministry of AYUSH & NMPB</span>
        <span className="flex items-center gap-3"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Compliance</a></span>
      </div>
    </footer>
  );
}
