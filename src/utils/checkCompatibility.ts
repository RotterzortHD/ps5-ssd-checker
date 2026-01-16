// src/utils/checkCompatibility.ts

export interface SSD {
  id: string;
  name: string;
  brand: string;
  interface: string;
  read_speed_mb_s: number;
  has_heatsink: boolean;
  height_mm: number;
  capacity_gb: number;
  asin: string;
  notes: string;
}

export interface CompatibilityResult {
  status: 'green' | 'yellow' | 'red';
  title: string;
  message: string;
  colorClass: string; // Für Tailwind CSS
}

export function checkPS5Compatibility(ssd: SSD): CompatibilityResult {
  
  // K.O. Kriterium 1: Schnittstelle
  if (!ssd.interface.includes("PCIe 4.0")) {
    return {
      status: 'red',
      title: 'Nicht Kompatibel',
      message: 'Diese SSD nutzt eine veraltete Schnittstelle (PCIe 3.0). Die PS5 benötigt zwingend PCIe 4.0 (Gen4).',
      colorClass: 'bg-red-100 text-red-800 border-red-200'
    };
  }

  // K.O. Kriterium 2: Geschwindigkeit (Sony empfiehlt 5500 MB/s)
  if (ssd.read_speed_mb_s < 5500) {
    return {
      status: 'red',
      title: 'Zu Langsam',
      message: `Diese SSD liest nur mit ${ssd.read_speed_mb_s} MB/s. Sony empfiehlt mindestens 5.500 MB/s, sonst drohen Ruckler oder Abstürze.`,
      colorClass: 'bg-red-100 text-red-800 border-red-200'
    };
  }

  // Kriterium 3: Bauhöhe (Max 11.25mm)
  if (ssd.height_mm > 11.25) {
    return {
      status: 'red',
      title: 'Passt nicht',
      message: 'Der Kühlkörper ist zu hoch. Der Deckel des PS5-Erweiterungsslots wird sich nicht schließen lassen.',
      colorClass: 'bg-red-100 text-red-800 border-red-200'
    };
  }

  // Warnung: Fehlender Heatsink
  if (!ssd.has_heatsink) {
    return {
      status: 'yellow',
      title: 'Bedingt Kompatibel (Heatsink fehlt)',
      message: 'Technisch passt die SSD, aber sie hat keinen Kühlkörper. Die PS5 wird sehr heiß! Du musst zwingend einen separaten Heatsink dazukaufen.',
      colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
  }

  // Wenn alles passt:
  return {
    status: 'green',
    title: 'Perfekt Kompatibel',
    message: 'Diese SSD erfüllt oder übertrifft alle Anforderungen von Sony. Du kannst sie bedenkenlos einbauen.',
    colorClass: 'bg-green-100 text-green-800 border-green-200'
  };
}