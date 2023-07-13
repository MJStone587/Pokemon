"use strict";

/* variable assignment */
const searchSubmit = document.querySelector(".search-submit");
const selectMore = document.querySelector(".select-more");
const close = document.querySelector(".close");
const modal = document.querySelector(".modal");
const content = document.querySelector(".modal-content");
const modalEgg = document.querySelector(".modal-egg");
const modalName = document.querySelector(".modal-name").textContent;
const modalStats = document.querySelector(".modal-stats");
const rightBtn = document.querySelector(".right");
const leftBtn = document.querySelector(".left");
const upBtn = document.querySelector(".up");
const downBtn = document.querySelector(".down");
const selectWeb = document.querySelector(".select-web");
const btn1 = document.querySelector(".button-a");
const btn2 = document.querySelector(".button-b");

const type1 = ".pokeType1";
const type2 = ".pokeType2";
const type3 = ".pokeType3";

let changeCounter = 0;
let idNum = 0;

selectWeb.addEventListener("click", function () {
  window.open("https://www.pokemon.com/us/", "_blank");
});
btn1.addEventListener("click", function () {
  window.open("https://img.pokemondb.net/images/typechart.png", "_blank");
});
btn2.addEventListener("click", function () {
  window.open("https://www.serebii.net/", "_blank");
});
/* function to change pokemon types display at top of gamebro*/
const typeDisplay = function (data) {
  /* change pokemon types displayed and if there is more than one pokemon type change subsequent fields */
  if (data.types.length == 2) {
    document.querySelector(".pokeType1").textContent =
      data.types[0].type.name.charAt(0).toUpperCase() +
      data.types[0].type.name.slice(1);
    document.querySelector(".pokeType2").textContent =
      data.types[1].type.name.charAt(0).toUpperCase() +
      data.types[1].type.name.slice(1);
    document.querySelector(".pokeType3").textContent = " ";
    /* call function to change color of pokemon types */
    colorChange(type1);
    colorChange(type2);
  } else if (data.types.length == 3) {
    document.querySelector(".pokeType1").textContent =
      data.types[0].type.name.charAt(0).toUpperCase() +
      data.types[0].type.name.slice(1);
    document.querySelector(".pokeType2").textContent =
      data.types[1].type.name.charAt(0).toUpperCase() +
      data.types[1].type.name.slice(1);
    document.querySelector(".pokeType3").textContent =
      data.types[2].type.name.charAt(0).toUpperCase() +
      data.types[2].type.name.slice(1);
    colorChange(type1);
    colorChange(type2);
    colorChange(type3);
  } else {
    document.querySelector(".pokeType1").textContent =
      data.types[0].type.name.charAt(0).toUpperCase() +
      data.types[0].type.name.slice(1);
    document.querySelector(".pokeType2").textContent = " ";
    document.querySelector(".pokeType3").textContent = " ";
    colorChange(type1);
  }
};

/* get base stats from API and add to modal gets input from apiSearch() */
const baseStats = (data) => {
  modalStats.textContent = "Base Stats: ";
  var arr = [];
  for (let i = 0; i < data.stats.length; i++) {
    arr.push(
      data.stats[i].stat.name.charAt(0).toUpperCase() +
        data.stats[i].stat.name.slice(1) +
        ":" +
        " " +
        data.stats[i].base_stat +
        " " +
        "|"
    );
    modalStats.append(arr[i] + " ");
  }
};

