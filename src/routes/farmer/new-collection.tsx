import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, Badge } from "@/components/ui-kit/Panel";
import {
  LayoutDashboard, PlusCircle, Leaf, Map, Award, GraduationCap, Settings, FileBarChart,
  Camera, Upload, MapPin, Thermometer, Droplets, CloudRain, Box,
  ShieldCheck, QrCode, CheckCircle2, Sparkles, ArrowLeft, ArrowRight, Save,
} from "lucide-react";
import { HERBS } from "@/lib/mock-data";

export const Route = createFileRoute("/farmer/new-collection")({ component: NewCollection });

const nav: NavItem[] = [
  { label: "Dashboard", to: "/farmer/dashboard", icon: LayoutDashboard },
  { label: "New Collection", to: "/farmer/new-collection", icon: PlusCircle },
  { label: "My Collections", to: "/farmer/collections", icon: Leaf },
  { label: "Harvest Reports", to: "/farmer/harvest-reports", icon: FileBarChart },
  { label: "GPS Collection Map", to: "/farmer/map", icon: Map },
  { label: "Settings", to: "/farmer/settings", icon: Settings },
];

const STEPS = ["Herb Details", "Photos", "GPS Location", "Environment", "Blockchain Preview", "Review"];

function NewCollection() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <PortalShell portalName="Farmer Portal" portalTagline="Geo-tagged collection" nav={nav} user={{ name: "Ramesh Kumar", role: "Farmer · F-2847", initials: "RK" }}>
        <SuccessScreen onNew={() => { setDone(false); setStep(0); }} />
      </PortalShell>
    );
  }

  return (
    <PortalShell portalName="Farmer Portal" portalTagline="Geo-tagged collection" nav={nav} user={{ name: "Ramesh Kumar", role: "Farmer · F-2847", initials: "RK" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link to="/farmer/dashboard" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"><ArrowLeft className="size-3" /> Back to Dashboard</Link>
          <h1 className="text-2xl font-bold font-display mt-1">New Herb Collection</h1>
          <p className="text-sm text-muted-foreground">Create a blockchain-verified harvest record</p>
        </div>
        <Badge tone="info"><Sparkles className="size-3" /> Draft auto-saved</Badge>
      </div>

      {/* Stepper */}
      <div className="bg-card/80 backdrop-blur-md border border-border/60 rounded-[1.25rem] p-4 mb-6 shadow-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-emerald/5" />
        <div className="relative flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3 shrink-0 flex-1">
              <div className={`size-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < step ? "bg-emerald text-white shadow-md shadow-emerald/20" : i === step ? "gradient-hero text-white shadow-glow ring-4 ring-primary/20" : "bg-muted text-muted-foreground border border-border"
              }`}>
                {i < step ? <CheckCircle2 className="size-4" /> : i + 1}
              </div>
              <div className={`text-xs font-semibold whitespace-nowrap transition-colors ${i === step ? "text-foreground" : i < step ? "text-foreground/80" : "text-muted-foreground"}`}>{s}</div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-[2px] rounded-full mx-2 transition-colors duration-500 ${i < step ? "bg-emerald" : "bg-border/60"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {step === 0 && <StepHerbDetails />}
          {step === 1 && <StepPhotos />}
          {step === 2 && <StepGps />}
          {step === 3 && <StepEnvironment />}
          {step === 4 && <StepBlockchain />}
          {step === 5 && <StepReview />}

          <div className="mt-6 flex items-center justify-between">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="h-11 px-5 rounded-xl border border-border font-medium hover:bg-muted disabled:opacity-40 flex items-center gap-2">
              <ArrowLeft className="size-4" /> Previous
            </button>
            <div className="flex gap-2">
              <button className="h-11 px-5 rounded-xl border border-border font-medium hover:bg-muted flex items-center gap-2">
                <Save className="size-4" /> Save Draft
              </button>
              {step < STEPS.length - 1 ? (
                <button onClick={() => setStep(step + 1)} className="h-11 px-6 rounded-xl gradient-hero text-white font-semibold shadow-glow flex items-center gap-2">
                  Continue <ArrowRight className="size-4" />
                </button>
              ) : (
                <button onClick={() => setDone(true)} className="h-11 px-6 rounded-xl gradient-hero text-white font-semibold shadow-glow flex items-center gap-2">
                  <ShieldCheck className="size-4" /> Submit to Blockchain
                </button>
              )}
            </div>
          </div>
        </div>

        <SidebarPreview step={step} />
      </div>
    </PortalShell>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex flex-col">
      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 ml-1">{label}</label>
      {children}
      {hint && <div className="text-[11px] text-muted-foreground mt-1.5 ml-1 flex items-center gap-1"><Sparkles className="size-3 text-emerald" /> {hint}</div>}
    </div>
  );
}
const inputCls = "w-full h-11 px-4 rounded-xl border border-border/60 bg-muted/20 focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-border outline-none transition-all text-sm font-medium text-foreground shadow-sm";

function StepHerbDetails() {
  return (
    <Panel title="Herb Details" subtitle="What did you harvest today?">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Herb Species">
          <select className={inputCls} defaultValue="ASH">
            {HERBS.map((h) => <option key={h.id} value={h.id}>{h.emoji} {h.name} — {h.latin}</option>)}
          </select>
        </Field>
        <Field label="Collection Type">
          <select className={inputCls}>
            <option>Cultivated farm</option>
            <option>Wild collection (approved zone)</option>
            <option>Cooperative harvest</option>
          </select>
        </Field>
        <Field label="Harvest Quantity">
          <input className={inputCls} defaultValue="48" type="number" />
        </Field>
        <Field label="Unit">
          <select className={inputCls}>
            <option>Kilograms (kg)</option>
            <option>Grams (g)</option>
            <option>Bundles</option>
          </select>
        </Field>
        <Field label="Harvest Method">
          <select className={inputCls}>
            <option>Hand-picked (traditional)</option>
            <option>Sickle harvest</option>
            <option>Root extraction</option>
          </select>
        </Field>
        <Field label="Plant Part">
          <select className={inputCls}>
            <option>Root</option>
            <option>Leaf</option>
            <option>Stem</option>
            <option>Whole plant</option>
          </select>
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Collection Notes">
          <textarea className="w-full p-4 rounded-xl border border-border/60 bg-muted/20 focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-border outline-none transition-all text-sm font-medium shadow-sm resize-none" rows={3} defaultValue="Mature roots harvested from cultivated plot 4B. Soil dry-warm. Good visual quality." />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Sustainability Checklist" hint="Required for NMPB compliance scoring">
          <div className="space-y-2 mt-2">
            {[
              "Harvested within approved zone",
              "Mother plants left undisturbed (min 30%)",
              "No endangered species collected",
              "Traditional method followed",
            ].map((c) => (
              <label key={c} className="flex items-center gap-3 p-3.5 rounded-xl border border-border/50 bg-card hover:bg-muted/30 hover:border-primary/30 cursor-pointer transition-colors group shadow-sm">
                <input type="checkbox" defaultChecked className="size-4 rounded accent-primary transition-transform group-active:scale-95" />
                <span className="text-sm font-medium">{c}</span>
              </label>
            ))}
          </div>
        </Field>
      </div>
    </Panel>
  );
}

function StepPhotos() {
  return (
    <Panel title="Upload Herb Photos" subtitle="Geo-stamped images for AI verification">
      <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center bg-muted/30 hover:bg-muted/50 cursor-pointer transition">
        <div className="size-14 mx-auto rounded-2xl gradient-leaf flex items-center justify-center">
          <Upload className="size-7 text-white" />
        </div>
        <div className="font-semibold mt-3">Drop photos here or tap to capture</div>
        <div className="text-xs text-muted-foreground mt-1">JPG / PNG up to 10MB · GPS metadata required</div>
        <div className="flex justify-center gap-2 mt-4">
          <button className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2"><Camera className="size-4" /> Open Camera</button>
          <button className="h-10 px-4 rounded-xl border border-border text-sm font-medium flex items-center gap-2"><Upload className="size-4" /> From Gallery</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative aspect-square rounded-xl bg-gradient-to-br from-emerald/20 to-leaf/20 border border-border overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-4xl">🌿</div>
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              <Badge tone="success"><MapPin className="size-2.5" /> GPS</Badge>
              <Badge tone="info"><Sparkles className="size-2.5" /> AI {94 + i}%</Badge>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-[10px] text-white font-mono">IMG_{1024 + i}.jpg</div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 rounded-xl bg-emerald/5 border border-emerald/20 flex gap-3 items-start">
        <Sparkles className="size-4 text-emerald shrink-0 mt-0.5" />
        <div className="text-sm">
          <div className="font-medium">AI Herb Recognition</div>
          <div className="text-muted-foreground text-xs mt-0.5">3 photos analyzed · Ashwagandha (Withania somnifera) detected with <span className="text-emerald font-semibold">96.4% confidence</span>. No species mismatch flagged.</div>
        </div>
      </div>
    </Panel>
  );
}

function StepGps() {
  return (
    <Panel title="GPS Location Capture" subtitle="Verified against approved harvest zones">
      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        {[
          { l: "Latitude", v: "11.4916°N" },
          { l: "Longitude", v: "76.7337°E" },
          { l: "Accuracy", v: "±2.4 m" },
          { l: "Altitude", v: "2,108 m" },
        ].map((s) => (
          <div key={s.l} className="bg-muted/40 rounded-xl p-3">
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className="font-mono font-semibold text-sm mt-1">{s.v}</div>
          </div>
        ))}
      </div>
      <button className="w-full h-11 rounded-xl gradient-hero text-white font-semibold flex items-center justify-center gap-2 shadow-glow mb-4">
        <MapPin className="size-4" /> Capture Current Location
      </button>
      {/* Mini map */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-emerald/20 via-leaf/10 to-background">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <svg viewBox="0 0 400 225" className="absolute inset-0 w-full h-full">
          <path d="M50 80 Q100 50, 180 90 T380 120 L380 200 L20 200 Z" fill="oklch(0.78 0.16 65 / 0.15)" stroke="oklch(0.78 0.16 65 / 0.4)" strokeDasharray="4 4" />
          <text x="60" y="180" fontSize="10" fill="oklch(0.5 0.08 65)">Approved Zone · NMPB-TN-04</text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <span className="absolute inset-0 rounded-full pulse-ring" />
            <div className="size-6 rounded-full bg-emerald border-4 border-white shadow-glow" />
          </div>
        </div>
        <div className="absolute top-3 left-3 glass rounded-lg px-3 py-2 text-xs">
          <div className="font-semibold">Kotagiri, Nilgiris</div>
          <div className="text-muted-foreground">Tamil Nadu · India</div>
        </div>
      </div>
      <div className="mt-4 p-4 rounded-xl bg-emerald/5 border border-emerald/20 flex items-center gap-3">
        <CheckCircle2 className="size-5 text-emerald shrink-0" />
        <div className="text-sm">
          <div className="font-medium">Inside approved harvest zone</div>
          <div className="text-xs text-muted-foreground">Geo-fence NMPB-TN-04 · 2.1 km from boundary · No conservation overlap</div>
        </div>
      </div>
    </Panel>
  );
}

function StepEnvironment() {
  return (
    <Panel title="Environmental Conditions" subtitle="Auto-filled from IoT sensors where available">
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: Droplets, l: "Soil Moisture", v: "32%", iot: true },
          { icon: Thermometer, l: "Temperature", v: "22.4°C", iot: true },
          { icon: Droplets, l: "Humidity", v: "68%", iot: true },
          { icon: CloudRain, l: "Rainfall (24h)", v: "0 mm", iot: false },
          { icon: Box, l: "Storage", v: "Dry, ventilated shed", iot: false },
          { icon: Thermometer, l: "Storage Temp", v: "18-24°C", iot: false },
        ].map((f) => (
          <div key={f.l} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <f.icon className="size-4" /> {f.l}
              </div>
              {f.iot && <Badge tone="info"><Sparkles className="size-2.5" /> IoT</Badge>}
            </div>
            <div className="font-semibold text-lg mt-2">{f.v}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function StepBlockchain() {
  return (
    <Panel title="Blockchain Preview" subtitle="Review your record before committing on-chain">
      <div className="bg-gradient-to-br from-primary/5 to-emerald/5 border border-border rounded-2xl p-6 font-mono text-xs">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground">Pending Transaction</span>
          <Badge tone="warning">Awaiting submission</Badge>
        </div>
        <div className="space-y-2">
          {[
            ["collection_id", "AYT-ASH-02419"],
            ["herb", "Withania somnifera · Ashwagandha"],
            ["qty", "48 kg · Root"],
            ["farmer", "F-2847 · Ramesh Kumar"],
            ["geo", "11.4916°N, 76.7337°E · Kotagiri"],
            ["zone", "NMPB-TN-04 (approved)"],
            ["env", "22.4°C · 68% RH · 32% soil moisture"],
            ["sustainability", "score: 94 / 100"],
            ["preview_hash", "0xa3f...c8d1 (will be signed)"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4">
              <span className="text-muted-foreground w-32 shrink-0">{k}:</span>
              <span className="font-semibold text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="size-32 mx-auto bg-grid-bg rounded-lg flex items-center justify-center grid-bg relative overflow-hidden">
            <QrCode className="size-20 text-primary" />
            <div className="absolute inset-x-0 h-6 scan-line" />
          </div>
          <div className="text-xs font-medium mt-2">QR Code Preview</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col justify-center">
          <ShieldCheck className="size-8 text-emerald" />
          <div className="font-semibold mt-2">Ready to verify</div>
          <div className="text-xs text-muted-foreground mt-1">Submission will create a permanent record on the AyurTrace ledger. Estimated finality: 2 seconds.</div>
        </div>
      </div>
    </Panel>
  );
}

function StepReview() {
  return (
    <Panel title="Review & Submit" subtitle="Final check before blockchain submission">
      <div className="space-y-3">
        {[
          ["Herb", "🌿 Ashwagandha · 48 kg · Root"],
          ["Collection Type", "Cultivated farm · Hand-picked"],
          ["Location", "Kotagiri, Nilgiris · NMPB-TN-04"],
          ["Photos", "3 images · GPS-stamped · AI verified"],
          ["Environment", "22.4°C · 68% RH · Storage: Dry shed"],
          ["Sustainability", "Score 94 · All checks passed"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <span className="text-sm text-muted-foreground">{k}</span>
            <span className="text-sm font-medium text-right">{v}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SidebarPreview({ step }: { step: number }) {
  return (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold"><Sparkles className="size-3" /> Live Preview</div>
        <div className="mt-3 p-4 rounded-xl gradient-hero text-white">
          <div className="text-xs opacity-80">Draft Collection</div>
          <div className="text-lg font-bold font-display mt-0.5">AYT-ASH-02419</div>
          <div className="text-xs opacity-80 mt-2">Ashwagandha · 48 kg</div>
        </div>
        <div className="mt-4 space-y-2 text-xs">
          {["Herb Details", "Photos", "GPS", "Environment", "Blockchain", "Review"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              {i < step ? <CheckCircle2 className="size-3.5 text-emerald" /> : i === step ? <div className="size-3.5 rounded-full bg-primary animate-pulse" /> : <div className="size-3.5 rounded-full border border-border" />}
              <span className={i <= step ? "font-medium" : "text-muted-foreground"}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Tips</div>
        <div className="mt-3 text-sm space-y-2 text-muted-foreground">
          <p>📸 Capture at least 2 photos from different angles.</p>
          <p>📍 Stand inside the harvest plot when capturing GPS for best accuracy.</p>
          <p>🌱 Mark sustainability checks honestly — they affect your trust score.</p>
        </div>
      </div>
    </div>
  );
}

function SuccessScreen({ onNew }: { onNew: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="size-24 mx-auto rounded-full gradient-leaf flex items-center justify-center shadow-glow">
        <CheckCircle2 className="size-12 text-white" />
      </div>
      <h1 className="text-3xl font-bold font-display mt-6">Collection Verified On-Chain</h1>
      <p className="text-muted-foreground mt-2">Your harvest has been permanently recorded on the AyurTrace blockchain.</p>

      <div className="bg-card border border-border rounded-2xl p-6 mt-8 shadow-card text-left">
        <div className="flex items-center justify-between">
          <Badge tone="success"><ShieldCheck className="size-3" /> Blockchain Verified</Badge>
          <Badge tone="info">Block 18,420,944</Badge>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mt-4 items-center">
          <div>
            <div className="text-xs text-muted-foreground">Collection ID</div>
            <div className="text-2xl font-bold font-display mt-1">AYT-ASH-02419</div>
            <div className="text-sm text-muted-foreground mt-3">48 kg Ashwagandha · Kotagiri</div>
            <div className="font-mono text-xs text-muted-foreground mt-2 break-all">0xa3f2…c8d1e29</div>
          </div>
          <div className="bg-muted/40 rounded-xl p-4 flex flex-col items-center">
            <div className="size-32 grid-bg rounded-lg flex items-center justify-center relative overflow-hidden">
              <QrCode className="size-20 text-primary" />
              <div className="absolute inset-x-0 h-6 scan-line" />
            </div>
            <div className="text-xs font-medium mt-2">Scannable QR ready</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <Link to="/farmer/collections" className="h-11 px-5 rounded-xl border border-border font-medium hover:bg-muted">View My Collections</Link>
        <button onClick={onNew} className="h-11 px-5 rounded-xl gradient-hero text-white font-semibold shadow-glow">Record Another</button>
      </div>
    </div>
  );
}
