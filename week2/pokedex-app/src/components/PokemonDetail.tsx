import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const { pokemonName } = useParams();

  return <div>{pokemonName} in progress</div>;
};

export default PokemonDetail;
