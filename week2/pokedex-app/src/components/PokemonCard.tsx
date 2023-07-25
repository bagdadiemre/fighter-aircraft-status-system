import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

import { ListPokemon } from "../interface";

interface PokemonCardProps {
  pokemon: ListPokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={pokemon.image}
        title={pokemon.name}
        sx={{ height: 100, objectFit: "contain" }}
      />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>{pokemon.name}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
