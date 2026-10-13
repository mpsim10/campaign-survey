const campaignSettings = [
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
]

campaignSettings.forEach(setting => {
  const div = document.createElement("div");
  div.classList.add("checkbox-label-pair");
  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "campaign-setting";
  checkbox.id = `${setting}-setting`;
  checkbox.value = setting;

  const label = document.createElement("label");
  label.setAttribute("for", `${setting}-setting`);
  label.textContent = setting;

  div.append(checkbox, label);
  document.getElementById("campaign-setting-checkbox-grid").append(div);
});

const gameplayEncounters = [
  "combat",
  "exploration",
  "roleplay"
];

gameplayEncounters.forEach(encounter => {
  const div = document.createElement("div");
  div.classList.add("label-range-pair");
  
  const label = document.createElement("label");
  label.setAttribute("for", `${encounter}-gameplay`);
  label.textContent = encounter;

  const range = document.createElement("input");
  range.type = "range";
  range.name = `${encounter}-gameplay`;
  range.id = `${encounter}-gameplay`;
  range.value = 33.3;
  range.setAttribute("step", "0.1");

  div.append(label, range);
  document.getElementById("gameplay-balance-range-grid").append(div);
});

const sliderGrid = document.getElementById("gameplay-balance-range-grid");
const allSliders = Array.from(sliderGrid.children).map((div) => div.lastChild);

sliderGrid.addEventListener("mouseup", (e) => {
  const max = 100;
  const allValues = allSliders.map((v) => Number(v.value))
  const total = allValues.reduce((a,b) => a + b);
  const adjustment = (max - total) / 2;
  for (let i = 0; i < allSliders.length; i++) {
    if (i !== allSliders.indexOf(e.target)) {
      allSliders[i].value = Number(allSliders[i].value) + adjustment;
    };
  };
});