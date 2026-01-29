import { useState, useEffect } from "react";
import { type WeatherData } from "../utils/weatherApi";

const FAVORITES_STORAGE_KEY = "favorites_cities";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<WeatherData[]>([]);

  // Carica i preferiti da localStorage all'avvio
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
      } catch (e) {
        console.error("Errore nel parsing preferiti:", e);
      }
    }
  }, []);

  // Salva su localStorage quando cambiano
  const updateFavorites = (newFavorites: WeatherData[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
  };

  // Aggiungi una città ai preferiti
  const addFavorite = (city: WeatherData) => {
    const exists = favorites.some((fav) => fav.cityName === city.cityName);
    if (!exists) {
      updateFavorites([...favorites, city]);
    }
  };

  // Rimuovi una città dai preferiti
  const removeFavorite = (cityName: string) => {
    updateFavorites(favorites.filter((fav) => fav.cityName !== cityName));
  };

  // Controlla se una città è nei preferiti
  const isFavorite = (cityName: string): boolean => {
    return favorites.some((fav) => fav.cityName === cityName);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};
