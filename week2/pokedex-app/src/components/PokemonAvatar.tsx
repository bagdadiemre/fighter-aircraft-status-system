import { DetailPokemon } from "../interface";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Typography,
} from "@mui/material";

interface PokemonAvatarProps {
  pokemon: DetailPokemon;
}

const PokemonAvatar = ({ pokemon }: PokemonAvatarProps) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      mt={5}
    >
      <Grid item xs={3}>
        <Card
          sx={{
            backgroundColor: " #f2f2f2",
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: 100, objectFit: "contain" }}
            image={pokemon.sprites.other["official-artwork"].front_default}
            title={pokemon.name}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ textTransform: "capitalize" }}>
                {pokemon.name}
              </Typography>
              <Typography sx={{ textTransform: "capitalize" }}>
                #{pokemon.id}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PokemonAvatar;
