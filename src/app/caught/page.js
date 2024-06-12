"use client";
import React from "react";
import Link from "next/link";
import usePokemonStore from "../store/usePokemonStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CaughtPokemon() {
  const caughtPokemon = usePokemonStore((state) => state.caughtPokemon);
  const releasePokemon = usePokemonStore((state) => state.releasePokemon);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6">Caught Pokémon</h1>
      <Link href="/" className="text-blue-500 hover:underline mb-6">
        <Button>Back to Pokedex</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {caughtPokemon.length > 0 ? (
          caughtPokemon.map((pokemon) => (
            <Card
              key={pokemon.name}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold capitalize">
                  {pokemon.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {/* Pokémon Image */}
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className="w-32 h-32"
                />
              </CardContent>
              <CardFooter className="flex justify-center mt-2">
                <Button
                  variant="danger"
                  onClick={() => releasePokemon(pokemon.name)}
                  className="bg-white-500 hover:bg-red-700"
                >
                  Release
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-xl">No Pokémons caught yet.</p>
        )}
      </div>
    </div>
  );
}
