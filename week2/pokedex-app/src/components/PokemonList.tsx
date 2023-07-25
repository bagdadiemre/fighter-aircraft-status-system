import { PokemonCard } from ".";
import { IndexedPokemon } from "../interface";

interface PokemonListProps {
  pokemons: IndexedPokemon[];
  children: React.ReactNode;
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <>
      {pokemons.length > 0
        ? pokemons.map((p) => {
            return <PokemonCard key={p.name} pokemon={p}></PokemonCard>;
          })
        : null}
    </>
  );
};

export default PokemonList;
