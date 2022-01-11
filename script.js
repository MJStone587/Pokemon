'use strict';

/* variable assignment */
const searchSubmit = document.getElementById('submit');
const selectChoice = document.getElementById('pokeSelect');
const newSelect = document.createElement('select');
const select = document.getElementById('selectMore');
const close = document.querySelector('.close');
const modal = document.querySelector('.modal');
const content = document.querySelector('.modalContent');
const modalFrom = document.querySelector('.modalFrom');
const modalEgg = document.querySelector('.modalEgg');
const modalTo = document.querySelector('.modalTo');
const modalGen = document.querySelector('.modalGen')
const modalName = document.querySelector('.name').innerHTML;
const modalStats = document.querySelector('.modalStats');

const type1 = ".pokeType1";
const type2 = ".pokeType2";
const type3 = ".pokeType3";

let changeCounter = 0;

/* function to change pokeomon types */
const typeDisplay = function (data) {
    /* change pokemon types displayed and if there is more than one pokemon type change subsequent fields */
    if (data.types.length === 2) {
        document.querySelector('.pokeType1').innerHTML = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
        document.querySelector('.pokeType2').innerHTML = data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1);
        document.querySelector('.pokeType3').innerHTML = " ";
        /* call function to change color of pokemon types */
        colorChange(type1);
        colorChange(type2);
    } else if (data.types.length === 3) {
        document.querySelector('.pokeType1').innerHTML = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
        document.querySelector('.pokeType2').innerHTML = data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1);
        document.querySelector('.pokeType3').innerHTML = data.types[2].type.name.charAt(0).toUpperCase() + data.types[2].type.name.slice(1);
        colorChange(type1);
        colorChange(type2);
        colorChange(type3);
    } else {
        document.querySelector('.pokeType1').innerHTML = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
        document.querySelector('.pokeType2').innerHTML = " ";
        document.querySelector('.pokeType3').innerHTML = " ";
        colorChange(type1);
    }
};


/* function to change modal evolved from  data with correct information from api call */
const evolvedFrom = species => {
    if (species.evolves_from_species == null || species.evolves_from_species == "is undefined") {
        modalFrom.innerHTML = "Evolved From: N/A";
    } else {
        let name = species.evolves_from_species.name;
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            .then(response => response.json())
            .then(url => {
                let newImg = url.sprites.front_default;
                modalFrom.innerHTML = "Evolved From: " + species.evolves_from_species.name.charAt(0).toUpperCase() + species.evolves_from_species.name.slice(1);/* + `<img src=${newImg} width="100px" height="100px" margin="0";> `; */
            })
    }
}

/* get base stats from API and add to modal */
const baseStats = data => {
    modalStats.innerHTML = "Base Stats: "
    var arr = [];
    for (let i = 0; i < data.stats.length; i++) {
        arr.push(data.stats[i].stat.name + ":" + " " + data.stats[i].base_stat + " " + "|");
        modalStats.append(arr[i] + " ");
    }
    console.log(arr);
}

/* function to change "evolve into" data on modal from api call takes input from apiSearch fetch data */
const evolveInto = species => {
    let evolveUrl = species.evolution_chain.url;
    if (species.evolves_from_species === null) {
        var name = "nothing";
    } else {
        var name = species.evolves_from_species.name;
    }
    modalTo.innerHTML = "Evolves Into:";
    fetch(evolveUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.chain.evolves_to[0]) {
                modalTo.innerHTML = "Evolves Into: N/A";
            } else if (data.chain.evolves_to[0].species.name === modalName || data.chain.evolves_to[0].species.name === name) {
                modalTo.innerHTML = "Evolves Into: N/A";
            } else {
                let evolveName = data.chain.evolves_to[0].species.name.charAt(0).toUpperCase() + data.chain.evolves_to[0].species.name.slice(1);
                modalTo.innerHTML = "Evolves Into: " + evolveName;
            }
        });
}

/* function to change Egg Groups modal information with selected pokemon data */
const eggGroup = species => {
    modalEgg.innerHTML = "Egg Groups:"
    var arr = [];
    for (let i = 0; i < species.egg_groups.length; i++) {
        arr.push(species.egg_groups[i].name.charAt(0).toUpperCase() + species.egg_groups[i].name.slice(1));
        if (species.egg_groups.length > 1) {
            modalEgg.append(" " + arr[i] + " |");
        } else {
            modalEgg.append(" " + arr[i]);
        }
    }
}


