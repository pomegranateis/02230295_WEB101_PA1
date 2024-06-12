// src/utils/api.js

export const fetchPokemonData = async (name) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
  );
  if (!response.ok) throw new Error("Pokemon not found");
  return response.json();
};
