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
  div.classList.add("checkbox-input-pair");
  
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