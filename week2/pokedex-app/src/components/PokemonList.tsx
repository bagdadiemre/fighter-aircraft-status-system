import { Grid } from "@mui/material";
import { PokemonCard } from ".";
import { IndexedPokemon } from "../interface";

interface PokemonListProps {
  pokemons: IndexedPokemon[];
  children: React.ReactNode;
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <Grid container spacing={2}>
      {pokemons.length > 0
        ? pokemons.map((p) => {
            return (
              <Grid item xs={4}>
                <PokemonCard key={p.name} pokemon={p}></PokemonCard>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default PokemonList;
