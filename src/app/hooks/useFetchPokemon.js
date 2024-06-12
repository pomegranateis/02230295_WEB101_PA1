import { useCallback } from "react";

const useFetchPokemon = () => {
  const fetchPokemon = useCallback(async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      return null;
    }
  }, []);

  return fetchPokemon;
};

export default useFetchPokemon;
