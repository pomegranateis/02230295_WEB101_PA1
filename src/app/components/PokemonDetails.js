// src/components/PokemonDetails.js
import React from "react";
import styles from "../styles/components/PokemonDetails.module.css";
import { Progress } from "@/components/ui/progress";

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className={styles.pokemonDetails}>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto"
      />
      <h1 className="text-2xl font-bold mt-4 capitalize text-center">
        {pokemon.name}
      </h1>

      <div className="mt-6 space-y-4 w-full px-4">
        {/* Height */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height
          </label>
          <Progress
            value={pokemon.height}
            max={100}
            className="h-3 rounded-full bg-gray-200"
          >
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${(pokemon.height / 100) * 100}%` }}
            />
          </Progress>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight
          </label>
          <Progress
            value={pokemon.weight}
            max={100}
            className="h-3 rounded-full bg-gray-200"
          >
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(pokemon.weight / 100) * 100}%` }}
            />
          </Progress>
        </div>

        {/* Base Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Base Experience
          </label>
          <Progress
            value={pokemon.base_experience}
            max={100}
            className="h-3 rounded-full bg-gray-200"
          >
            <div
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${(pokemon.base_experience / 100) * 100}%` }}
            />
          </Progress>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg">
          <strong>Types:</strong>{" "}
          {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>
        <p className="text-lg mt-2">
          <strong>Abilities:</strong>{" "}
          {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
        </p>
      </div>
    </div>
  );
};
export default PokemonDetails;
