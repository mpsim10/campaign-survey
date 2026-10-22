const environments = [
  "any",
  "arctic",
  "coastal", 
  "desert",
  "forest",
  "grassland", 
  "hill",
  "mountain", 
  "swamp",
  "underdark", 
  "underwater", 
  "urban"
];

environments.forEach(setting => {
  const container = document.getElementById("environment-checkbox-grid");

  const div = document.createElement("div");
  div.classList.add("checkbox-label-pair");
  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = setting;
  checkbox.id = setting;
  checkbox.setAttribute("autocomplete", "off");

  const label = document.createElement("label");
  label.setAttribute("for", setting);
  label.textContent = setting;

  div.append(checkbox, label);
  container.append(div);
});

document.getElementById("hill").checked = true;
document.getElementById("mountain").checked = true;
document.getElementById("underdark").checked = true;

const gameplayEncounters = [
  "combat",
  "exploration",
  "roleplay"
];

gameplayEncounters.forEach(encounter => {
  const container = document.getElementById("encounter-balance-slider-display");

  const div = document.createElement("div");
  div.classList.add("label-range-pair");
  
  const label = document.createElement("label");
  label.setAttribute("for", `${encounter}-gameplay`);
  label.textContent = encounter;

  const range = document.createElement("input");
  range.type = "range";
  range.name = encounter;
  range.id = encounter;
  range.value = 33;
  range.setAttribute("step", "1");

  div.append(label, range);
  container.append(div);
});

const sliderGrid = document.getElementById("encounter-balance-slider-display");
const allSliders = Array.from(sliderGrid.children).map((div) => div.lastChild);

sliderGrid.addEventListener("input", (e) => {
  const max = 99;
  const allValues = allSliders.map((v) => Number(v.value));
  const total = allValues.reduce((a,b) => a + b);
  const adjustment = (max - total) / 2;
  for (let i = 0; i < allSliders.length; i++) {
    if (i !== allSliders.indexOf(e.target)) {
      allSliders[i].value = Number(allSliders[i].value) + adjustment;
    };
  };
});

const game = {
  environments: [],
};

const difficulty = document.getElementById("difficulty");
const description = document.getElementById("difficulty-description");
difficulty.addEventListener("input", (e) => {
  let text;
  switch (e.target.value) {
    case "1":
      text = "a lovely stroll through town";
      break;
    case "2":
      text = "some bumps and bruises, but nothing to worry about";
      break;
    case "3":
      text = "time to break out the health potions";
      break;      
    case "4":
      text = "barring a series of bad choices, everyone survives";
      break;      
    case "5":
      text = "uncertain whether everyone will make it";
      break;      
    case "6":
      text = "at least one character will likely die";
      break;      
    case "7":
      text = "everybody dies, and that's the point";
      break;      
    default:
      break;
  }
  description.textContent = text;
});

const form = document.getElementById("survey-form");
form.onsubmit = (e) => {
  e.preventDefault();

  const allInputs = Array.from(document.getElementsByTagName("input"));
  allInputs.forEach(input => {
    if (input.type === "checkbox" && input.checked) {
      game.environments.push(input.name);
    } else if (input.type === "number" || input.type === "range") {
      game[input.name] = Number(input.value);
    } else if (input.type === "text") {
      game[input.name] = input.value;
    } else {
      return;
    };
  });
  console.log([game]);
};