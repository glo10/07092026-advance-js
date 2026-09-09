export type Coordinates = {
  latitude: number;
  longitude: number;
}

export type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  [key: string]: unknown; // tous les autres clés
}
