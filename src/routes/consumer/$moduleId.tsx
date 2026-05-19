import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, Badge, StatCard } from "@/components/ui-kit/Panel";
import { LayoutDashboard, QrCode, History, ShieldCheck, Leaf, Star, MapPin, CheckCircle2, TreePine, Award, Globe } from "lucide-react";
import { BATCHES, REGIONS, HERBS, SUSTAINABILITY_BY_REGION } from "@/lib/mock-data";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/consumer/$moduleId")({ component: ConsumerModule });

const nav: NavItem[] = [
  { label: "Scan Product", to: "/consumer/dashboard", icon: QrCode },
  { label: "My Verifications", to: "/consumer/verifications", icon: History },
  { label: "Verified Products", to: "/consumer/verified", icon: ShieldCheck },
  { label: "Sustainability", to: "/consumer/sustainability", icon: Leaf },
];

function ConsumerModule() {
  const { moduleId } = Route.useParams();
  const pages: Record<string, React.ReactNode> = {
    verifications: <MyVerifications />,
    verified: <VerifiedProducts />,
    sustainability: <SustainabilityPage />,
  };
  return (
    <PortalShell portalName="Consumer Portal" portalTagline="Authenticity verification" nav={nav} user={{ name: "Aarav Nair", role: "Consumer", initials: "AN" }}>
      {pages[moduleId] ?? <div className="py-20 text-center text-muted-foreground">Module not found.</div>}
    </PortalShell>
  );
}

