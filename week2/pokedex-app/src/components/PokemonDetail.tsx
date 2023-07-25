import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const { pokemonName } = useParams();

  return <div>{pokemonName}</div>;
};

export default PokemonDetail;
