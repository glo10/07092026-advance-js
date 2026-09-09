import { DefaultSettings, UserSettings } from "../interfaces";
import { Settings } from "../types";
const defaultSettings: DefaultSettings = {
  theme: "dark",
  notifications: true,
  sidebar: false
};

const userSettings: UserSettings = {
  sidebar: true,
  language: "fr"
};

// Q2. Fusion d'objets avec Spread (typé explicitement avec l'union/intersection)
export const finalSettings: Settings = {
  ...defaultSettings,
  ...userSettings
};

// Q3. Récupérer le thème et les autres
export const theme: string = finalSettings.theme;
export const otherSettings: Omit<Settings, 'theme'> = (({ theme, ...rest }) => rest)(finalSettings);

// Alternative native TypeScript pour la déstructuration directe (typage inféré automatiquement) :
// export const { theme, ...otherSettings } = finalSettings;