function MyVerifications() {
  const history = BATCHES.slice(0, 10).map((b, i) => ({
    ...b,
    scannedAt: `${i + 1} day${i > 0 ? "s" : ""} ago`,
    product: `${b.herb.name} ${["Root Powder", "Leaf Extract", "Capsules", "Tea"][i % 4]} · ${["100g", "250g", "500g"][i % 3]}`,
    brand: ["Himalaya", "Patanjali", "Dabur", "Baidyanath", "Kerala Ayurveda"][i % 5],
  }));
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display">My Verifications</h1>
        <p className="text-sm text-muted-foreground mt-1">Your complete QR scan history with authenticity results</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Scans" value="10" icon={QrCode} tone="primary" />
        <StatCard label="All Authentic" value="10 / 10" icon={ShieldCheck} tone="emerald" hint="100% pass rate" />
        <StatCard label="Herbs Tried" value="8" icon={Leaf} tone="earth" />
        <StatCard label="Trust Score" value="A+" icon={Award} tone="saffron" />
      </div>
      <div className="space-y-3">
        {history.map((b) => (
          <div key={b.id} className="bg-card/80 border border-border/60 rounded-2xl p-5 hover:border-emerald/30 hover:shadow-card transition-all flex items-center gap-5">
            <div className="size-14 rounded-2xl bg-gradient-to-br from-emerald/10 to-primary/10 border border-border/50 flex items-center justify-center text-3xl shrink-0">{b.herb.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-foreground">{b.product}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{b.brand} · Batch: <span className="font-mono">{b.id}</span></div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                <MapPin className="size-3" /> {b.region.name}
                <span className="mx-1">·</span>
                <span>{b.scannedAt}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <Badge tone="success"><ShieldCheck className="size-3 mr-1" />Authentic</Badge>
              <div className="text-xs text-emerald font-semibold mt-2">DNA: 99.{b.sustainability % 6 + 1}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerifiedProducts() {
  const products = HERBS.map((h, i) => ({
    herb: h,
    brand: ["Himalaya", "Patanjali", "Dabur", "Baidyanath", "Kerala Ayurveda", "Vaidyaratnam", "Charak", "Arya Vaidya Sala", "SNA", "AVP", "Kottakkal", "Shree Dhootapapeshwar"][i],
    sku: `${h.id}-${200 + i}`,
    dna: 98 + (i % 2),
    rating: 4 + (i % 2) * 0.5,
    reviews: 120 + (i * 47) % 800,
    price: `₹${180 + (i * 67) % 400}`,
  }));
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display">Verified Products</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse AyurTrace-certified authentic Ayurvedic products</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => (
          <div key={p.sku} className="bg-card/80 border border-border/60 rounded-2xl p-5 hover:border-primary/30 hover:shadow-card transition-all flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-muted/80 to-muted/30 border border-border/50 flex items-center justify-center text-3xl">{p.herb.emoji}</div>
              <Badge tone="success"><ShieldCheck className="size-3" /> Verified</Badge>
            </div>
            <div className="font-bold text-lg text-foreground leading-tight">{p.herb.name}</div>
            <div className="text-xs text-muted-foreground italic mt-0.5">{p.herb.latin}</div>
            <div className="text-sm font-medium text-muted-foreground mt-1">{p.brand}</div>
            <div className="flex items-center gap-1 mt-2">
              {[1,2,3,4,5].map((s) => <Star key={s} className={`size-3 ${s <= p.rating ? "fill-saffron text-saffron" : "text-muted"}`} />)}
              <span className="text-xs text-muted-foreground ml-1">{p.reviews} reviews</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div className="bg-muted/30 rounded-xl p-2.5 text-center">
                <div className="text-muted-foreground">DNA Score</div>
                <div className="font-bold text-emerald mt-0.5">{p.dna}%</div>
              </div>
              <div className="bg-muted/30 rounded-xl p-2.5 text-center">
                <div className="text-muted-foreground">Price</div>
                <div className="font-bold mt-0.5">{p.price}</div>
              </div>
            </div>
            <button className="mt-4 w-full h-10 rounded-xl gradient-hero text-white font-semibold text-sm hover:scale-[1.02] transition-transform">View Provenance</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SustainabilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display">Sustainability Impact</h1>
        <p className="text-sm text-muted-foreground mt-1">See how your purchases support ethical harvesting and biodiversity</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Eco Score (Avg)" value="91 / 100" icon={Leaf} tone="emerald" hint="Your scanned products" />
        <StatCard label="Farmers Supported" value="7" icon={Award} tone="primary" />
        <StatCard label="Carbon Saved" value="142 kg" delta="vs conventional" icon={TreePine} tone="emerald" />
        <StatCard label="Protected Zones" value="6" icon={Globe} tone="earth" hint="Sourced from" />
      </div>

      {/* Impact story cards */}
      <div className="grid sm:grid-cols-3 gap-5">
        {[
          { icon: "🌱", title: "Wild-Crafted Ethically", desc: "Every herb you verified was harvested within NMPB-approved zones, protecting 1,240+ biodiversity hotspots across India." },
          { icon: "👨‍🌾", title: "Empowering Farmers", desc: "Blockchain traceability ensures fair payments reach rural farmers directly, with no middlemen cutting into their income." },
          { icon: "🌿", title: "Regenerative Harvesting", desc: "Sustainability scores above 90 mean mother plants are preserved, soils are not degraded, and forests continue to thrive." },
        ].map((c) => (
          <div key={c.title} className="bg-card/80 border border-border/60 rounded-2xl p-6 hover:border-emerald/30 transition-colors">
            <div className="text-4xl mb-3">{c.icon}</div>
            <div className="font-bold text-foreground">{c.title}</div>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      <Panel title="Eco Score by Region" subtitle="Sourcing sustainability per harvest zone">
        <div className="h-56">
          <ResponsiveContainer>
            <BarChart data={SUSTAINABILITY_BY_REGION} margin={{ left: -10 }}>
              <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: "oklch(0.15 0.03 155)", borderRadius: "12px", border: "none", color: "#fff" }} />
              <Bar dataKey="score" fill="oklch(0.55 0.15 155)" radius={[6,6,0,0]} name="Eco Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Regions You've Sourced From">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REGIONS.slice(0, 6).map((r, i) => (
            <div key={r.name} className="flex items-center gap-4 p-4 bg-muted/30 border border-border/40 rounded-xl hover:border-emerald/30 transition-colors">
              <div className="size-10 rounded-xl bg-emerald/10 flex items-center justify-center"><MapPin className="size-5 text-emerald" /></div>
              <div>
                <div className="font-bold text-sm">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.state} · {r.type}</div>
                <div className="text-xs text-emerald font-medium mt-0.5">Eco: {75 + (i * 7) % 25} / 100</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
