// src/components/CaughtPokemonList.js
import React from "react";
import usePokemonStore from "../store/usePokemonStore";
import styles from "../styles/components/CaughtPokemonList.module.css";

const CaughtPokemonList = () => {
  const { caughtPokemon, releasePokemon } = usePokemonStore();

  return (
    <div className={styles.caughtPokemonList}>
      <h2>Caught Pokemon</h2>
      {caughtPokemon.length === 0 ? (
        <p>No Pokemon caught yet.</p>
      ) : (
        <ul>
          {caughtPokemon.map((pokemon) => (
            <li key={pokemon.name}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>{pokemon.name}</p>
              <button onClick={() => releasePokemon(pokemon.name)}>
                Release
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CaughtPokemonList;
