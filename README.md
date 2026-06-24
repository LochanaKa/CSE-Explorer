# CSE Company Explorer

![Companies](https://img.shields.io/badge/companies-322-1db99a) ![Sectors](https://img.shields.io/badge/sectors-17-0c3a52) ![Status](https://img.shields.io/badge/status-active-1db99a) ![Built With](https://img.shields.io/badge/built%20with-HTML%20%7C%20CSS%20%7C%20JS-0a1628) ![Hosted On](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-1db99a)

Every company listed on the Colombo Stock Exchange, in one place. Browse by sector, search by name or ticker, and read independent research on individual companies.

Built and maintained by Lochana Karunarathna ([@LochanaKa](https://github.com/LochanaKa)).

**Live site:** https://lochanaka.github.io/CSE-Explorer/
  **Portfolio:** https://lochanaka.github.io/portfolio-website/

---

## By the numbers

| Metric | Count |
|---|---|
| Companies tracked | 322 |
| Currently listed | 289 |
| Merged | 7 |
| Delisted | 26 |
| Sectors covered | 17 |

*Counts reflect the dataset as of the last update to `companies.js`. Update this table when the dataset changes.*

## What it does

- Browse all CSE companies across three categories: Currently Listed, Merged, and Delisted
- See a live sector breakdown for whichever category you're viewing, with counts per sector
- Search by company name or ticker, with matches highlighted inline
- Filter by sector or listed year, and sort alphabetically or by ticker
- Click into a company's analysis page once research is published, showing every report for that company with the newest first
- Fully responsive, with keyboard shortcuts (`/` to search, `Esc` to clear) and a sticky filter bar for fast browsing on mobile

## Tech stack

Plain HTML, CSS, and JavaScript. No frameworks, no build step. Hosted free on GitHub Pages.

## Project structure

```
.
├── index.html              Main explorer page
├── style.css                Global styles (nav, hero, footer, brand tokens)
├── components.css           Component styles (tabs, sector chart, cards, grid)
├── main.js                   Explorer logic (filtering, sorting, search)
├── companies.js              Company dataset
├── Analyse-Doc-Page/
│   ├── analysis.html         Per-company analysis template
│   ├── analysis-style.css    Analysis page styles
│   ├── analysis-main.js       Analysis page logic
│   └── reports-main.js        Report data, keyed by ticker
└── Analysed-Companies/        Individual research report pages
```

## Updating the data

**Adding or editing a company**
Open `companies.js` and add a new entry to the array, or edit an existing one. Sector names must exactly match one of the values in the `SECTORS` list at the top of the file.

**Publishing a research report**
1. Write the report and add it to `reports-main.js` under the company's ticker.
2. Update that company's `analysisUrl` in `companies.js` from `"#"` to `analysis.html?ticker=TICKER_HERE`.

Until step 2 is done, the explorer shows "Analysis Coming Soon" for that company, which is intentional, it keeps the site honest about what's actually been researched.

## Brand

| | Color |
|---|---|
| Navy (background) | `#0a1628` |
| Navy (surface) | `#0c3a52` |
| Teal (accent / listed) | `#1db99a` |
| Amber (merged) | `#f59e0b` |
| Rose (delisted) | `#f43f5e` |

## Disclaimer

This site is for educational purposes only and does not constitute financial advice. Company data is compiled from public CSE listings and may not reflect real-time changes. Verdicts in research reports reflect the author's independent view at time of publication and may change.

## Contact

- Email: lochana.contact@gmail.com

## License

(c) 2026 Lochana Karunarathna. All rights reserved. All research, analysis, and code in this repository are original work; please reach out before reusing.
