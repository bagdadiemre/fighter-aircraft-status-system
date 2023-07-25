import { useEffect, useState } from "react";
import { IndexedPokemon, PokemonListResponse } from "../interface";
import { httpClient } from "../api";
import { POKEMON_API_POKEMON_URL } from "../constants";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<IndexedPokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    POKEMON_API_POKEMON_URL
  );

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    if (nextUrl) {
      const result = await httpClient.get<PokemonListResponse>(nextUrl);
      if (result?.data?.results) {
        setPokemons(result.data.results);
      }
    }
  };

  return {
    pokemons,
  };
};

export default usePokemons;
