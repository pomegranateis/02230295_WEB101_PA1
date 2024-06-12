# Pokémon Pokedex Application

This project is a simple Pokémon Pokedex application built using React and Next.js. It allows users to search for Pokémon, view details about them, catch Pokémon, and view their caught Pokémon.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [State Management](#state-management)
- [Styling](#styling)
- [API](#api)
- [License](#license)

## Features

- Search for Pokémon by name
- View a list of Pokémon with pagination
- View detailed information about each Pokémon
- Catch and release Pokémon
- Persistent storage of caught Pokémon

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/pokemon-pokedex.git
    cd pokemon-pokedex
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

4. Open your browser and go to `http://localhost:3000`.

## Usage

- Use the search bar to find a specific Pokémon by name.
- Click on a Pokémon card to view its details.
- Click the "Catch" button to add the Pokémon to your caught list.
- Click the "Release" button to remove a Pokémon from your caught list.
- Navigate to the "My Caught Pokémons" page to view your caught Pokémon.


## Components

### `SearchBar.js`

A search bar component for finding Pokémon by name.

### `PokemonCard.js`

A card component that displays basic information about a Pokémon and allows the user to click to view more details.

### `PokemonDetails.js`

A component that displays detailed information about a selected Pokémon.

## State Management

State management is handled using Zustand. The state includes `caughtPokemon` which stores the list of caught Pokémon. The state is persisted in localStorage to ensure caught Pokémon are not lost on page refresh.

### `usePokemonStore.js`

A Zustand store that manages the caught Pokémon state.

```javascript
import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePokemonStore = create(
  persist(
    (set) => ({
      caughtPokemon: [],
      catchPokemon: (pokemon) =>
        set((state) => ({
          caughtPokemon: [...state.caughtPokemon, pokemon],
        })),
      releasePokemon: (name) =>
        set((state) => ({
          caughtPokemon: state.caughtPokemon.filter((p) => p.name !== name),
        })),
    }),
    {
      name: "pokemon-storage", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default usePokemonStore;

