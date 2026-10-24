const inputElement = {

  label(str, labelText) {
    const label = document.createElement("label");
    label["for"] = str;
    label.textContent = labelText ? labelText : str.split("-").join(" ");
    return label;
  },
  number(name, min, max, step, defaultValue) {
    const number = document.createElement("input");
    number.type = "number";
    number.name = name;
    number.id = name;
    number.min = min;
    number.max = max;
    number.step = step;
    number.value = defaultValue;
    return number;
  },
  radio(name, value) {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = name;
    radio.id = value;
    radio.value = value;
    return radio;
  },
  checkbox(name) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = name;
    checkbox.id = name;
    return checkbox;
  },
  range(name, step, defaultValue) {    
    const range = document.createElement("input");
    range.type = "range";
    range.name = name;
    range.id = name;
    range.value = defaultValue;
    range.setAttribute("step", step);
    return range;
  }
};

const labeledInput = (input, labelText) => {
  const label = document.createElement("label");
  const name = input["name"];
  label["for"] = name;
  label.textContent = labelText ? labelText : input["type"] === "radio" ? input["value"] : name.split("-").join(" ");
  if (input["type"] === "radio" || input["type"] === "checkbox") {
    label.insertBefore(input, label.lastChild);
  } else {
    label.append(input);
  };
  return label;
};

const form = document.forms["survey-form"];

const sessionLength = labeledInput(inputElement.number("session-length", 2, 8, 0.5, 3, "session length (hours)"));
const playerCount = labeledInput(inputElement.number("player-count", 2, 6, 1, 4));
const partyLevel = labeledInput(inputElement.number("party-level", 1, 20, 1, 6));

const difficultyFieldset = document.createElement("fieldset");
const difficultyLegend = document.createElement("legend");
difficultyLegend.textContent = "difficulty level";
difficultyFieldset.append(difficultyLegend);
const difficultyLevels = ["easy", "medium", "hard", "deadly"];
difficultyLevels.forEach(level => {
  difficultyFieldset.append(labeledInput(inputElement.radio("difficulty", level)));
});

document.getElementById("details-fieldset").append(sessionLength, playerCount, partyLevel, difficultyFieldset);

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
  container.append(labeledInput(inputElement.checkbox(setting)));
});

const gameplayEncounters = [
  "combat",
  "exploration",
  "roleplay"
];

gameplayEncounters.forEach(encounter => {
  const container = document.getElementById("encounter-balance-slider-display");
  container.append(labeledInput(inputElement.range(encounter, 1, 33)));
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

const mechanics = [
  "spell-components",
  "weight-encumberance",
  "exhaustion",
  "spell-slots"
];

mechanics.forEach((mechanic, i) => {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = `${mechanic.split("-").join(" ")}`;
  fieldset.append(legend);

  const options = ["yes", "no"];

  options.forEach(option => {
    fieldset.append(labeledInput(inputElement.radio(mechanic, option, option.charAt(0))));
  });

  document.getElementById("mechanics-fieldset").append(fieldset);
});

form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  for (const p of formData) {
    const name = p[0];
    const value = p[1];
    console.log(name, value);
  };
};