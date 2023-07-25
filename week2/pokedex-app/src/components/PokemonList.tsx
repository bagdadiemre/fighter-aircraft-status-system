import { IndexedPokemon } from "../interface/pokemon.interface";

interface PokemonListProps {
  pokemons: IndexedPokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <>
      {pokemons.length > 0
        ? pokemons.map((p) => {
            return <div key={p.name}> {p.name} </div>;
          })
        : null}
    </>
  );
};

export default PokemonList;
