let pokemons;

function createPokemon(pokemon) {
    const pokemonDiv = document.createElement("div");
    pokemonDiv.setAttribute("class", "pokemon");
    
    const pokemonIcon = document.createElement("div");
    pokemonIcon.setAttribute("class", `pokemon-icon ${pokemon.types[0].type.name}`);
    
    const pokemonBackground = document.createElement("img");
    pokemonBackground.setAttribute("src", "assets/images/pokebola2.png")
    pokemonBackground.setAttribute("class", "pokemon-background");
    
    const pokemonImg = document.createElement("img");
    pokemonImg.setAttribute("src", pokemon.sprites.other["official-artwork"].front_default);
    pokemonImg.setAttribute("class", "sprite");
    
    const pokemonNumber = document.createElement("div");
    pokemonNumber.innerHTML = `N° ${pokemon.id}`;
    pokemonNumber.setAttribute("class", "number");
    
    pokemonIcon.appendChild(pokemonBackground);
    pokemonIcon.appendChild(pokemonImg);
    pokemonIcon.appendChild(pokemonNumber);
    pokemonDiv.appendChild(pokemonIcon)
    
    const pokemonDescription = document.createElement("div");
    pokemonDescription.setAttribute("class", "pokemon-description");
    
    const types = document.createElement("types");
    types.setAttribute("class", "types");
    
    for (let x of pokemon.types) {
        const type = document.createElement("div");
        type.setAttribute("class", `type ${x.type.name}`);
        type.innerHTML = x.type.name;
        types.appendChild(type);
    }
    
    const pokeName = document.createElement("div")
    pokeName.setAttribute("class", "name");
    pokeName.innerHTML = pokemon.name
    
    pokemonDescription.appendChild(types);
    pokemonDescription.appendChild(pokeName)
    
    pokemonDiv.appendChild(pokemonDescription);
    document.getElementsByClassName("pokemons-list")[0].appendChild(pokemonDiv);
}

function request(url) {
    return new Promise(((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            resolve (JSON.parse(this.responseText));
        }
        xhttp.onerror = function() {
            reject(new Error("Request Error"));
        }
        xhttp.open("GET", url);
        xhttp.send();
    }))
}

async function generatePokes() {
    try {
        if (pokemons === undefined) {
            pokemons = await request("https://pokeapi.co/api/v2/pokemon");
        } else {
            pokemons = await request(pokemons.next);
        }
        for (let pokemon of pokemons.results) {
            createPokemon(await request(pokemon.url));
        }
        console.log(pokemons)
    } catch(error) {
        console.log(error)
    }
}

generatePokes()