import type { Coordinates } from "../types";

export async function getUserCoordinates(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(
        new Error(
          "La géolocalisation n'est pas supportée par votre navigateur.",
        ),
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error: GeolocationPositionError) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new Error(
                "L'utilisateur a refusé la demande de géolocalisation.",
              ),
            );
            break;
          case error.POSITION_UNAVAILABLE:
            reject(
              new Error("Les informations de localisation sont indisponibles."),
            );
            break;
          case error.TIMEOUT:
            reject(new Error("La demande de localisation a expiré."));
            break;
          default:
            reject(new Error("Une erreur inconnue est survenue."));
        }
      },
      { timeout: 10000, enableHighAccuracy: true },
    );
  });
}

export function computeDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export async function displayDistance(): Promise<string> {
  try {
    const userCoords: Coordinates = await getUserCoordinates();
    const parisCoords: Coordinates = { latitude: 48.8566, longitude: 2.3522 };

    const distance = computeDistance(
      userCoords.latitude,
      userCoords.longitude,
      parisCoords.latitude,
      parisCoords.longitude,
    );

    return `Vous êtes à environ ${distance} km.`
  } catch (err) {
    if (err instanceof Error) {
      return `Erreur Géolocalisation : ${err.message}`
    } else {
      return `Erreur Géolocalisation : ${err}`
    }
  }
}
