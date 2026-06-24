/**
 * Company Analysis Page — Logic
 * @LochanaKa — Data Science • Economics • Markets
 *
 * Reads ?ticker= from the URL, looks up the company in companies.js,
 * looks up its reports in reports.js, themes the page to match the
 * company's status (listed/merged/delisted), and renders everything.
 */

(() => {
  const companyHeaderEl = document.getElementById("companyHeader");
  const reportsAreaEl   = document.getElementById("reportsArea");
  const reportsCountEl  = document.getElementById("reportsCount");
  const yearEl          = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const verdictLabel = { buy: "Buy", hold: "Hold", sell: "Sell", watch: "Watch" };

  const arrowIcon = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = String(s);
    return d.innerHTML;
  }
  function escAttr(s) { return String(s).replace(/"/g, "&quot;"); }

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  function getTickerFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("ticker");
  }

  function renderMissingState() {
    companyHeaderEl.innerHTML = `
      <h1 class="ch-name">Company not found</h1>
      <p class="ch-sector">Check the link — the ticker in the URL doesn't match companies.js.</p>
    `;
    reportsAreaEl.innerHTML = "";
  }

  function renderHeader(company) {
    document.body.classList.add(`theme--${company.status}`);

    let note = "";
    if (company.status === "merged" && company.mergedInto) {
      note = `<div class="ch-note"><strong>Merged into</strong>${esc(company.mergedInto)}</div>`;
    } else if (company.status === "delisted" && company.delistedNote) {
      note = `<div class="ch-note"><strong>Delisted</strong>${esc(company.delistedNote)}</div>`;
    }

    const statusText = company.status.charAt(0).toUpperCase() + company.status.slice(1);

    companyHeaderEl.innerHTML = `
      <div class="ch-top">
        <span class="ch-ticker">${esc(company.ticker)}</span>
        <span class="status-pill"><span class="dot"></span>${statusText}</span>
      </div>
      <h1 class="ch-name">${esc(company.name)}</h1>
      <span class="ch-sector">${esc(company.sector)}</span>
      ${note}
    `;
  }

  function renderReports(reports) {
    const sorted = reports.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    reportsCountEl.textContent = sorted.length
      ? `${sorted.length} report${sorted.length > 1 ? "s" : ""}`
      : "";

    if (!sorted.length) {
      reportsAreaEl.innerHTML = `
        <div class="empty-state">
          <p>No analysis published yet</p>
          <p>Check back soon — this company is in the research queue.</p>
        </div>`;
      return;
    }

    reportsAreaEl.innerHTML = `<div class="report-list">${sorted.map((r, i) => `
      <article class="report-card">
        <div class="rc-top">
          <span class="rc-date">${formatDate(r.date)}</span>
          ${i === 0 ? '<span class="rc-latest">Latest</span>' : ""}
          <span class="verdict verdict--${esc(r.verdict)}">${esc(verdictLabel[r.verdict] || r.verdict)}</span>
        </div>
        <h3 class="rc-title">${esc(r.title)}</h3>
        <p class="rc-summary">${esc(r.summary)}</p>
        <a class="rc-link" href="${escAttr(r.url)}" target="_blank" rel="noopener">Read Full Report ${arrowIcon}</a>
      </article>
    `).join("")}</div>`;
  }

  // ---- Init ----
  const ticker = getTickerFromUrl();
  const company = ticker ? COMPANIES.find(c => c.ticker === ticker) : null;

  if (!company) {
    renderMissingState();
    return;
  }

  renderHeader(company);
  renderReports(REPORTS[ticker] || []);
})();
