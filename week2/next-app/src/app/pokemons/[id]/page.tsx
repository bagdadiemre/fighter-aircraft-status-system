import React from "react";

const Pokemon = ({ params }: any) => {
  console.log(params);

  return <div>Pokemon {params.id}</div>;
};

export default Pokemon;
