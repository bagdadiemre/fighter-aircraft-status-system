import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { ListPokemon } from "../interface";

interface PokemonCardProps {
  pokemon: ListPokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          image={pokemon.image}
          title={pokemon.name}
          sx={{
            height: 200,
            objectFit: "contain",
            backgroundColor: "#f2f2f2",
            borderRadius: "5px",
          }}
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              
            }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                color: "#919191",
                fontWeight: 500,
                fontSize: "80%",
                paddingTop: "2px",
                lineHeight: "125%",
                margin: "0.5rem 0",
              }}
            >
              #{pokemon.pokedexNumber}
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                color: "#313131",
                marginBottom: "5px",
                fontSize: "115%",
                margin: "0.5rem 0",
              }}
            >
              {pokemon.name}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;
