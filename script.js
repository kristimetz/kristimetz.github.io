//
//  LOAD SUNSCREENS
//
async function loadSunscreens() {
  try {
    console.log("Attempting to load sunscreens.json...");
    const response = await fetch("data/sunscreens.json");

    if (!response.ok) {
      console.error("Failed to load sunscreens.json:", response.status, response.statusText);
      return [];
    }

    const sunscreens = await response.json();
    console.log("Loaded sunscreens:", sunscreens);
    return sunscreens;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

//
//  FORMAT INGREDIENT LINKS
//
function formatIngredientLink(ing) {
  const urlSlug = ing
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

  return `<a href="https://incidecoder.com/ingredients/${urlSlug}" target="_blank">${in_
