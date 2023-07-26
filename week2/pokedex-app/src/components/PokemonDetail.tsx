import { useParams } from "react-router-dom";
import { Container, Grid, Box } from "@mui/material";
import { usePokemon } from "../hooks";
import { PokemonAvatar } from ".";

const PokemonDetail = () => {
  const { pokemonName } = useParams();

  const { pokemon, isLoading } = usePokemon({ pokemonName });

  return (
    <Container>
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          {isLoading ? (
            <Box>Loading...</Box>
          ) : pokemon ? (
            <>
              <Grid item xs={12} sm={6}>
                <PokemonAvatar pokemon={pokemon} />
              </Grid>
            </>
          ) : (
            <Box> Pokemon not found</Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PokemonDetail;