/* function to change "evolve into" data on modal from api call. Takes input from apiSearch()  */
const evolutionChain = (species) => {
  let evolveUrl = species.evolution_chain.url;
  let modalEvoChain = document.querySelector(".modal-evo-chain");
  modalEvoChain.textContent = "Evolution Chain: ";
  const errorArr = [];
  fetch(evolveUrl)
    .then((response) => response.json())
    .then((data) => {
      try {
        if (data.chain.evolves_to.length > 1) {
          modalEvoChain.textContent =
            "Evolution Chain: " +
            data.chain.species.name.charAt(0).toUpperCase() +
            data.chain.species.name.slice(1) +
            " > " +
            data.chain.evolves_to[0].species.name.charAt(0).toUpperCase() +
            data.chain.evolves_to[0].species.name.slice(1) +
            " > " +
            data.chain.evolves_to[1].species.name.charAt(0).toUpperCase() +
            data.chain.evolves_to[1].species.name.slice(1);
        } else if (
          data.chain.evolves_to.length > 1 &&
          data.chain.evolves_to.evolves_to.length > 1
        ) {
          modalEvoChain.textContent =
            "Evolution Chain: " +
            data.chain.species.name.charAt(0).toUpperCase() +
            data.chain.species.name.slice(1) +
            " > " +
            data.chain.evolves_to[0].species.name.charAt(0).toUpperCase() +
            data.chain.evolves_to[0].species.name.slice(1) +
            " > " +
            data.chain.evolves_to[1].species.name.charAt(0).toUpperCase() +
            data.chain.evolves_to[1].species.name.slice(1);
          +" > " +
            data.chain.evolves_to[0].evolves_to[0].species.name
              .charAt(0)
              .toUpperCase() +
            data.chain.evolves_to[0].evolves_to[0].species.name.slice(1) +
            " || " +
            data.chain.evolves_to[0].evolves_to[1].species.name
              .charAt(0)
              .toUpperCase() +
            data.chain.evolves_to[0].evolves_to[1].species.name.slice(1);
        } else if (
          data.chain.evolves_to.length > 1 &&
          data.chain.evolves_to.evolves_to.length > 0
        ) {
          modalEvoChain.textContent =
            "Evolution Chain: " +
            data.chain.species.name.charAt(0).toUpperCase() +
            data.chain.species.name.slice(1) +
            " > " +
            data.chain.evolves_to[0].species.name.charAt(0).toUpperCase() +
            data.chain.evolves_to[0].species.name.slice(1) +
            " > " +
            data.chain.evolves_to[1].species.name.charAt(0).toUpperCase() +
            data.chain.evolves_to[1].species.name.slice(1);
          +" > " +
            data.chain.evolves_to[0].evolves_to[0].species.name
              .charAt(0)
              .toUpperCase() +
            data.chain.evolves_to[0].evolves_to[0].species.name.slice(1);
        } else if (data.chain.evolves_to.length > 0) {
          // differentiation from pokemon like pansear and conkeldurr with unique api array
          modalEvoChain.textContent =
            "Evolution Chain: " +
            data.chain.species.name.charAt(0).toUpperCase() +
            data.chain.species.name.slice(1) +
            " > " +
            data.chain.evolves_to[0].species.name.charAt(0).toUpperCase() +
            data.chain.evolves_to[0].species.name.slice(1);
          if (data.chain.evolves_to[0].evolves_to[0].is_baby == false) {
            modalEvoChain.textContent =
              "Evolution Chain: " +
              data.chain.species.name.charAt(0).toUpperCase() +
              data.chain.species.name.slice(1) +
              " > " +
              data.chain.evolves_to[0].species.name.charAt(0).toUpperCase() +
              data.chain.evolves_to[0].species.name.slice(1) +
              " > " +
              data.chain.evolves_to[0].evolves_to[0].species.name
                .charAt(0)
                .toUpperCase() +
              data.chain.evolves_to[0].evolves_to[0].species.name.slice(1);
          }
        } else if (
          data.chain.evolves_to.length > 0 &&
          data.chain.evolves_to.evolves_to.length > 1
        ) {
          modalEvoChain.textContent =
            "Evolution Chain: " +
            data.chain.species.name.charAt(0).toUpperCase() +
            data.chain.species.name.slice(1) +
            " > " +
            data.chain.evolves_to[0].species.name.charAt(0).toUpperCase() +
            data.chain.evolves_to[0].species.name.slice(1) +
            " > " +
            data.chain.evolves_to[0].evolves_to[0].species.name
              .charAt(0)
              .toUpperCase() +
            data.chain.evolves_to[0].evolves_to[0].species.name.slice(1) +
            " || " +
            data.chain.evolves_to[0].evolves_to[1].species.name
              .charAt(0)
              .toUpperCase() +
            data.chain.evolves_to[0].evolves_to[1].species.name.slice(1);
        } else if (
          data.chain.evolves_to.length > 0 &&
          data.chain.evolves_to.evolves_to.length > 0
        ) {
          modalEvoChain.textContent =
            "Evolution Chain: " +
            data.chain.species.name.charAt(0).toUpperCase() +
            data.chain.species.name.slice(1) +
            " > " +
            data.chain.evolves_to[0].species.name.charAt(0).toUpperCase() +
            data.chain.evolves_to[0].species.name.slice(1) +
            " > " +
            data.chain.evolves_to[0].evolves_to[0].species.name
              .charAt(0)
              .toUpperCase() +
            data.chain.evolves_to[0].evolves_to[0].species.name.slice(1);
        } else if (
          data.chain.evolves_to.length > 0 &&
          data.chain.evolves_to.evolves_to.length === 0
        ) {
          console.log("fkit");
        } else {
          modalEvoChain.textContent =
            "Evolution Chain: " +
            data.chain.species.name.charAt(0).toUpperCase() +
            data.chain.species.name.slice(1);
        }
      } catch (err) {
        errorArr.push(err);
      }
    });
};

