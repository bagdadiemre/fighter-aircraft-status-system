import { useState } from "react";
import { IndexedPokemon } from "../interface/pokemon.interface";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<IndexedPokemon[]>([]);

  return {
    pokemons,
  };
};

export default usePokemons;
