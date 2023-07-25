export default interface IndexedPokemon {
  name: string;
  url: string;
}

export default interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<IndexedPokemon>;
}
