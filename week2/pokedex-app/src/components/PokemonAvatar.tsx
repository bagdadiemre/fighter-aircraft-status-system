import { DetailPokemon } from "../interface";
import { Card, CardContent, CardMedia } from "@mui/material";

interface PokemonAvatarProps {
  pokemon: DetailPokemon;
}

const PokemonAvatar = ({ pokemon }: PokemonAvatarProps) => {
  return (
    <Card sx={{ backgroundColor: " #f2f2f2" }}>
      <CardContent>
        <CardMedia
          component="img"
          sx={{ height: 100, objectFit: "contain" }}
          image={pokemon.sprites.other["official-artwork"].front_default}
          title={pokemon.name}
        />
      </CardContent>
    </Card>
  );
};

export default PokemonAvatar;
