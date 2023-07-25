import { useEffect, useState } from "react";
import { IndexedPokemon, PokemonListResponse } from "../interface";
import { httpClient } from "../api";
import { POKEMON_API_POKEMON_URL, POKEMON_IMAGES_BASE_URL } from "../constants";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<IndexedPokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    POKEMON_API_POKEMON_URL
  );

  useEffect(() => {
    fetchPokemon();
  }, []);

  const indexedPokemonToListPokemon = (indexedPokemon: IndexedPokemon) => {
    const pokedexNumber = parseInt(
      indexedPokemon.url
        .replace(`${POKEMON_API_POKEMON_URL}/`, "")
        .replace("/", "")
    );

    const listPokemon: ListPokemon = {
      name: indexedPokemon.name,
      url: indexedPokemon.url,
      image: `${POKEMON_IMAGES_BASE_URL}/${pokedexNumber}`,
      pokedexNumber,
    };
  };

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
