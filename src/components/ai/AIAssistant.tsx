import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, Loader2, ChevronDown } from "lucide-react";

/* ── Per-portal context config ─────────────────────────────────────────────── */
export type PortalContext =
  | "farmer" | "regulator" | "laboratory" | "processing" | "consumer";

interface ContextConfig {
  name: string;
  greeting: string;
  color: string;
  bg: string;
  border: string;
  glow: string;
  suggestions: string[];
  responses: Record<string, string>;
}

const CONTEXT: Record<PortalContext, ContextConfig> = {
  farmer: {
    name: "AyurFarm AI",
    greeting: "Namaste 🌿 I'm your farming assistant. Ask me about harvesting, sustainability, GPS tagging, quotas, or blockchain sync.",
    color: "text-emerald",
    bg: "bg-emerald",
    border: "border-emerald/30",
    glow: "shadow-emerald/25",
    suggestions: [
      "What is my current quota status?",
      "Best time to harvest Ashwagandha?",
      "How do I record a GPS collection?",
      "Why is my batch pending sync?",
    ],
    responses: {
      "quota": "Your Ashwagandha quota for this season is **500 kg**, and you've used **320 kg (64%)**. You're well within the NMPB sustainable limit. The next quota review is scheduled for October 2026.",
      "harvest": "The optimal time to harvest Ashwagandha roots is **October–February** when the plant is 180–270 days old. Morning hours (6–9 AM) are best to preserve alkaloid content. Current weather in Kotagiri is ideal — 22°C with 68% humidity.",
      "gps": "To record a GPS collection:\n1. Open **New Collection** from the sidebar\n2. Tap **Capture GPS Location** — this auto-fills coordinates\n3. Take a photo of the herb for AI species verification\n4. Enter the quantity and submit\n\nYour record will be queued for blockchain sync automatically.",
      "sync": "Your 2 pending batches (AYT-ASH-02418 and AYT-TUL-02412) are waiting for network connectivity. They'll sync automatically when you're online. Data is safely stored offline in encrypted local storage.",
      "sustainability": "Your sustainability score is **94/100**, placing you in the **top 8%** of registered farmers nationally. Key factors: ✓ Selective harvesting, ✓ No chemical inputs, ✓ Zone compliance. Keep maintaining the 30% mother-plant retention rule.",
    },
  },
  regulator: {
    name: "Compliance AI",
    greeting: "Good day, Officer 📋 I'm your regulatory intelligence assistant. Ask me about violations, zone compliance, certification status, or audit trends.",
    color: "text-primary",
    bg: "bg-primary",
    border: "border-primary/30",
    glow: "shadow-primary/25",
    suggestions: [
      "Show active violations summary",
      "Which zones are at risk?",
      "Certification approval rate this month",
      "Audit trends for Tamil Nadu",
    ],
    responses: {
      "violation": "There are **4 active violations** requiring attention:\n- 🔴 2 High Severity: Boundary breach (NMPB-KA-09) and endangered species attempt (NMPB-MP-22)\n- 🟡 1 Medium: Quota exceeded by 12% (NMPB-TN-04)\n- 🟢 1 Low: Blockchain sync delay >48h (NMPB-KL-11)\n\nRecommendation: Prioritize the two high-severity cases within 24 hours.",
      "zone": "**3 zones are showing caution signals:**\n- NMPB-KA-09 (Nagarhole) — 2 alerts, eco score 78\n- NMPB-MP-22 (Satpura) — 1 alert, eco score 81\n- NMPB-TN-04 (Nilgiris) — quota at 89% utilization\n\nRecommend geo-fence tightening for NMPB-KA-09.",
      "certification": "This month: **218 certificates issued**, 12 pending review, 3 revoked (failed QC).\nApproval rate: **94.8%** — above the national average of 91.2%.\nTop destination markets: EU (34%), USA (22%), UAE (18%).",
      "audit": "Tamil Nadu audit summary (Q3 2026):\n- Compliance rate: **96.4%** (up from 94.1% Q2)\n- Violations: 6 total, 5 resolved\n- Farmers audited: 142\n- Certifications issued: 89\n\nOverall rating: **A** — excellent performance.",
    },
  },
  laboratory: {
    name: "Lab AI",
    greeting: "Hello, Analyst 🔬 I'm your laboratory intelligence assistant. Ask me about test queues, DNA results, certification status, or quality standards.",
    color: "text-blue-400",
    bg: "bg-blue-500",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/25",
    suggestions: [
      "What's in today's intake queue?",
      "DNA test pass rate this week",
      "Which batches failed moisture test?",
      "AYUSH quality standards for Tulsi",
    ],
    responses: {
      "intake": "Today's sample intake queue has **8 samples** pending registration:\n- 2 High Priority (expedited processing)\n- 5 Normal Priority\n- 1 Low Priority\n\nAverage wait time: 4h 22m. Analyst Dr. Priya Iyer is currently assigned to the high-priority samples.",
      "dna": "This week's DNA test performance:\n- Total tests: **47**\n- Pass (Authentic): **46 (97.9%)**\n- Mismatch detected: **1** — AYT-BRH-02401 sent for re-testing\n- Average similarity score: **99.1%**\n\nAll authentic samples used ITS2 + rbcL dual marker protocol.",
      "moisture": "**2 batches exceeded the 12% moisture limit** this week:\n- AYT-GIL-02395: 13.2% — sent for re-drying (Chamber 3)\n- AYT-PIP-02388: 12.8% — re-drying complete, re-test scheduled\n\nAll other 26 batches passed. Overall pass rate: 92.8%.",
      "standard": "AYUSH quality standards for Tulsi (Ocimum sanctum):\n- Moisture: ≤ 12%\n- Ash content: ≤ 12%\n- Heavy metals: Lead <10 ppm, Mercury <0.1 ppm\n- Pesticide residue: As per FSSAI Schedule IV\n- DNA authentication: ITS2 region, ≥98% similarity\n- Microbial load: Total plate count <10⁵ CFU/g",
    },
  },
  processing: {
    name: "Plant AI",
    greeting: "Hello, Manager 🏭 I'm your processing intelligence assistant. Ask me about batch throughput, equipment status, drying cycles, or shipping updates.",
    color: "text-saffron",
    bg: "bg-saffron",
    border: "border-saffron/30",
    glow: "shadow-saffron/25",
    suggestions: [
      "What's today's throughput?",
      "Drying chamber status",
      "Which shipments are delayed?",
      "Warehouse capacity overview",
    ],
    responses: {
      "throughput": "Today's processing throughput:\n- **840 kg** ground and packaged\n- **3,240 units** packed across 3 active lines\n- Defect rate: **0.12%** (industry avg: 0.8%)\n- OEE Score: **87.4%** (world-class benchmark: >85%)\n\nMill-3 (Turmeric, 100 mesh) is currently idle — recommend activating for afternoon shift.",
      "drying": "Active drying chambers:\n- **Chamber 1**: Ashwagandha, 41.8°C, 29.4% RH — 1h 18m remaining ✓\n- **Chamber 2**: Tulsi, 40.2°C, 31.1% RH — 3h 45m remaining ✓\n- **Chamber 3**: Re-drying (Giloy batch AYT-GIL-02395) — 2h remaining\n- Chambers 4–6: Idle\n\nAll active chambers are within set-point tolerance.",
      "shipment": "**3 shipments are delayed** out of 9 active trucks:\n- TRK-002 (Delhi route): 4h delay due to highway congestion\n- TRK-006 (Chennai): Minor breakdown, replacement dispatched\n- TRK-008 (Hyderabad): Weather hold, cleared in 2h\n\n4 shipments are on time, 2 delivered today.",
      "warehouse": "Warehouse capacity overview:\n- Total capacity: **2,900 kg**\n- Currently stored: **2,140 kg (74%)**\n- Approaching capacity: Ashwagandha (Zone A, 82%)\n- Adequate space: Tulsi, Brahmi, Neem zones\n\nRecommend expediting Ashwagandha shipments to free Zone A capacity.",
    },
  },
  consumer: {
    name: "AyurVerify AI",
    greeting: "Hello! 🌱 I'm your product authenticity assistant. Ask me about any herb, how to verify products, sustainability impact, or what the certifications mean.",
    color: "text-leaf",
    bg: "bg-leaf",
    border: "border-leaf/30",
    glow: "shadow-leaf/25",
    suggestions: [
      "Is this product authentic?",
      "What does DNA verification mean?",
      "Which brands are AyurTrace certified?",
      "How sustainable is my purchase?",
    ],
    responses: {
      "authentic": "The scanned product **Ashwagandha Root Powder (AYT-ASH-02400)** is **100% authentic**.\n\n✅ DNA match: 99.6% (*Withania somnifera*)\n✅ Pesticide-free (42 compounds screened)\n✅ Moisture: 9.2% (well below 12% limit)\n✅ Blockchain-verified: Block #18,420,000\n✅ Farmer-certified: Ramesh Kumar, F-2847\n\nThis product has a full provenance trail from farm to your hands.",
      "dna": "DNA verification is a molecular authentication process:\n\n1. **PCR amplification** of specific plant DNA markers (ITS2, rbcL)\n2. Comparison with the **NCBI reference database** for the declared species\n3. A similarity score ≥98% confirms authenticity\n4. Results are recorded on the blockchain permanently\n\nThis prevents adulteration — for example, mixing cheaper species with genuine Ashwagandha.",
      "brand": "AyurTrace-certified brands available in your area:\n- 🌿 **Himalaya Wellness** — 94 certified SKUs\n- 🌱 **Patanjali Ayurved** — 78 certified SKUs\n- 🍃 **Dabur** — 62 certified SKUs\n- 🌾 **Kerala Ayurveda** — 44 certified SKUs\n- 🌿 **Baidyanath** — 38 certified SKUs\n\nAll certified brands display the AyurTrace QR code on packaging.",
      "sustainable": "Your purchase impact:\n- 🌱 Eco score: **94/100** (regenerative harvesting)\n- 👨‍🌾 Supports farmer **Ramesh Kumar** and 6 other farmers in your supply chain\n- 🌳 **142 kg CO₂** offset vs conventionally grown alternatives\n- 🏔️ Sourced from NMPB-protected zone — no forest degradation\n- 💧 Zero synthetic pesticides or fertilizers used\n\nYour purchase directly contributes to sustainable wild-crafting.",
    },
  },
};

