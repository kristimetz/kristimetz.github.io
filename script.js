async function loadSunscreens() {
  const response = await fetch("data/sunscreens.json");
  const sunscreens = await response.json();
  return sunscreens;
}

function formatIngredientLink(ing) {
  const urlSlug = ing
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

  return `<a href="https://incidecoder.com/ingredients/${urlSlug}" target="_blank">${ing}</a>`;
}

function displaySunscreens(list) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "sunscreen-card";

    // Ingredient links
    const ingredientLinks = item.ingredients
      .map(ing => formatIngredientLink(ing))
      .join(", ");

    // Safety score shortcuts
    const ss = item.safety_scores ?? {};
    const rosacea = ss.rosacea ?? {};
    const acne = ss.acne ?? {};
    const sensitive = ss.sensitive ?? {};

    div.innerHTML = `
      <h2>${item.brand} – ${item.product}</h2>

      <p><strong>SPF:</strong> ${item.spf ?? "Unknown"}</p>
      <p><strong>PA Rating:</strong> ${item.pa ?? "Unknown"}</p>
      <p><strong>Type:</strong> ${item.type ?? "Unknown"}</p>
      <p><strong>Texture/Finish:</strong> ${item.texture_finish ?? "Unknown"}</p>
      <p><strong>Country:</strong> ${item.country ?? "Unknown"}</p>

      <p><strong>Niacinamide?</strong> ${item.niacinamide ?? "Unknown"}</p>
      <p><strong>Barrier Support:</strong> ${item.barrier_support ?? "Unknown"}</p>
      <p><strong>Fragrance:</strong> ${item.fragrance ?? "Unknown"}</p>
      <p><strong>White Cast:</strong> ${item.white_cast ?? "Unknown"}</p>
      <p><strong>Visible Light Protection:</strong> ${item.visible_light_protection ?? "Unknown"}</p>
      <p><strong>Water Resistant:</strong> ${item.water_resistant ?? "Unknown"}</p>

      <details>
        <summary><strong>Safety Scores</strong></summary>

        <p><strong>Rosacea:</strong><br>
          • Stinging: ${rosacea.stinging ?? "Unknown"}<br>
          • Flushing: ${rosacea.flushing ?? "Unknown"}<br>
          • Barrier Impact: ${rosacea.barrier ?? "Unknown"}
        </p>

        <p><strong>Acne:</strong><br>
          • Comedogenicity: ${acne.comedogenicity ?? "Unknown"}<br>
          • Fungal Acne: ${acne.fungal_acne ?? "Unknown"}
        </p>

        <p><strong>Sensitive Skin:</strong><br>
          • Fragrance: ${sensitive.fragrance ?? "Unknown"}<br>
          • Essential Oils: ${sensitive.essential_oils ?? "Unknown"}<br>
          • Surfactant Strength: ${sensitive.surfactant_strength ?? "Unknown"}
        </p>
      </details>

      <details>
        <summary><strong>Ingredients</strong></summary>
        <p>${ingredientLinks}</p>
      </details>

      <p><em>${item.notes ?? ""}</em></p>
    `;

    container.appendChild(div);
  });
}

function setupSearch(all) {
  const search = document.getElementById("search");

  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();

    const filtered = all.filter(item =>
      item.brand.toLowerCase().includes(term) ||
      item.product.toLowerCase().includes(term) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(term))
    );

    displaySunscreens(filtered);
  });
}

loadSunscreens().then(all => {
  displaySunscreens(all);
  setupSearch(all);
});
