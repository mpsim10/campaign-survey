const inputElements = {

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
  }
};

const labeledInput = {
  number(name, min, max, step, defaultValue, labelText) {
    const label = inputElements.label(name, labelText);
    const number = inputElements.number(name, min, max, step, defaultValue);
    label.append(number);
    return label;
  },
  radio(name, value, labelText) {
    const label = inputElements.label(value, labelText);
    const radio = inputElements.radio(name, value);
    label.insertBefore(radio, label.lastChild);
    return label;
  },
  checkbox(name, labelText) {
    const label = inputElements.label(name, labelText);
    const checkbox = inputElements.checkbox(name);
    label.insertBefore(checkbox, label.lastChild);
    return label;
  }
};

const form = document.forms["survey-form"];

const sessionLength = labeledInput.number("session-length", 2, 8, 0.5, 3, "session length (hours)");
const playerCount = labeledInput.number("player-count", 2, 6, 1, 4);
const partyLevel = labeledInput.number("party-level", 1, 20, 1, 6);

const difficultyFieldset = document.createElement("fieldset");
const difficultyLegend = document.createElement("legend");
difficultyLegend.textContent = "difficulty level";
difficultyFieldset.append(difficultyLegend);
const difficultyLevels = ["easy", "medium", "hard", "deadly"];
difficultyLevels.forEach(level => {
  difficultyFieldset.append(labeledInput.radio("difficulty", level));
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

  const checkbox = labeledInput.checkbox(setting);

  container.append(checkbox);

  // const div = document.createElement("div");
  // div.classList.add("checkbox-label-pair");
  
  // const checkbox = document.createElement("input");
  // checkbox.type = "checkbox";
  // checkbox.name = setting;
  // checkbox.id = setting;

  // const label = document.createElement("label");
  // label.setAttribute("for", setting);
  // label.textContent = setting;

  // div.append(checkbox, label);
  // container.append(div);
});

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
    fieldset.append(labeledInput.radio(mechanic, option, option.charAt(0)));
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