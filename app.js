const gallery = document.querySelector("#gallery");
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categorySelect");

let batches = [];
let categories = [];

function styleText(batch) {
  return batch.styles.map((style) => `${style.id}. ${style.name} / ${style.zh}`).join(" ");
}

function render(items) {
  gallery.innerHTML = items.map((batch) => `
    <article class="card">
      <a href="${batch.image}" target="_blank" rel="noopener">
        <img
          src="${batch.thumb || batch.image}"
          loading="lazy"
          decoding="async"
          alt="Batch ${String(batch.batch).padStart(2, "0")} poster style comparison card"
        >
      </a>
      <div class="card-body">
        <h2>Batch ${String(batch.batch).padStart(2, "0")}</h2>
        <p class="meta">${batch.categories.map((category) => `${category.zh} / ${category.en}`).join(" + ")}</p>
        <div class="tags">
          ${batch.styles.map((style) => `<span class="tag">${style.id}. ${style.name} / ${style.zh}</span>`).join("")}
        </div>
      </div>
    </article>
  `).join("");
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const filtered = batches.filter((batch) => {
    const categoryMatch = category === "all" || batch.categories.some((item) => item.key === category);
    const queryMatch = !query || styleText(batch).toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });
  render(filtered);
}

fetch("data/batches.json")
  .then((response) => response.json())
  .then((data) => {
    batches = data.batches;
    categories = data.categories;
    for (const category of categories) {
      const option = document.createElement("option");
      option.value = category.key;
      option.textContent = `${category.zh} / ${category.en}`;
      categorySelect.appendChild(option);
    }
    render(batches);
  });

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
