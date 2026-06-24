/**
 * CSE Report Data — @LochanaKa
 * Data Science • Economics • Markets
 *
 * Keyed by ticker (must match the ticker in companies.js exactly).
 *
 * HOW TO ADD A REPORT:
 * 1. If the ticker isn't a key yet, add it with an array.
 * 2. Push an entry shaped like:
 *      { date: "YYYY-MM-DD", verdict: "buy" | "hold" | "sell" | "watch",
 *        title: "...", summary: "...", url: "https://..." }
 * 3. Reports are sorted newest-first automatically — add them in any order.
 * 4. Once a ticker has its first report here, update that company's
 *    analysisUrl in companies.js from "#" to:
 *      "analysis.html?ticker=TICKER_HERE"
 *    Until you do that, the explorer keeps showing "Analysis Coming Soon"
 *    for that company — which is intentional.
 *
 * verdict colors (already used site-wide, no new colors introduced):
 *   buy   -> teal      hold  -> amber
 *   sell  -> rose       watch -> neutral grey
 */

const REPORTS = {

  // Example — delete this once you add your first real report,
  // or leave it as a reference for the shape of an entry.
  // "JKH.N0000": [
  //   {
  //     date: "2026-06-18",
  //     verdict: "buy",
  //     title: "JKH Q4 FY26 Earnings Review",
  //     summary: "Short 1-2 sentence takeaway shown on the card.",
  //     url: "https://medium.com/@LochanaKa/jkh-q4-fy26"
  //   }
  // ],

  "JKH.N0000": [
    {
      date: "2026-06-18",
      verdict: "hold",
      title: "JKH Full Company Analysis 01",
      summary: "JKH is operationally excellent right now. EBITDA up 75%, record transport volumes, City of Dreams finally profitable. But the Altman Z-Score of 1.29 (deep distress territory) and Rs.266B debt mountain cannot be ignored. At Rs.21.70, the stock isn't cheap (29x P/E) for a company with such leverage risk. Do NOT buy now if you want a margin of safety. Wait for a pullback to Rs.18–19, or wait for clear evidence that debt is being reduced. Long-term holders can stay put the underlying business is transforming.",
      url: "../Analysed-Companies/JKH/JKH-r01.html"
    }
  ],

    "AAIC.N0000": [
    {
      date: "2026-06-18",
      verdict: "buy",
      title: "AAIC Full Company Analysis 01",
      summary: "Sri Lanka's 2nd-largest life insurer by gross written premium, formerly Asian Alliance Insurance, majority-owned by the Softlogic Group. This report walks through the business, the numbers, the risks, and a specific price view",
      url: "../Analysed-Companies/AAIC/AAIC-r01.html"
    }
  ],

    "HDFC.N0000": [
    {
      date: "2026-06-18",
      verdict: "buy",
      title: "HDFC Full Company Analysis 01",
      summary: "Sri Lanka's 2nd-largest life insurer by gross written premium, formerly Asian Alliance Insurance, majority-owned by the Softlogic Group. This report walks through the business, the numbers, the risks, and a specific price view",
      url: "../Analysed-Companies/HDFC/HDFC-r01.html"
    }
  ],

      "OSEA.N0000": [
    {
      date: "2026-06-18",
      verdict: "buy",
      title: "OSEA Full Company Analysis 01",
      summary: "OSEA is a classic <strong>asset play.</strong> you're essentially buying a stake in Colombo's skyline at a discount. If your investment horizon is 3+ years, this is the kind of stock that rewards patience. With limited capital, consider investing in tranches  buy a starter position now, add more if it dips to Rs. 44 or below. Don't put all your money in at once after a 117% rally. And always remember: low free float means sharp swings are possible don't panic sell on volatility.",
      url: "../Analysed-Companies/OSEA/OSEA-r01.html"
    }
  ],















};

// Export for Node.js / build tools
if (typeof module !== "undefined" && module.exports) {
  module.exports = { REPORTS };
}
