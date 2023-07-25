import { Button, Container } from "@mui/material";
import { PokemonList } from "../components";
import { usePokemons } from "../hooks";

const Home = () => {
  const { pokemons, hasMorePokemon, fetchNextPage } = usePokemons();

  return (
    <Container>
      <PokemonList pokemons={pokemons}></PokemonList>
      {hasMorePokemon ? (
        <Button variant="contained" onClick={fetchNextPage}>
          Load More Pokémon
        </Button>
      ) : null}
    </Container>
  );
};

export default Home;
