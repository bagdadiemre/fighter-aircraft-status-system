import { useState, useEffect } from "react";
import { DetailPokemon } from "../interface";
import { httpClient } from "../api";
import { POKEMON_API_POKEMON_URL } from "../constants";

interface UsePokemonProps {
  pokemonName: string | undefined;
}

const usePokemon = ({ pokemonName }: UsePokemonProps) => {
  const [pokemon, setPokemon] = useState<DetailPokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pokemonName) {
      fetchPokemon();
    }
  }, [pokemonName]);

  const fetchPokemon = async () => {
    if (pokemonName) {
      setIsLoading(true);
      const url = `${POKEMON_API_POKEMON_URL}/${pokemonName}`;
      const result = await httpClient.get<DetailPokemon>(url);
      if (result?.data) {
        setPokemon(result.data);
      }
      setIsLoading(false);
    }
  };

  return {
    pokemon,
    isLoading,
  };
};

export default usePokemon;
