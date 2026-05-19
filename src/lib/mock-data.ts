// Realistic mock data for AyurTrace platform
export const HERBS = [
  { id: "ASH", name: "Ashwagandha", latin: "Withania somnifera", emoji: "🌿" },
  { id: "TUL", name: "Tulsi", latin: "Ocimum sanctum", emoji: "🌱" },
  { id: "BRH", name: "Brahmi", latin: "Bacopa monnieri", emoji: "🍃" },
  { id: "NEE", name: "Neem", latin: "Azadirachta indica", emoji: "🌳" },
  { id: "GIL", name: "Giloy", latin: "Tinospora cordifolia", emoji: "🌾" },
  { id: "SHA", name: "Shatavari", latin: "Asparagus racemosus", emoji: "🌿" },
  { id: "AML", name: "Amla", latin: "Phyllanthus emblica", emoji: "🫐" },
  { id: "TUR", name: "Turmeric", latin: "Curcuma longa", emoji: "🌼" },
];

export const REGIONS = [
  { name: "Nilgiris", state: "Tamil Nadu", lat: 11.4916, lng: 76.7337 },
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558 },
  { name: "Wayanad", state: "Kerala", lat: 11.6854, lng: 76.132 },
  { name: "Mysuru", state: "Karnataka", lat: 12.2958, lng: 76.6394 },
  { name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322 },
  { name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676 },
];

export const FARMERS = [
  { id: "F-2847", name: "Ramesh Kumar", village: "Kotagiri", region: "Nilgiris", score: 94 },
  { id: "F-1923", name: "Lakshmi Devi", village: "Coonoor", region: "Nilgiris", score: 91 },
  { id: "F-3411", name: "Suresh Patel", village: "Sulthan Bathery", region: "Wayanad", score: 88 },
  { id: "F-5102", name: "Anjali Sharma", village: "Doiwala", region: "Dehradun", score: 96 },
];

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return Math.abs(h);
}
export const txHash = (seed: string) =>
  "0x" + hash(seed).toString(16).padStart(8, "0") + hash(seed + "1").toString(16).padStart(8, "0") + hash(seed + "2").toString(16).padStart(8, "0").slice(0, 16);

export const BATCHES = Array.from({ length: 24 }).map((_, i) => {
  const herb = HERBS[i % HERBS.length];
  const farmer = FARMERS[i % FARMERS.length];
  const region = REGIONS[i % REGIONS.length];
  const qty = 12 + (i * 7) % 80;
  const date = new Date(Date.now() - i * 86400000 * 2);
  return {
    id: `AYT-${herb.id}-${(2400 + i).toString().padStart(5, "0")}`,
    herb,
    farmer,
    region,
    quantity: qty,
    unit: "kg",
    date: date.toISOString(),
    sustainability: 78 + (i * 3) % 20,
    moisture: 8 + (i % 5),
    status: ["Verified", "Processing", "Lab Testing", "Verified", "In Transit"][i % 5],
    txHash: txHash(`AYT-${herb.id}-${i}`),
    block: 18420000 + i * 13,
    gps: { lat: region.lat + (i % 5) * 0.01, lng: region.lng + (i % 4) * 0.01 },
  };
});

export const COLLECTION_TREND = [
  { month: "Jan", kg: 1240, batches: 42 },
  { month: "Feb", kg: 1480, batches: 51 },
  { month: "Mar", kg: 1820, batches: 63 },
  { month: "Apr", kg: 2110, batches: 71 },
  { month: "May", kg: 2580, batches: 88 },
  { month: "Jun", kg: 2940, batches: 102 },
  { month: "Jul", kg: 3380, batches: 119 },
  { month: "Aug", kg: 3820, batches: 134 },
];

export const SUSTAINABILITY_BY_REGION = REGIONS.map((r, i) => ({
  region: r.name,
  score: 72 + (i * 4) % 25,
  quota: 60 + (i * 11) % 35,
}));

export const HERB_DISTRIBUTION = HERBS.slice(0, 6).map((h, i) => ({
  name: h.name,
  value: 120 + (i * 47) % 380,
}));
