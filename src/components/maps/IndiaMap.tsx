import { useEffect, useRef } from "react";

export function IndiaMap({ markers = [] as { lat: number; lng: number; label?: string; tone?: string }[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Wait for Leaflet script to load dynamically
    const checkLeaflet = setInterval(() => {
      if ((window as any).L && mapRef.current && !mapInstanceRef.current) {
        clearInterval(checkLeaflet);
        const L = (window as any).L;

        // Initialize map centered roughly on India
        const map = L.map(mapRef.current).setView([22.5937, 78.9629], 4.5);
        mapInstanceRef.current = map;

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add markers
        markers.forEach(m => {
          const colorClass = m.tone === 'info' ? 'bg-blue-500' : m.tone === 'danger' ? 'bg-red-500' : 'bg-emerald';
          
          const customIcon = L.divIcon({
            className: 'custom-leaflet-marker',
            html: `<div class="relative flex items-center justify-center w-6 h-6 -ml-3 -mt-3">
                     <span class="absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-50 animate-ping"></span>
                     <span class="relative inline-flex rounded-full w-3 h-3 ${colorClass} border-2 border-white shadow-md"></span>
                   </div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          const marker = L.marker([m.lat, m.lng], { icon: customIcon }).addTo(map);
          if (m.label) {
            marker.bindPopup(`<div class="text-sm font-semibold font-sans px-1 py-0.5">${m.label}</div>`);
          }
        });
      }
    }, 100);

    return () => {
      clearInterval(checkLeaflet);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [markers]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border shadow-card min-h-[400px]">
      <div ref={mapRef} className="absolute inset-0 z-0 bg-muted/20" />
      <div className="absolute bottom-4 left-4 z-[1000] bg-card/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 border border-border shadow-soft font-medium">
        <span className="size-2 rounded-full bg-emerald animate-pulse" /> Live OpenStreetMap
      </div>
    </div>
  );
}
