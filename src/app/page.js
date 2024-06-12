"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";
import PokemonDetails from "./components/PokemonDetails";
import useFetchPokemon from "./hooks/useFetchPokemon";
import usePokemonStore from "./store/usePokemonStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const fetchPokemon = useFetchPokemon(); // Correctly call the custom hook
  const catchPokemon = usePokemonStore((state) => state.catchPokemon);

  const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=";

  useEffect(() => {
    loadPokemon(currentPage);
  }, [currentPage]);

  const loadPokemon = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${POKEMON_API_URL}${(page - 1) * 20}`);
      const data = await response.json();
      setAllPokemon((prev) => [...prev, ...data.results]);
    } catch (error) {
      setError("Failed to load Pokémon. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (name) => {
    const pokemon = await fetchPokemon(name);
    if (pokemon) {
      setSelectedPokemon(pokemon);
    } else {
      alert("Pokémon not found");
    }
  };

  const handleCardClick = (pokemonDetails) => {
    setSelectedPokemon(pokemonDetails);
  };

  const handleCatch = () => {
    if (selectedPokemon) {
      catchPokemon(selectedPokemon);
      setSelectedPokemon(null);
    }
  };

  const handleBackToList = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="sticky top-0 z-50 w-full bg-gray-100 pt-2 pb-4 mb-4 shadow">
        <h1 className="text-4xl font-bold mb-8 text-black font-serif text-center">
          Pokémon
        </h1>
        <div className="flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/caught">
            <Button className="hover:underline">My Caught Pokémons</Button>
          </Link>
        </div>
      </div>

      {selectedPokemon ? (
        <div className="flex flex-col items-center">
          <PokemonDetails pokemon={selectedPokemon} />
          <button
            onClick={handleCatch}
            className="mt-4 bg-black text-white py-2 px-4 rounded"
          >
            Catch
          </button>
          <button
            onClick={handleBackToList}
            className="mt-4 bg-black text-white py-2 px-4 rounded"
          >
            Back to List
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                onClick={handleCardClick}
              />
            ))}
          </div>
          {loading && <p className="text-xl text-blue-500">Loading...</p>}
          {error && <p className="text-xl text-red-500">{error}</p>}
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Load More
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
