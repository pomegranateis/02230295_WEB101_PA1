import React, { useState, useEffect } from "react";

const PokemonCard = ({ pokemon, onClick }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon.url]);

  if (!pokemonDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center cursor-pointer"
      onClick={() => onClick(pokemonDetails)} // Trigger onClick with details
    >
      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
        className="w-32 h-32"
      />
      <h3 className="text-xl font-bold mt-2 capitalize">
        {pokemonDetails.name}
      </h3>
      <p className="text-gray-600">
        Type: {pokemonDetails.types.map((type) => type.type.name).join(", ")}
      </p>
    </div>
  );
};

export default PokemonCard;
