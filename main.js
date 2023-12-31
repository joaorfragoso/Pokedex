let pokemons;

function createPokemon(pokemon) {
    while (String(pokemon.id).length < 4) {
        pokemon.id = "0" + pokemon.id;
    }
    pokemon.name = pokemon.name.replace(pokemon.name.charAt(0), pokemon.name.charAt(0).toUpperCase());

    const pokemonDiv = document.createElement("div");
    pokemonDiv.setAttribute("class", "pokemon");
    
    const iconDiv = document.createElement("div");
    iconDiv.setAttribute("class", `pokemon-icon ${pokemon.types[0].type.name}`);
    
    const backgroundImg = document.createElement("img");
    backgroundImg.setAttribute("src", "assets/images/pokebola2.png")
    backgroundImg.setAttribute("class", "pokemon-background");
    
    const pokemonImg = document.createElement("img");
    pokemonImg.setAttribute("src", pokemon.sprites.other["official-artwork"].front_default);
    pokemonImg.setAttribute("class", "sprite");
    
    const numberDiv = document.createElement("div");
    numberDiv.innerHTML = `N° ${pokemon.id}`;
    numberDiv.setAttribute("class", "number");
    
    iconDiv.appendChild(backgroundImg);
    iconDiv.appendChild(pokemonImg);
    iconDiv.appendChild(numberDiv);
    pokemonDiv.appendChild(iconDiv)
    
    const descriptionDiv = document.createElement("div");
    descriptionDiv.setAttribute("class", "pokemon-description");
    
    const typesDiv = document.createElement("types");
    typesDiv.setAttribute("class", "types");
    
    for (let x of pokemon.types) {
        let type = x.type.name;
        const typeDiv = document.createElement("div");
        typeDiv.setAttribute("class", `type ${type}`);
        type = type.replace(type.charAt(0), type.charAt(0).toUpperCase());
        typeDiv.innerHTML = type;
        typesDiv.appendChild(typeDiv);
    }
    
    const nameDiv = document.createElement("div")
    nameDiv.setAttribute("class", "name");
    nameDiv.innerHTML = pokemon.name
    
    descriptionDiv.appendChild(typesDiv);
    descriptionDiv.appendChild(nameDiv)
    
    pokemonDiv.appendChild(descriptionDiv);
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
            pokemons = await request("https://pokeapi.co/api/v2/pokemon?limit=12&offset=0");
        } else {
            pokemons = await request(pokemons.next);
        }
        for (let pokemon of pokemons.results) {
            createPokemon(await request(pokemon.url));
        }
    } catch(error) {
        console.log(error)
    }
}

generatePokes()