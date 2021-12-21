'use strict';

let type1 = ".pokeType1";
let type2 = ".pokeType2";
let type3 = ".pokeType3";


/* function to change text color based on the type of the pokemon and input based on which h2 tag */
const colorChange = function (type) {
    let pokeType = document.querySelector(type).innerHTML.toLowerCase();
    switch (pokeType) {
        case "electric":
            document.querySelector(type).style.color = "yellow";
            break;
        case "normal":
            document.querySelector(type).style.color = "#c8ac8c";
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
            document.querySelector(type).style.color = "#b89acb";
            break;
        case "bug":
            document.querySelector(type).style.color = "#718550";
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
        default:
            document.querySelector(type).style.color = "black";
            break;
    }
}

/* Fetch all pokemon names from api call and populate select options*/

fetch("https://pokeapi.co/api/v2/pokemon/?limit=811/")
    .then(response => response.json())
    .then(data => {
        const selectPoke = document.getElementById('pokeSelect');
        const option = document.createElement('option');
        let i = 0;
        for (i = 0; i < data.results.length; i++) {
            option.text = data.results[i].name.charAt(0).toUpperCase() + data.results[i].name.slice(1);
            console.log(data.results[i].name);
            selectPoke.add(option, pokeSelect[i]);
        }
    })

/* on submit button click event*/
document.getElementById('submit').addEventListener('click', function () {
    /* store the data within the search field and make it all lowercase*/
    const search = document.getElementById('search').value.toLowerCase();
    /* use data within the search field as paramenters for api call */
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`)
        /* response transform to json to read */
        .then(response => response.json())
        .then(data => {
            /* json data logged to console for referencing TO BE REMOVED LATER*/
            console.log(data);
            /* based on searched pokemon name, retrieve sprites and replace current sprites */
            document.getElementById('defaultSprite').src = data.sprites.front_default;
            document.getElementById('defaultShiny').src = data.sprites.front_shiny;
            document.getElementById('backDefault').src = data.sprites.back_default;
            document.getElementById('backShiny').src = data.sprites.back_shiny;
            /* change name of pokemon displayed to name of pokemon in api call and capitalize first letter*/
            document.querySelector('.name').innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
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

        });
});











