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
const finalSettings = {
  ...defaultSettings,
  ...userSettings
};

// Q3. Récupérer le thème et les autres
const { theme, ...otherSettings } = finalSettings;