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
            return <div key={p.name}> {p.name} </div>;
          })
        : null}
    </>
  );
};

export default PokemonList;
