import { Container } from "@mui/material";
import { PokemonList } from "../components";
import { usePokemons } from "../hooks";

const Home = () => {
  const { pokemons } = usePokemons();

  return (
    <Container>
      <PokemonList pokemons={pokemons}>Home</PokemonList>
    </Container>
  );
};

export default Home;
