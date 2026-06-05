const gallery = document.querySelector("#gallery");
const detail = document.querySelector("#detail");
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categorySelect");

let batches = [];
let categories = [];

function styleText(batch) {
  return batch.styles.map((style) => `${style.id}. ${style.name} / ${style.zh}`).join(" ");
}

function render(items) {
  gallery.innerHTML = items.map((batch) => `
    <article class="card" id="card-batch-${String(batch.batch).padStart(2, "0")}">
      <a class="image-link" href="#batch-${String(batch.batch).padStart(2, "0")}" data-batch="${batch.batch}">
        <img
          src="${batch.thumb || batch.image}"
          loading="lazy"
          decoding="async"
          alt="Batch ${String(batch.batch).padStart(2, "0")} poster style comparison card"
        >
      </a>
      <div class="card-body">
        <h2>Batch ${String(batch.batch).padStart(2, "0")}</h2>
        <p class="meta">${batch.categories.map((category) => `${category.en} / ${category.zh}`).join(" + ")}</p>
        <div class="tags">
          ${batch.styles.map((style) => `<span class="tag">${style.id}. ${style.name} / ${style.zh}</span>`).join("")}
        </div>
        <div class="actions">
          <a href="#batch-${String(batch.batch).padStart(2, "0")}" data-batch="${batch.batch}">View details</a>
          <a href="${batch.image}" target="_blank" rel="noopener">Original PNG</a>
        </div>
      </div>
    </article>
  `).join("");
}

function renderDetail(batch) {
  if (!batch) {
    detail.hidden = true;
    detail.innerHTML = "";
    return;
  }

  const batchId = String(batch.batch).padStart(2, "0");
  detail.hidden = false;
  detail.innerHTML = `
    <div class="detail-panel" role="dialog" aria-modal="false" aria-labelledby="detail-title">
      <div class="detail-head">
        <div>
          <p class="eyebrow">Batch ${batchId}</p>
          <h2 id="detail-title">Style Card ${batchId}</h2>
          <p class="meta">${batch.categories.map((category) => `${category.en}`).join(" + ")}</p>
        </div>
        <a class="close" href="#gallery" aria-label="Close detail">Close</a>
      </div>
      <img class="detail-image" src="${batch.image}" alt="Original poster style card batch ${batchId}">
      <div class="detail-foot">
        <div class="tags">
          ${batch.styles.map((style) => `<span class="tag">${style.id}. ${style.name} / ${style.zh}</span>`).join("")}
        </div>
        <div class="actions">
          <a href="${batch.image}" target="_blank" rel="noopener">Open original PNG</a>
          <a href="#card-batch-${batchId}">Back to card</a>
        </div>
      </div>
    </div>
  `;
  detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function syncDetailFromHash() {
  const match = window.location.hash.match(/^#batch-(\d{2})$/);
  if (!match) {
    renderDetail(null);
    return;
  }
  const batch = batches.find((item) => String(item.batch).padStart(2, "0") === match[1]);
  renderDetail(batch);
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
      option.textContent = `${category.en} / ${category.zh}`;
      categorySelect.appendChild(option);
    }
    render(batches);
    syncDetailFromHash();
  });

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
window.addEventListener("hashchange", syncDetailFromHash);
