'use strict';

const pokeball = document.getElementById('pokeball');

const requestType = function (type) {
    fetch(`https://pokeapi.co/api/v2/type/${type}/`)
        .then(response => response.json())
        .then(data =>
            console.log(data.pokemon));
};


// click event for submit button on search field...function sends whatever string is in search field as the fetch name.

document.getElementById('submit').addEventListener('click', function () {
    const search = document.getElementById('search').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('defaultSprite').src = data.sprites.front_default;
            document.getElementById('defaultShiny').src = data.sprites.front_shiny;
            document.getElementById('backDefault').src = data.sprites.back_default;
            document.getElementById('backShiny').src = data.sprites.back_shiny;
            document.getElementById('pokeTypes').innerHTML = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
            document.getElementById('name').innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);

        });
});