/* function to change Egg Groups modal information with selected pokemon data gets species from apiSearch() */
const eggGroup = (species) => {
  modalEgg.textContent = "Egg Groups:";
  var arr = [];
  for (let i = 0; i < species.egg_groups.length; i++) {
    arr.push(
      species.egg_groups[i].name.charAt(0).toUpperCase() +
        species.egg_groups[i].name.slice(1)
    );
    if (species.egg_groups.length > 1) {
      modalEgg.append(" " + arr[i] + " |");
    } else {
      modalEgg.append(" " + arr[i]);
    }
  }
};

// search pokeapi based on id and populate display
const searchByID = function (id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    /* response transform to json to read */
    .then((response) => response.json())
    .then((data) => {
      let speciesFetch = data.species.url;
      fetch(speciesFetch)
        .then((newResponse) => newResponse.json())
        .then((species) => {
          /* call functions to fill modal */
          evolutionChain(species);
          eggGroup(species);
        });
      baseStats(data);
      /* based on searched pokemon name, retrieve sprites and replace current sprites */
      document.getElementById("defaultSprite").src = data.sprites.front_default;
      document.getElementById("defaultShiny").src = data.sprites.front_shiny;
      document.getElementById("backDefault").src = data.sprites.back_default;
      document.getElementById("backShiny").src = data.sprites.back_shiny;
      /* change name of pokemon displayed to name of pokemon in api call and capitalize first letter*/
      document.querySelector(".name").textContent =
        data.name.charAt(0).toUpperCase() + data.name.slice(1);
      /* change name of pokemon displayed in modalto name of pokemon in api call and capitalize first letter*/
      document.querySelector(".modal-name").textContent =
        data.name.charAt(0).toUpperCase() + data.name.slice(1);
      document.querySelector(".modal-name").style.textDecoration = "underline";
      /* typeDisplay function changes color of pokemon types and fills elements necessary*/
      typeDisplay(data);
      idNum = data.id;
    });
};

