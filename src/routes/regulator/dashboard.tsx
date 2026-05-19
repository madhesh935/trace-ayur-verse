import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/layout/PortalShell";
import { Panel, StatCard, Badge } from "@/components/ui-kit/Panel";
import { IndiaMap } from "@/components/maps/IndiaMap";
import {
  LayoutDashboard, AlertTriangle, TreePine, Shield, FileCheck2, BarChart3, ScrollText, Globe,
  CheckCircle2, MapPin,
} from "lucide-react";
import { REGIONS, SUSTAINABILITY_BY_REGION, BATCHES } from "@/lib/mock-data";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/regulator/dashboard")({ component: RegulatorDashboard });

const nav: NavItem[] = [
  { label: "Dashboard", to: "/regulator/dashboard", icon: LayoutDashboard, i18nKey: "nav.dashboard" },
  { label: "Violations", to: "/regulator/violations", icon: AlertTriangle, badge: "4", i18nKey: "nav.violations" },
  { label: "Sustainability Reports", to: "/regulator/sustainability", icon: TreePine, i18nKey: "nav.sustainability" },
  { label: "Protected Zones", to: "/regulator/zones", icon: Shield, i18nKey: "nav.zones" },
  { label: "Audit Logs", to: "/regulator/audit-logs", icon: ScrollText, i18nKey: "nav.audit" },
  { label: "Export Certifications", to: "/regulator/export-certifications", icon: FileCheck2, i18nKey: "nav.export" },
  { label: "Compliance Analytics", to: "/regulator/compliance", icon: BarChart3, i18nKey: "nav.compliance" },
];

function RegulatorDashboard() {
  return (
    <PortalShell portalName="Regulator Portal" portalTagline="NMPB · Ministry of AYUSH" nav={nav} user={{ name: "Dr. Vikram Singh", role: "Regional Officer · NMPB-SR", initials: "VS" }}>
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-display">Compliance & Sustainability</h1>
          <p className="text-sm text-muted-foreground">Southern Region · 6 states · 1,240 monitored zones</p>
        </div>
        <Badge tone="warning"><AlertTriangle className="size-3" /> 4 active alerts</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Geo-fence Violations" value="4" icon={AlertTriangle} tone="destructive" hint="Past 7 days" />
        <StatCard label="Sustainability Score" value="89" delta="+3 vs last quarter" icon={TreePine} tone="emerald" />
        <StatCard label="Protected Zones OK" value="98%" icon={Shield} tone="primary" hint="1,215 of 1,240" />
        <StatCard label="Export Certificates" value="218" delta="Issued YTD" icon={Globe} tone="earth" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Panel title="Protected Forest Monitoring" subtitle="Live geo-fencing across India" className="lg:col-span-2">
          <IndiaMap markers={[
            ...REGIONS.map((r) => ({ lat: r.lat, lng: r.lng, label: r.name })),
            { lat: 12.0, lng: 77.5, label: "Alert", tone: "danger" },
            { lat: 23.0, lng: 80.0, label: "Watch", tone: "warn" },
          ]} />
        </Panel>
        <Panel title="Active Violations" subtitle="Requires review">
          <div className="space-y-3">
            {[
              { z: "NMPB-KA-09", t: "Harvest outside approved boundary", sev: "high" },
              { z: "NMPB-MP-22", t: "Endangered species attempt blocked", sev: "high" },
              { z: "NMPB-TN-04", t: "Quota exceeded 12%", sev: "med" },
              { z: "NMPB-KL-11", t: "Late sync (>48h)", sev: "low" },
            ].map((v, i) => (
              <div key={i} className="p-3 rounded-lg border border-border hover:bg-muted/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs">{v.z}</span>
                  <Badge tone={v.sev === "high" ? "danger" : v.sev === "med" ? "warning" : "info"}>{v.sev}</Badge>
                </div>
                <div className="text-sm mt-1">{v.t}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Panel title="Sustainability Score by Region" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={SUSTAINABILITY_BY_REGION}>
                <XAxis dataKey="region" axisLine={false} tickLine={false} fontSize={11} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar dataKey="score" fill="oklch(0.55 0.15 155)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="quota" fill="oklch(0.78 0.16 65)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Export Certification Queue">
          <div className="space-y-2">
            {BATCHES.slice(0, 5).map((b, i) => (
              <div key={b.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-border">
                <div className="size-8 rounded bg-emerald/10 flex items-center justify-center text-sm">{b.herb.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono truncate">{b.id}</div>
                  <div className="text-[10px] text-muted-foreground">→ {["EU", "USA", "UAE", "UK", "JP"][i]}</div>
                </div>
                <CheckCircle2 className="size-4 text-emerald" />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Audit Log" subtitle="Immutable regulatory trail" className="mt-5 !p-0">
        <div className="divide-y divide-border text-sm">
          {[
            { t: "Certificate signed", b: "AYT-ASH-02418 · Export to EU", time: "2m" },
            { t: "Geo-fence alert resolved", b: "NMPB-TN-04 · Quota adjusted", time: "1h" },
            { t: "DNA mismatch flagged", b: "AYT-BRH-02401 · Sent for re-test", time: "3h" },
            { t: "Quota updated", b: "Ashwagandha Q3 · +12%", time: "1d" },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-3 p-4">
              <MapPin className="size-4 text-primary" />
              <div className="flex-1">
                <div className="font-medium">{l.t}</div>
                <div className="text-xs text-muted-foreground">{l.b}</div>
              </div>
              <span className="text-xs text-muted-foreground">{l.time} ago</span>
            </div>
          ))}
        </div>
      </Panel>
    </PortalShell>
  );
}
