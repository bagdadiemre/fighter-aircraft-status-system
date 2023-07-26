import { DetailPokemon } from "../interface";
import { Card, CardContent, CardMedia } from "@mui/material";

interface PokemonAvatarProps {
  pokemon: DetailPokemon;
}

const PokemonAvatar = ({ pokemon }: PokemonAvatarProps) => {
  return (
    <Card sx={{ backgroundColor: "green" }}>
      <CardContent>
        <CardMedia
          component="img"
          sx={{ height: 100, objectFit: "contain" }}
          title={pokemon.name}
        />
      </CardContent>
    </Card>
  );
};

export default PokemonAvatar;
