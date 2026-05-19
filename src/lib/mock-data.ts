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
  { id: "PIP", name: "Pippali", latin: "Piper longum", emoji: "🌱" },
  { id: "GUG", name: "Guggul", latin: "Commiphora wightii", emoji: "🌲" },
  { id: "KAL", name: "Kalmegh", latin: "Andrographis paniculata", emoji: "🌿" },
  { id: "BHI", name: "Bhringraj", latin: "Eclipta alba", emoji: "🌼" },
];

export const REGIONS = [
  { name: "Nilgiris", state: "Tamil Nadu", lat: 11.4916, lng: 76.7337, type: "Mountain" },
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, type: "Plains" },
  { name: "Wayanad", state: "Kerala", lat: 11.6854, lng: 76.132, type: "Forest" },
  { name: "Mysuru", state: "Karnataka", lat: 12.2958, lng: 76.6394, type: "Plateau" },
  { name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322, type: "Himalayan" },
  { name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676, type: "Himalayan" },
  { name: "Munnar", state: "Kerala", lat: 10.0889, lng: 77.0595, type: "High Altitude" },
  { name: "Kullu", state: "Himachal Pradesh", lat: 31.9578, lng: 77.1095, type: "Himalayan Valley" },
  { name: "Patanjali", state: "Uttarakhand", lat: 29.9312, lng: 78.005, type: "Cultivation" },
];

export const FARMERS = [
  { id: "F-2847", name: "Ramesh Kumar", village: "Kotagiri", region: "Nilgiris", score: 94, joined: "2021" },
  { id: "F-1923", name: "Lakshmi Devi", village: "Coonoor", region: "Nilgiris", score: 91, joined: "2020" },
  { id: "F-3411", name: "Suresh Patel", village: "Sulthan Bathery", region: "Wayanad", score: 88, joined: "2023" },
  { id: "F-5102", name: "Anjali Sharma", village: "Doiwala", region: "Dehradun", score: 96, joined: "2019" },
  { id: "F-6120", name: "Krishna Iyer", village: "Munnar", region: "Munnar", score: 98, joined: "2018" },
  { id: "F-4432", name: "Vikas Singh", village: "Manali", region: "Kullu", score: 85, joined: "2024" },
  { id: "F-7711", name: "Deepa Reddy", village: "Nanjangud", region: "Mysuru", score: 93, joined: "2022" },
];

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return Math.abs(h);
}
export const txHash = (seed: string) =>
  "0x" + hash(seed).toString(16).padStart(8, "0") + hash(seed + "1").toString(16).padStart(8, "0") + hash(seed + "2").toString(16).padStart(8, "0").slice(0, 16);

export const BATCHES = Array.from({ length: 48 }).map((_, i) => {
  const herb = HERBS[i % HERBS.length];
  const farmer = FARMERS[i % FARMERS.length];
  const region = REGIONS[i % REGIONS.length];
  const qty = 15 + (i * 13) % 150;
  const date = new Date(Date.now() - i * 43200000 * 1.5); // Spread over time realistically
  const moisture = 7 + (i % 6) + (i % 3) * 0.5;
  const statusPool = ["Verified", "Processing", "Lab Testing", "Verified", "In Transit", "Aggregated"];
  return {
    id: `AYT-${herb.id}-${(2400 + i).toString().padStart(5, "0")}`,
    herb,
    farmer,
    region,
    quantity: qty,
    unit: "kg",
    date: date.toISOString(),
    sustainability: 82 + (i * 7) % 18,
    moisture: parseFloat(moisture.toFixed(1)),
    status: statusPool[i % statusPool.length],
    txHash: txHash(`AYT-${herb.id}-${i}-${date.getTime()}`),
    block: 18420000 + i * 142,
    gps: { lat: region.lat + (i % 7) * 0.005, lng: region.lng + (i % 6) * 0.005 },
  };
});

export const COLLECTION_TREND = [
  { month: "Jan", kg: 1240, batches: 42, target: 1500 },
  { month: "Feb", kg: 1480, batches: 51, target: 1600 },
  { month: "Mar", kg: 1820, batches: 63, target: 1700 },
  { month: "Apr", kg: 2110, batches: 71, target: 2000 },
  { month: "May", kg: 2580, batches: 88, target: 2300 },
  { month: "Jun", kg: 2940, batches: 102, target: 2800 },
  { month: "Jul", kg: 3380, batches: 119, target: 3200 },
  { month: "Aug", kg: 4210, batches: 145, target: 3600 },
  { month: "Sep", kg: 4890, batches: 162, target: 4000 },
  { month: "Oct", kg: 5120, batches: 175, target: 4500 },
];

export const SUSTAINABILITY_BY_REGION = REGIONS.map((r, i) => ({
  region: r.name,
  score: 75 + (i * 7) % 25,
  quota: 55 + (i * 13) % 45,
  harvested: 30 + (i * 9) % 35,
}));

export const HERB_DISTRIBUTION = HERBS.slice(0, 8).map((h, i) => ({
  name: h.name,
  value: 150 + (i * 67) % 520,
}));