/* api call based on pokemon selected in dropdown list or in search field */
const apiSearchByName = function (search) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`)
    /* response transform to json to read */
    .then((response) => response.json())
    .then((data) => {
      let speciesFetch = data.species.url;
      fetch(speciesFetch)
        .then((newResponse) => newResponse.json())
        .then((species) => {
          /* call functions to fill modal */
          evolutionChain(species);
          eggGroup(species);
        });
      baseStats(data);
      typeDisplay(data);
      idNum = data.id;
      /* based on searched pokemon name, retrieve sprites and replace current sprites */
      document.getElementById("defaultSprite").src = data.sprites.front_default;
      document.getElementById("defaultShiny").src = data.sprites.front_shiny;
      document.getElementById("backDefault").src = data.sprites.back_default;
      document.getElementById("backShiny").src = data.sprites.back_shiny;
      /* change name of pokemon displayed to name of pokemon in api call and capitalize first letter*/
      document.querySelector(".name").textContent =
        data.name.charAt(0).toUpperCase() + data.name.slice(1);
      /* change name of pokemon displayed in modalto name of pokemon in api call and capitalize first letter*/
      document.querySelector(".modal-name").textContent =
        data.name.charAt(0).toUpperCase() + data.name.slice(1);
      document.querySelector(".modal-name").style.textDecoration = "underline";
      /* typeDisplay function changes color of pokemon types and fills elements necessary*/
    });
};

/* function with switch statement to change text color based on the type of the pokemon */
const colorChange = function (type) {
  let pokeType = document.querySelector(type).textContent.toLowerCase();
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
      document.querySelector(type).style.color = "#9962f0";
      break;
    case "bug":
      document.querySelector(type).style.color = "#5f9d37";
      break;
    case "rock":
      document.querySelector(type).style.color = "#BED2C7";
      break;
    case "ghost":
      document.querySelector(type).style.color = "#382844";
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
};

// D-Pad buttons increment ID of pokemon allowing user to browse through all pokemon
rightBtn.addEventListener("click", function () {
  idNum++;
  if (idNum > 898) {
    idNum = 0;
    idNum++;
    searchByID(idNum);
  } else {
    searchByID(idNum);
  }
});
leftBtn.addEventListener("click", function () {
  idNum--;
  if (idNum <= 0) {
    idNum = 898;
    searchByID(idNum);
  } else {
    searchByID(idNum);
  }
});
upBtn.addEventListener("click", function () {
  idNum += 10;
  if (idNum >= 879) {
    idNum = 0;
    idNum += 10;
    searchByID(idNum);
  } else {
    idNum += 10;
    searchByID(idNum);
  }
});
downBtn.addEventListener("click", function () {
  idNum -= 10;
  if (idNum <= 10) {
    idNum = 898;
    idNum -= 10;
    searchByID(idNum);
  } else {
    idNum -= 10;
    searchByID(idNum);
  }
});
/* More button fuction to open modal */
selectMore.onclick = function () {
  modal.style.display = "block";
};
/* close modal if clicking anywhere on modal */
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
/* close modal on clicking x button*/
close.onclick = function () {
  modal.style.display = "none";
};

/* Fetch all pokemon TYPES from api call and populate select dropdown options*/
const pokemonTypes = function () {
  fetch("https://pokeapi.co/api/v2/type/?limit=18/")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        const selectType = document.getElementById("type-select");
        const option = document.createElement("option");
        let capitalize =
          data.results[i].name.charAt(0).toUpperCase() +
          data.results[i].name.slice(1);
        option.value = data.results[i].name;
        option.textContent = capitalize;
        selectType.add(option, null);
      }
    });
};
pokemonTypes();

/* submit button click event*/
const submitClick = function () {
  document
    .querySelector(".gamebro-row2-right")
    .addEventListener("click", function (event) {
      /* grab data from correct element depending on which submit button is selected */
      if (event.target.classList.contains("search-submit")) {
        /* store the data within the search field and make it all lowercase*/
        const search = document.getElementById("search").value.toLowerCase();
        /* use data within the search field as paramenters for api call */
        apiSearchByName(search);
      } else if (event.target.classList.contains("dropdownSubmit")) {
        const search = document.querySelector(".dropdown2").value.toLowerCase();
        apiSearchByName(search);
      }
    });
};
submitClick();

/* create and populate second dropdown list from the TYPE select dropdown*/
function changeValue() {
  const arr = [];
  changeCounter++;
  if (changeCounter <= 1) {
    //get the poke type from the poketypeselect and store it in a variable
    let typeName = document.getElementById("type-select").value;
    // store data to create new select element under header
    const newSelect = document.createElement("select");
    const header = document.querySelector(".row2-search-tools");
    const newButton = document.createElement("button");
    header.append(newSelect);
    header.append(newButton);
    newSelect.classList.add("dropdown2");
    newButton.textContent = "Submit";
    newButton.classList.add("dropdownSubmit");
    fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
      .then((response) => response.json())
      .then((data) => {
        // populate array with pokemon names from api
        for (let i = 0; i < data.pokemon.length; i++) {
          arr.push(
            data.pokemon[i].pokemon.name.charAt(0).toUpperCase() +
              data.pokemon[i].pokemon.name.slice(1)
          );
        }
        arr.sort();
      })
      .then(() => {
        // populate dropdwon list options with pokemon names from array
        for (let i = 0; i < arr.length; i++) {
          const newOption = document.createElement("option");
          newOption.value = arr[i];
          newOption.textContent = arr[i];
          newSelect.add(newOption, null);
        }
      });
  } else if (changeCounter > 1) {
    let typeName = document.getElementById("type-select").value;
    const selectEl = document.querySelector(".dropdown2");
    for (let i = selectEl.options.length - 1; i >= 0; i--) {
      selectEl.remove(i);
    }
    fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
      .then((response) => response.json())
      .then((data) => {
        // add all the pokemon to our array and sort
        for (let i = 0; i < data.pokemon.length; i++) {
          arr.push(
            data.pokemon[i].pokemon.name.charAt(0).toUpperCase() +
              data.pokemon[i].pokemon.name.slice(1)
          );
        }
        arr.sort();
      })
      .then(() => {
        // populate dropdwon list options with pokemon names from our array after being sorted
        for (let i = 0; i < arr.length; i++) {
          const newOption = document.createElement("option");
          newOption.value = arr[i];
          newOption.textContent = arr[i];
          selectEl.add(newOption, null);
        }
      });
  }
}
