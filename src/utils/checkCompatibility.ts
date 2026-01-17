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
  form_factor: string;
  compatibility: string[];
}

export interface CompatibilityResult {
  status: 'green' | 'yellow' | 'red';
  title: string;
  message: string;
  colorClass: string;
}

// Zentrale Funktion für alle Konsolen
export function checkCompatibility(ssd: SSD, consoleType: 'ps5' | 'steam-deck'): CompatibilityResult {
  
  if (consoleType === 'ps5') {
    return checkPS5Rules(ssd);
  }
  
  if (consoleType === 'steam-deck') {
    return checkSteamDeckRules(ssd);
  }

  return { status: 'red', title: 'Fehler', message: 'Unbekannte Konsole', colorClass: 'bg-red-100' };
}

function checkPS5Rules(ssd: SSD): CompatibilityResult {
  const isGen4 = ssd.interface.includes("PCIe 4.0");
  const isGen5 = ssd.interface.includes("PCIe 5.0");

  if (!isGen4 && !isGen5) {
    return { status: 'red', title: 'Veraltet', message: 'PS5 braucht PCIe 4.0 oder neuer.', colorClass: 'bg-rose-100 text-rose-800 border-rose-200' };
  }

  if (ssd.read_speed_mb_s < 5500) {
    return { status: 'red', title: 'Zu Langsam', message: 'Unter 5.500 MB/s. Risiko für Ruckler.', colorClass: 'bg-rose-100 text-rose-800 border-rose-200' };
  }
  
  if (ssd.form_factor !== "2280") {
     return { status: 'red', title: 'Falsche Größe', message: 'Die PS5 benötigt den Formfaktor 2280.', colorClass: 'bg-rose-100 text-rose-800 border-rose-200' };
  }

  if (ssd.height_mm > 11.25) {
    return { status: 'red', title: 'Zu Hoch', message: 'Kühler passt nicht ins Gehäuse.', colorClass: 'bg-rose-100 text-rose-800 border-rose-200' };
  }

  if (!ssd.has_heatsink) {
    return { status: 'yellow', title: 'Heatsink fehlt', message: 'Muss separat gekauft werden!', colorClass: 'bg-amber-100 text-amber-800 border-amber-200' };
  }

  return { status: 'green', title: 'Perfekt', message: 'Optimale PS5 SSD.', colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
}

function checkSteamDeckRules(ssd: SSD): CompatibilityResult {
    // K.O. Kriterium: Größe (Steam Deck braucht zwingend 2230)
    if (ssd.form_factor !== "2230") {
        return { 
            status: 'red', 
            title: 'Falsche Größe (2280)', 
            message: 'Diese SSD ist zu lang (2280)! Das Steam Deck benötigt winzige M.2 2230 SSDs.', 
            colorClass: 'bg-rose-100 text-rose-800 border-rose-200' 
        };
    }

    // Heatsink Check (Im Steam Deck ist fast kein Platz für Heatsinks)
    if (ssd.has_heatsink) {
        return { 
            status: 'yellow', 
            title: 'Achtung: Heatsink', 
            message: 'Diese SSD hat einen Heatsink. Das passt oft NICHT in das enge Gehäuse des Steam Decks.', 
            colorClass: 'bg-amber-100 text-amber-800 border-amber-200' 
        };
    }

    return { 
        status: 'green', 
        title: 'Kompatibel (2230)', 
        message: 'Passt perfekt in dein Steam Deck oder ROG Ally.', 
        colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-200' 
    };
}