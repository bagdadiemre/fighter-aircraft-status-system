import { Grid } from "@mui/material";
import { PokemonCard } from ".";
import { ListPokemon } from "../interface";

interface PokemonListProps {
  pokemons: ListPokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <Grid container spacing={2}>
      {pokemons.length > 0
        ? pokemons.map((p) => {
            return (
              <Grid item xs={4} key={p.name}>
                <PokemonCard key={p.name} pokemon={p}></PokemonCard>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default PokemonList;