/* api call based on pokemon selected in dropdown list or in search field */
const apiSearch = function (search) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`)
        /* response transform to json to read */
        .then(response => response.json())
        .then(data => {
            var species = data.species.url;
            fetch(species)
                .then(newResponse => newResponse.json())
                .then(species => {
                    /* call functions to fill modal */
                    evolvedFrom(species);
                    evolveInto(species);
                    eggGroup(species);
                });
            baseStats(data);
            console.log(data);
            /* based on searched pokemon name, retrieve sprites and replace current sprites */
            document.getElementById('defaultSprite').src = data.sprites.front_default;
            document.getElementById('defaultShiny').src = data.sprites.front_shiny;
            document.getElementById('backDefault').src = data.sprites.back_default;
            document.getElementById('backShiny').src = data.sprites.back_shiny;
            /* change name of pokemon displayed to name of pokemon in api call and capitalize first letter*/
            document.querySelector('.name').innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            /* change name of pokemon displayed in modalto name of pokemon in api call and capitalize first letter*/
            document.querySelector('.modalName').innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            document.querySelector('.modalName').style.textDecoration = "underline";
            /* typeDisplay function changes color of pokemon types and fills elements necessary*/
            typeDisplay(data);
        });
}

/* function with switch statement to change text color based on the type of the pokemon */
const colorChange = function (type) {
    let pokeType = document.querySelector(type).innerHTML.toLowerCase();
    switch (pokeType) {
        case "electric":
            document.querySelector(type).style.color = "yellow";
            break;
        case "normal":
            document.querySelector(type).style.color = "#837573";
            break;
        case "fairy":
            document.querySelector(type).style.color = "pink";
            break;
        case "water":
            document.querySelector(type).style.color = "blue";
            break;
        case "fire":
            document.querySelector(type).style.color = "orange";
            break;
        case "dark":
            document.querySelector(type).style.color = "black";
            break;
        case "steel":
            document.querySelector(type).style.color = "#d8d8d8 ";
            break;
        case "ice":
            document.querySelector(type).style.color = "lightblue";
            break;
        case "fighting":
            document.querySelector(type).style.color = "darkred";
            break;
        case "psychic":
            document.querySelector(type).style.color = "#eb56a7";
            break;
        case "grass":
            document.querySelector(type).style.color = "#31bb33";
            break;
        case "poison":
            document.querySelector(type).style.color = "#bb31af";
            break;
        case "flying":
            document.querySelector(type).style.color = "#7d69a4";
            break;
        case "bug":
            document.querySelector(type).style.color = "#5f9d37";
            break;
        case "rock":
            document.querySelector(type).style.color = "#718550";
            break;
        case "ghost":
            document.querySelector(type).style.color = "#716d9d";
            break;
        case "ground":
            document.querySelector(type).style.color = "#817b46";
            break;
        case "dragon":
            document.querySelector(type).style.color = "#8960da";
            break;
        default:
            document.querySelector(type).style.color = "black";
            break;
    }
}

/* Fetch all pokemon types from api call and populate select options*/
const fillOptions = function () {
    fetch("https://pokeapi.co/api/v2/type/?limit=18/")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.results.length; i++) {
                const selectType = document.getElementById('pokeTypeSelect');
                const option = document.createElement('option');
                let capitalize = data.results[i].name.charAt(0).toUpperCase() + data.results[i].name.slice(1);
                option.value = data.results[i].name;
                option.innerHTML = capitalize;
                selectType.add(option, null);
            }
        });
}
fillOptions();

/* submit button click event*/
const pokeCall = function () {
    document.querySelector('.header').addEventListener('click', function (event) {
        /* grab data from correct element depending on which submit button is selected */
        if (event.target.classList.contains('searchSubmit')) {
            /* store the data within the search field and make it all lowercase*/
            const search = document.getElementById('search').value.toLowerCase();
            /* use data within the search field as paramenters for api call */
            apiSearch(search);
        } else if (event.target.classList.contains('dropdownSubmit')) {
            const search = document.querySelector('.dropdown2').value.toLowerCase();
            apiSearch(search);
        }
    });
}
pokeCall();


/* when a type is chosen from drop down list create new drop down list populated with pokemon of said type */
function changeValue() {
    const arr = [];
    changeCounter++;
    if (changeCounter <= 1) {
        /* get the poke type from the poketypeselect and store it in a variable */
        let typeName = document.getElementById('pokeTypeSelect').value;
        /* store data to create new select element under header */
        const newSelect = document.createElement('select');
        const header = document.querySelector('.header');
        const newButton = document.createElement('button');
        header.append(newSelect);
        header.append(newButton);
        newSelect.classList.add("dropdown2");
        newButton.innerHTML = "Submit";
        newButton.classList.add("dropdownSubmit");
        fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
            /* translate data with json */
            .then(response => response.json())
            .then(data => {
                /* populate dropdwon list options with pokemon names from api */
                for (let i = 0; i < data.pokemon.length; i++) {
                    arr.push(data.pokemon[i].pokemon.name.charAt(0).toUpperCase() + data.pokemon[i].pokemon.name.slice(1));
                }
                arr.sort();
            })
            .then(() => {
                /* populate dropdwon list options with pokemon names from api */
                for (let i = 0; i < arr.length; i++) {
                    const newOption = document.createElement('option');
                    newOption.value = arr[i];
                    newOption.innerHTML = arr[i];
                    newSelect.add(newOption, null);
                }
            })
    } else if (changeCounter > 1) {
        let typeName = document.getElementById('pokeTypeSelect').value;
        const selectEl = document.querySelector('.dropdown2');
        for (let i = selectEl.options.length - 1; i >= 0; i--) {
            selectEl.remove(i);
        }
        fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
            /* translate data with json */
            .then(response => response.json())
            .then(data => {
                /* add all the pokemon to our array and sort */
                for (let i = 0; i < data.pokemon.length; i++) {
                    arr.push(data.pokemon[i].pokemon.name.charAt(0).toUpperCase() + data.pokemon[i].pokemon.name.slice(1));
                }
                arr.sort();
            })
            .then(() => {
                /* populate dropdwon list options with pokemon names from our array after being sorted*/
                for (let i = 0; i < arr.length; i++) {
                    const newOption = document.createElement('option');
                    newOption.value = arr[i];
                    newOption.innerHTML = arr[i];
                    selectEl.add(newOption, null);
                }
            });
    }
}



/* More button fuction to open modal */
select.onclick = function () {
    modal.style.display = "block";
}
/* close modal if clicking anywhere on modal */
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/* close modal on clicking x button*/
close.onclick = function () {
    modal.style.display = "none";
}