const form = document.createElement("form");
form.id = "survey-form";

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
  label.textContent = labelText ? labelText : input["type"] === "radio" ? input["value"].split("-").join(" ") : name.split("-").join(" ");
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
    fieldset.append(labeled(input.radio(id, option)));
  });
  return fieldset;
};

const checkboxSet = (arr, id, legendText) => {
  const options = arr;
  const fieldset = fieldsetWithLegend(id, legendText);
  options.forEach(option => {
    fieldset.append(labeled(input.checkbox(option)));
  });
  return fieldset;
};

function changeAllSliders(e, container, defaultValue) {
  const allRanges = Array.from(container.querySelectorAll("input"));
  const allValues = allRanges.map((v) => Number(v.value));
  const currentTotal = allValues.reduce((a,b) => a + b);
  const maxTotal = defaultValue * allValues.length;
  const adjustment = Math.round(maxTotal - currentTotal) / (allValues.length - 1);
  for (let i = 0; i < allValues.length; i++) {
    if (i !== allRanges.indexOf(e.target)) {
      allRanges[i].value = Number(allRanges[i].value) + adjustment;
    };
  };
  return;
};

const section = {
  gameDetails: () => {
    const fieldset = fieldsetWithLegend("game-details");
    const sessionLength = labeled(input.number("session-length", 2, 8, 0.5, 3, "session length (hours)"));
    const playerCount = labeled(input.number("player-count", 2, 6, 1, 4));
    const partyLevel = labeled(input.number("party-level", 1, 20, 1, 6));
    const difficultyLevel = radioSet(["easy", "medium", "hard", "deadly"], "difficulty-level");
    fieldset.append(sessionLength, playerCount, partyLevel, difficultyLevel)
    return fieldset;
  },
  campaignSettings: () => {
    const settings = ["any", "arctic", "coastal", "desert", "forest", "grassland", "hill", "mountain", "swamp", "underdark", "underwater", "urban"];
    return checkboxSet(settings, "campaign-settings", "campaign settings (select any of interest)");
  },
  encounterBalance: () => {
    const fieldset = fieldsetWithLegend("encounter-balance");
    const sliderContainer = document.createElement("div");
    sliderContainer.id = "slider-container";
    const encounters = ["combat", "exploration", "roleplay"];
    const defaultValue = 50;
    encounters.forEach(encounter => {
      const range = input.range(encounter, 1, defaultValue);
      range.classList.add("range-input");
      sliderContainer.append(labeled(range));
    });
    fieldset.append(sliderContainer);
    fieldset.addEventListener("input", (e) => changeAllSliders(e, fieldset, defaultValue));
    return fieldset;
  },
  gameMechanics: () => {
    const mechanics = [
      "spell-components",
      "weight-encumberance",
      "exhaustion",
      "spell-slots",
      "interplanar-travel",
      "modern-technology"
    ];

    return checkboxSet(mechanics, "game-mechanics");
  }
};

const submitButton = () => {
  const button = document.createElement("button");
  button.type = "submit";
  button.innerText = "submit";
  return button;
};

form.append(section.gameDetails(), section.campaignSettings(), section.encounterBalance(), section.gameMechanics(), submitButton());

document.body.append(form);

form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  for (const p of formData) {
    const name = p[0];
    const value = p[1];
    console.log(name, value);
  };
};