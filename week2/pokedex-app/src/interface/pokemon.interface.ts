export default interface IndexedPokemon {
  name: string;
  url: string;
}

export default interface PokemonListResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: IndexedPokemon[];
}

export default interface ListPokemon {
  name: string;
  url: string;
  image: string;
  pokedexNumber: number;
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface DetailPokemon {
  id: number;
  name: string;
  types: PokemonType[];
  weight: number;
  height: number;
  abilities: PokemonAbility[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: PokemonStat[];
  color: string | null;
}

export interface IndexedType {
  name: string;
  url: string;
  color: string;
}
