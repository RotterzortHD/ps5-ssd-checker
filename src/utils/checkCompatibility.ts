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
  
  // --- K.O. Kriterium 1: Schnittstelle ---
  // FIX: Wir erlauben jetzt auch "PCIe 5.0", da diese abwärtskompatibel sind.
  const isGen4 = ssd.interface.includes("PCIe 4.0");
  const isGen5 = ssd.interface.includes("PCIe 5.0");

  if (!isGen4 && !isGen5) {
    return {
      status: 'red',
      title: 'Nicht Kompatibel',
      message: 'Diese SSD nutzt eine veraltete Schnittstelle (z.B. PCIe 3.0). Die PS5 benötigt zwingend PCIe 4.0 oder neuer.',
      colorClass: 'bg-rose-100 text-rose-800 border-rose-200'
    };
  }

  // --- K.O. Kriterium 2: Geschwindigkeit ---
  // Sony empfiehlt 5500 MB/s. Alles darunter kriegt ROT.
  if (ssd.read_speed_mb_s < 5500) {
    return {
      status: 'red',
      title: 'Zu Langsam',
      message: `Diese SSD liest nur mit ${ssd.read_speed_mb_s} MB/s. Sony empfiehlt mindestens 5.500 MB/s, sonst drohen Ruckler in anspruchsvollen Spielen.`,
      colorClass: 'bg-rose-100 text-rose-800 border-rose-200'
    };
  }

  // --- Kriterium 3: Bauhöhe ---
  // Max 11.25mm laut Sony.
  if (ssd.height_mm > 11.25) {
    return {
      status: 'red',
      title: 'Passt nicht (Zu hoch)',
      message: 'Der Kühlkörper dieser SSD ist zu massiv. Der Deckel des PS5-Erweiterungsslots lässt sich damit nicht mehr schließen.',
      colorClass: 'bg-rose-100 text-rose-800 border-rose-200'
    };
  }

  // --- Warnung: Fehlender Heatsink ---
  // Das ist besonders bei Gen5 extrem wichtig, da die sehr heiß werden.
  if (!ssd.has_heatsink) {
    return {
      status: 'yellow',
      title: 'Heatsink fehlt (Achtung!)',
      message: 'Technisch passt die SSD, aber sie hat keinen Kühlkörper. Die PS5 wird überhitzen und abstürzen! Du musst zwingend einen separaten Heatsink dazukaufen.',
      colorClass: 'bg-amber-100 text-amber-800 border-amber-200'
    };
  }

  // --- Sonderfall: PCIe 5.0 Erfolg ---
  // Wenn es eine Gen5 SSD ist und alle Checks bestanden hat:
  if (isGen5) {
    return {
      status: 'green',
      title: 'Kompatibel (High-End)',
      message: 'Diese PCIe 5.0 SSD funktioniert in der PS5 einwandfrei! Hinweis: Die PS5 drosselt die Geschwindigkeit auf den Gen4-Standard (~6.500 MB/s), was aber immer noch extrem schnell ist.',
      colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
  }

  // --- Standard Erfolg (PCIe 4.0) ---
  return {
    status: 'green',
    title: 'Perfekt Kompatibel',
    message: 'Diese SSD erfüllt oder übertrifft alle Anforderungen von Sony. Du kannst sie bedenkenlos einbauen.',
    colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  };
}