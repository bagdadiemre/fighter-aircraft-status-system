import { PokemonList } from "../components";
import { usePokemons } from "../hooks";

const Home = () => {
  const { pokemons } = usePokemons();

  return <PokemonList pokemons={pokemons}>Home</PokemonList>;
};

export default Home;
