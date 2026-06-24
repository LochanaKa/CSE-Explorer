/**
 * CSE Company Explorer — Main Logic
 * @LochanaKa — Data Science • Economics • Markets
 */

/* Update this whenever companies.js data is verified/refreshed.
   It's shown to users in the hero badge and the footer. */
const DATA_LAST_UPDATED = "19 June 2026";

(() => {
  // ---- DOM refs ----
  const grid           = document.getElementById("companyGrid");
  const emptyState     = document.getElementById("emptyState");
  const resultsCount   = document.getElementById("resultsCount");
  const searchInput    = document.getElementById("searchInput");
  const sectorFilter   = document.getElementById("sectorFilter");
  const yearFilter     = document.getElementById("yearFilter");
  const sortFilter     = document.getElementById("sortFilter");
  const resetBtn       = document.getElementById("resetFilters");
  const emptyResetBtn  = document.getElementById("emptyReset");
  const yearEl         = document.getElementById("year");
  const tabs           = document.querySelectorAll(".tab");

  const vizBars        = document.getElementById("vizBars");
  const vizTitle       = document.getElementById("vizTitle");
  const vizClear       = document.getElementById("vizClear");
  const vizScrollWrap  = document.getElementById("vizScrollWrap");
  const vizArrowLeft   = document.getElementById("vizArrowLeft");
  const vizArrowRight  = document.getElementById("vizArrowRight");

  const stickyStack    = document.getElementById("stickyStack");
  const backToTop      = document.getElementById("backToTop");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const heroUpdatedEl = document.getElementById("heroUpdated");
  const footerUpdatedEl = document.getElementById("footerUpdated");
  if (heroUpdatedEl) heroUpdatedEl.textContent = `Data last verified: ${DATA_LAST_UPDATED}`;
  if (footerUpdatedEl) footerUpdatedEl.textContent = `Data last verified: ${DATA_LAST_UPDATED}`;

  // ---- Active status category (tab state) ----
  let activeStatus = "listed";
  const statusLabel = { listed: "Listed", merged: "Merged", delisted: "Delisted" };

  // ---- Populate tab counts from data ----
  const statusCounts = { listed: 0, merged: 0, delisted: 0 };
  COMPANIES.forEach(c => { if (statusCounts[c.status] !== undefined) statusCounts[c.status]++; });
  document.getElementById("count-listed").textContent   = statusCounts.listed;
  document.getElementById("count-merged").textContent   = statusCounts.merged;
  document.getElementById("count-delisted").textContent = statusCounts.delisted;

  // ---- Populate Sector dropdown ----
  SECTORS.forEach(sector => {
    const opt = document.createElement("option");
    opt.value = sector;
    opt.textContent = sector;
    sectorFilter.appendChild(opt);
  });

  // ---- Populate Year dropdown (from verified data, descending) ----
  const years = [...new Set(COMPANIES.map(c => c.listedYear).filter(Boolean))].sort((a,b) => b-a);
  years.forEach(year => {
    const opt = document.createElement("option");
    opt.value = year;
    opt.textContent = year;
    yearFilter.appendChild(opt);
  });
  if (!years.length) {
    const opt = document.createElement("option");
    opt.value = "none";
    opt.textContent = "Not added yet";
    opt.disabled = true;
    yearFilter.appendChild(opt);
  }

  // ---- Icons ----
  const arrowIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  // ---- Helpers ----
  function esc(s) {
    const d = document.createElement("div");
    d.textContent = String(s);
    return d.innerHTML;
  }
  function escAttr(s) { return String(s).replace(/"/g, "&quot;"); }

  function highlightMatch(text, q) {
    if (!q) return esc(text);
    const safe = esc(text);
    const idx = safe.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return safe;
    return safe.slice(0, idx) + "<mark>" + safe.slice(idx, idx + q.length) + "</mark>" + safe.slice(idx + q.length);
  }

  // ---- Build card HTML ----
  function buildCard(company, index, q) {
    const card = document.createElement("article");
    card.className = `company-card card--${company.status}`;
    card.style.animationDelay = `${Math.min(index * 0.012, 0.4)}s`;

    const hasAnalysis = company.analysisUrl && company.analysisUrl !== "#";
    const yearLabel   = company.listedYear ? company.listedYear : "—";

    let statusNote = "";
    if (company.status === "merged" && company.mergedInto) {
      statusNote = `
        <div class="card-status-note">
          <strong>Merged into</strong>
          ${esc(company.mergedInto)}
        </div>`;
    } else if (company.status === "delisted" && company.delistedNote) {
      statusNote = `
        <div class="card-status-note">
          <strong>Delisted</strong>
          ${esc(company.delistedNote)}
        </div>`;
    }

    card.innerHTML = `
      <div class="card-top">
        <span class="card-ticker">${esc(company.ticker)}</span>
        <span class="card-year">${esc(String(yearLabel))}</span>
      </div>
      <h3 class="card-name">${highlightMatch(company.name, q)}</h3>
      <span class="card-sector">${esc(company.sector)}</span>
      ${statusNote}
      <div class="card-action" style="margin-top:auto;padding-top:4px;">
        ${hasAnalysis
          ? `<a class="btn-analyze" href="${escAttr(company.analysisUrl)}" target="_self" rel="noopener" aria-label="View analysis for ${escAttr(company.name)}">View Analysis ${arrowIcon}</a>`
          : `<button class="btn-analyze is-pending" type="button" disabled aria-label="Analysis coming soon for ${escAttr(company.name)}">Analysis Coming Soon</button>`
        }
      </div>
    `;
    return card;
  }

  // ---- Filtering + Sorting ----
  function getFiltered() {
    const q        = searchInput.value.trim().toLowerCase();
    const sector   = sectorFilter.value;
    const year     = yearFilter.value;

    let list = COMPANIES.filter(c => {
      if (c.status !== activeStatus) return false;
      if (q && !c.name.toLowerCase().includes(q) && !c.ticker.toLowerCase().includes(q)) return false;
      if (sector !== "all" && c.sector !== sector) return false;
      if (year !== "all" && (!c.listedYear || String(c.listedYear) !== year)) return false;
      return true;
    });

    const sortVal = sortFilter.value;
    list = list.slice().sort((a, b) => {
      if (sortVal === "name-desc") return b.name.localeCompare(a.name);
      if (sortVal === "ticker-asc") return a.ticker.localeCompare(b.ticker);
      return a.name.localeCompare(b.name); // name-asc (default)
    });

    return list;
  }

  // ---- Render cards ----
  function renderCards(companies) {
    const q = searchInput.value.trim();
    grid.innerHTML = "";
    if (!companies.length) { emptyState.hidden = false; return; }
    emptyState.hidden = true;
    const frag = document.createDocumentFragment();
    companies.forEach((c, i) => frag.appendChild(buildCard(c, i, q)));
    grid.appendChild(frag);
  }

  // ---- Sector breakdown (stat chips) ----
  function updateArrowState() {
    const max = vizBars.scrollWidth - vizBars.clientWidth;
    const atStart = vizBars.scrollLeft <= 4;
    const atEnd = vizBars.scrollLeft >= max - 4;
    vizArrowLeft.disabled = atStart;
    vizArrowRight.disabled = atEnd || max <= 0;
    vizScrollWrap.classList.toggle("at-start", atStart);
    vizScrollWrap.classList.toggle("at-end", atEnd || max <= 0);
  }

  function renderSectorViz() {
    const baseList = COMPANIES.filter(c => c.status === activeStatus);
    const counts = {};
    baseList.forEach(c => { counts[c.sector] = (counts[c.sector] || 0) + 1; });
    const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const max = rows.length ? rows[0][1] : 1;
    const selectedSector = sectorFilter.value;

    vizTitle.textContent = `Sector Breakdown — ${statusLabel[activeStatus]}`;
    vizClear.classList.toggle("show", selectedSector !== "all");

    vizBars.innerHTML = "";
    rows.forEach(([sector, count]) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "viz-chip" + (selectedSector === sector ? " is-selected" : "");
      chip.title = sector;
      chip.innerHTML = `
        <span class="viz-chip-label">${esc(sector)}</span>
        <span class="viz-chip-count">${count}</span>
        <span class="viz-chip-bar"><span class="viz-chip-bar-fill" style="width:${(count/max*100).toFixed(1)}%"></span></span>`;
      chip.addEventListener("click", () => {
        sectorFilter.value = (sectorFilter.value === sector) ? "all" : sector;
        applyFilters();
      });
      vizBars.appendChild(chip);
    });

    vizBars.scrollLeft = 0;
    updateArrowState();
  }

  // ---- Apply / Reset ----
  function applyFilters() {
    const filtered = getFiltered();
    renderCards(filtered);
    resultsCount.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${statusCounts[activeStatus]}</strong> ${activeStatus} companies`;
    renderSectorViz();
  }

  function resetFilters() {
    searchInput.value    = "";
    sectorFilter.value   = "all";
    yearFilter.value     = "all";
    sortFilter.value     = "name-asc";
    applyFilters();
  }

  // ---- Tab switching ----
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      activeStatus = tab.dataset.status;
      resetFilters();
    });
  });

  // ---- Sector viz controls ----
  vizClear.addEventListener("click", () => { sectorFilter.value = "all"; applyFilters(); });
  vizArrowLeft.addEventListener("click", () => vizBars.scrollBy({ left: -240, behavior: "smooth" }));
  vizArrowRight.addEventListener("click", () => vizBars.scrollBy({ left: 240, behavior: "smooth" }));
  vizBars.addEventListener("scroll", updateArrowState, { passive: true });
  window.addEventListener("resize", updateArrowState);

  // ---- Filter/search/sort events ----
  let debounce;
  searchInput.addEventListener("input", () => { clearTimeout(debounce); debounce = setTimeout(applyFilters, 150); });
  sectorFilter.addEventListener("change", applyFilters);
  yearFilter.addEventListener("change", applyFilters);
  sortFilter.addEventListener("change", applyFilters);
  resetBtn.addEventListener("click", resetFilters);
  emptyResetBtn.addEventListener("click", resetFilters);

  // ---- Keyboard shortcuts: "/" focus search, "Esc" clear ----
  document.addEventListener("keydown", (e) => {
    const isTyping = ["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName);
    if (e.key === "/" && !isTyping) {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      searchInput.blur();
      applyFilters();
    }
  });

  // ---- Sticky tabs shadow + back-to-top visibility ----
  function onScroll() {
    const stuck = window.scrollY > 40;
    stickyStack.classList.toggle("is-stuck", stuck);
    backToTop.classList.toggle("show", window.scrollY > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // ---- Init ----
  applyFilters();
  onScroll();
})();
