export const capitalize = (pokemonName) => {
  return (
    pokemonName.toUpperCase(pokemonName[0]).charAt(0) + pokemonName.substring(1)
  );
};