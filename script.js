'use strict';

const pokeball = document.getElementById('pokeball');
let type1 = ".pokeType1";
let type2 = ".pokeType2";
let type3 = ".pokeType3";


/* function to change text color based on the type of the pokemon and input based on which h2 tag */
const colorChange = function (type) {
    let pokeType = document.querySelector(type).innerHTML.toLowerCase();
    if (pokeType === "electric") {
        document.querySelector(type).style.color = "yellow";
    } else if (pokeType === "normal") {
        document.querySelector(type).style.color = "#c8ac8c";
    } else if (pokeType === "fairy") {
        document.querySelector(type).style.color = "pink";
    } else if (pokeType === "water") {
        document.querySelector(type).style.color = "blue";
    } else if (pokeType === "fire") {
        document.querySelector(type).style.color = "orange";
    } else if (pokeType === "dark") {
        document.querySelector(type).style.color = "black";
    } else if (pokeType === "steel") {
        document.querySelector(type).style.color = "#d8d8d8 ";
    } else if (pokeType === "ice") {
        document.querySelector(type).style.color = "lightblue";
    } else if (pokeType === "fighting") {
        document.querySelector(type).style.color = "darkred";
    } else if (pokeType === "psychic") {
        document.querySelector(type).style.color = "#eb56a7";
    } else if (pokeType === "grass") {
        document.querySelector(type).style.color = "#31bb33";
    } else if (pokeType === "poison") {
        document.querySelector(type).style.color = "#bb31af";
    } else if (pokeType === "flying") {
        document.querySelector(type).style.color = "#b89acb";
    } else if (pokeType === "bug") {
        document.querySelector(type).style.color = "#718550";
    } else if (pokeType === "rock") {
        document.querySelector(type).style.color = "#718550";
    } else if (pokeType === "ghost") {
        document.querySelector(type).style.color = "#716d9d";
    } else if (pokeType === "ground") {
        document.querySelector(type).style.color = "#817b46";
    }
}

/* on submit button click event*/
document.getElementById('submit').addEventListener('click', function () {
    /* store the data within the search field and make it all lowercase*/
    const search = document.getElementById('search').value.toLowerCase();
    /* use data within the search field as paramenters for api call */
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`)
        /* response transform to json to read */
        .then(response => response.json())
        .then(data => {
            /* json data logged to console for referencing TO BE REMOVED LATER WINK WINK*/
            console.log(data);
            /* based on searched pokemon name retrieve sprites and replace current sprites */
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








