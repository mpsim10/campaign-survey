const form = document.forms["survey-form"];

const input = {

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

const labeled = (input, labelText) => {
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

const fieldsetWithLegend = (id, legendText) => {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  fieldset.id = id;
  legend.textContent = legendText ? legendText : id.split("-").join(" ");
  fieldset.append(legend);
  return fieldset;
};

const radioSet = (arr, id, legendText) => {
  const options = arr;
  const fieldset = fieldsetWithLegend(id, legendText);
  options.forEach(option => {
    const radio = labeled(input.radio(id, option));
    fieldset.append(radio);
  });
  return fieldset;
};

const detailsSection = () => {
  const fieldset = fieldsetWithLegend("game-details");
  const sessionLength = labeled(input.number("session-length", 2, 8, 0.5, 3, "session length (hours)"));
  const playerCount = labeled(input.number("player-count", 2, 6, 1, 4));
  const partyLevel = labeled(input.number("party-level", 1, 20, 1, 6));
  const difficultyLevel = radioSet(["easy", "medium", "hard", "deadly"], "difficulty-level");
  fieldset.append(sessionLength, playerCount, partyLevel, difficultyLevel)
  return fieldset;
};

const environmentsSection = () => {
  const fieldset = fieldsetWithLegend("environments");
  const environments = ["any", "arctic", "coastal", "desert", "forest", "grassland", "hill", "mountain", "swamp", "underdark", "underwater", "urban"];
  environments.forEach(setting => {fieldset.append(labeled(input.checkbox(setting)))});
  return fieldset;
};

form.append(detailsSection(), environmentsSection());

const gameplayEncounters = [
  "combat",
  "exploration",
  "roleplay"
];

gameplayEncounters.forEach(encounter => {
  const container = document.getElementById("encounter-balance-slider-display");
  container.append(labeled(input.range(encounter, 1, 33)));
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

mechanics.forEach((mechanic) => {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = `${mechanic.split("-").join(" ")}`;
  fieldset.append(legend);

  const options = ["yes", "no"];

  options.forEach(option => {
    fieldset.append(labeled(input.radio(mechanic, option, option.charAt(0))));
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