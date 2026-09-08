const defaultSettings = {
  theme: "dark",
  notifications: true,
  sidebar: false
};

const userSettings = {
  sidebar: true,
  language: "fr"
};

// Q2. Fusion d'objets avec Spread
export const finalSettings = {
  ...defaultSettings,
  ...userSettings
};

// Q3. Récupérer le thème et les autres
export const { theme, ...otherSettings } = finalSettings;