/* ── Message type ──────────────────────────────────────────────────────────── */
interface Message {
  role: "user" | "assistant";
  text: string;
  time: string;
}

function now() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function findResponse(ctx: ContextConfig, input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(ctx.responses)) {
    if (lower.includes(key)) return response;
  }
  return `I can help with questions about ${Object.keys(ctx.responses).join(", ")}. Could you rephrase your question or choose one of the suggested topics?`;
}

/* ── Markdown-lite renderer ────────────────────────────────────────────────── */
function MsgText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return (
          <p
            key={i}
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: bold || "&nbsp;" }}
          />
        );
      })}
    </div>
  );
}

/* ── Main AIAssistant component ────────────────────────────────────────────── */
export function AIAssistant({ context }: { context: PortalContext }) {
  const ctx = CONTEXT[context];
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: ctx.greeting, time: now() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim(), time: now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const reply = findResponse(ctx, text);
      setMessages((m) => [...m, { role: "assistant", text: reply, time: now() }]);
      setLoading(false);
    }, 900 + Math.random() * 400);
  }

  return (
    <>
      {/* ── FAB button ── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 h-14 px-5 rounded-2xl ${ctx.bg} text-white font-bold shadow-xl ${ctx.glow} hover:scale-105 active:scale-100 transition-all duration-200 group`}
        >
          <div className="size-6 rounded-lg bg-white/20 flex items-center justify-center">
            <Sparkles className="size-4" />
          </div>
          <span className="text-sm">{ctx.name}</span>
          <div className="size-2 rounded-full bg-white animate-pulse" />
        </button>
      )}

      {/* ── Chat panel ── */}
      {open && (
        <div className={`fixed bottom-6 right-6 z-50 w-[380px] rounded-2xl border ${ctx.border} bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${minimized ? "h-14" : "h-[540px]"}`}>

          {/* Header */}
          <div className={`${ctx.bg} px-4 py-3 flex items-center gap-3 shrink-0 cursor-pointer`} onClick={() => setMinimized((m) => !m)}>
            <div className="size-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Bot className="size-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white text-sm">{ctx.name}</div>
              <div className="text-[10px] text-white/70 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-white/80 animate-pulse inline-block" />
                AI-powered · Context-aware
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={(e) => { e.stopPropagation(); setMinimized((m) => !m); }} className="size-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <ChevronDown className={`size-4 text-white transition-transform ${minimized ? "rotate-180" : ""}`} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="size-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <X className="size-4 text-white" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      {msg.role === "assistant" && (
                        <div className={`size-6 rounded-full ${ctx.bg} flex items-center justify-center mb-0.5`}>
                          <Bot className="size-3.5 text-white" />
                        </div>
                      )}
                      <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted/60 border border-border/50 text-foreground rounded-tl-sm"
                      }`}>
                        <MsgText text={msg.text} />
                      </div>
                      <div className="text-[10px] text-muted-foreground px-1">{msg.time}</div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-muted/60 border border-border/50 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                      <Loader2 className={`size-4 ${ctx.color} animate-spin`} />
                      <span className="text-xs text-muted-foreground">Thinking…</span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Suggestions */}
              {messages.length < 3 && (
                <div className="px-4 pb-2 flex gap-2 flex-wrap">
                  {ctx.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border ${ctx.border} ${ctx.color} bg-muted/30 hover:bg-muted/60 transition-colors`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-border/40 shrink-0">
                <div className="flex items-center gap-2 bg-muted/40 border border-border/50 rounded-xl px-3 py-2 focus-within:border-primary/40 focus-within:bg-card transition-all">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                    placeholder="Ask me anything…"
                    className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading}
                    className={`size-8 rounded-lg ${ctx.bg} text-white flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0`}
                  >
                    <Send className="size-3.5" />
                  </button>
                </div>
                <p className="text-[9px] text-muted-foreground text-center mt-2">AyurTrace AI · Responses are context-based suggestions</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
