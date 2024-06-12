import { create } from "zustand";

const usePokemonStore = create((set) => {
  // Load caughtPokemon from localStorage if available
  const savedCaughtPokemon =
    JSON.parse(localStorage.getItem("caughtPokemon")) || [];

  return {
    caughtPokemon: savedCaughtPokemon,
    catchPokemon: (pokemon) =>
      set((state) => {
        const newCaughtPokemon = [...state.caughtPokemon, pokemon];
        // Save to localStorage
        localStorage.setItem("caughtPokemon", JSON.stringify(newCaughtPokemon));
        return { caughtPokemon: newCaughtPokemon };
      }),
    releasePokemon: (pokemonName) =>
      set((state) => {
        const newCaughtPokemon = state.caughtPokemon.filter(
          (pokemon) => pokemon.name !== pokemonName
        );
        // Save to localStorage
        localStorage.setItem("caughtPokemon", JSON.stringify(newCaughtPokemon));
        return { caughtPokemon: newCaughtPokemon };
      }),
  };
});

export default usePokemonStore;
