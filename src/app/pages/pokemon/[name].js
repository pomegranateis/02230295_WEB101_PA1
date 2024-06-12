// src/pages/pokemon/[name].js
import React from "react";
import { useRouter } from "next/router";
import useFetchPokemon from "../../hooks/useFetchPokemon";
import PokemonDetails from "../../components/PokemonDetails";
import usePokemonStore from "../../store/usePokemonStore";
import styles from "../../styles/components/PokemonDetails.module.css";

const PokemonPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const { pokemon, error, loading, fetchPokemon } = useFetchPokemon();
  const { catchPokemon } = usePokemonStore();

  React.useEffect(() => {
    if (name) {
      fetchPokemon(name);
    }
  }, [name]);

  const handleCatch = () => {
    if (pokemon) {
      catchPokemon(pokemon);
      router.push("/caught");
    }
  };

  return (
    <div className={styles.pokemonPage}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {pokemon && <PokemonDetails pokemon={pokemon} />}
      <button onClick={handleCatch}>Catch</button>
    </div>
  );
};

export default PokemonPage;

// src/pages/pokemon/[name].js
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import useFetchPokemon from '../../hooks/useFetchPokemon';
// import PokemonDetails from '../../components/PokemonDetails';

// const PokemonDetailPage = () => {
//   const router = useRouter();
//   const { name } = router.query; // Get the Pokémon name from the URL
//   const [pokemon, setPokemon] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { fetchPokemon } = useFetchPokemon();

//   useEffect(() => {
//     if (name) {
//       const fetchPokemonData = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//           const data = await fetchPokemon(name);
//           setPokemon(data);
//         } catch (error) {
//           setError('Failed to load Pokémon details. Please try again.');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchPokemonData();
//     }
//   }, [name, fetchPokemon]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
//       {pokemon && <PokemonDetails pokemon={pokemon} />}
//     </div>
//   );
// };

// export default PokemonDetailPage;
