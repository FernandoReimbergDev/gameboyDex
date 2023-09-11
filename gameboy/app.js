let pokemonId = 1
const fetchPokemon = () => {
  const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemonPromises = [];


  for (var i = pokemonId; i <= pokemonId; i++) {
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then((response) => response.json())
    );
  }

  Promise.all(pokemonPromises).then((pokemons) => {
    const lisPokemon = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
      accumulator += `
            <li class="card ${types[0]}">
            <img class="card-image" alt="${
              pokemon.name
            }" src="./img/pokemons/poke_${pokemon.id}.gif" />
            <h2 class="card-title">${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(" | ")}</p>
            </li>`;
      return accumulator;
    }, "");

    const ul = document.querySelector('[data-js="pokedex"]');

    ul.innerHTML = lisPokemon;
  });
};

fetchPokemon();

const nextBtn = document.querySelector(".arrow-bottom");
const prevBtn = document.querySelector(".arrow-top");
const busca = document.querySelector("#search")

nextBtn.addEventListener("click", () => {
  pokemonId++;
  fetchPokemon();
});

prevBtn.addEventListener("click", () => {
  pokemonId--
  fetchPokemon();
});

busca.addEventListener('change', ()=>{
  pokemonId = busca.value;
  fetchPokemon();
})