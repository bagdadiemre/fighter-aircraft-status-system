import { useEffect, useState } from "react";
import {
  IndexedPokemon,
  PokemonListResponse,
} from "../interface/pokemon.interface";
import { httpCliet } from "../api/httpClient";
import { POKEMON_API_POKEMON_URL } from "../constant";

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
      const result = await httpCliet.get<PokemonListResponse>(nextUrl);
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
