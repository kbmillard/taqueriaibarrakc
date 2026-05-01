/**
 * One-off: load Menufy order page with system Chrome (Playwright channel).
 * Run: node scripts/scrape-order-menu.mjs
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outMd = path.join(root, "prompt", "taqueria-ibarra-menu-scrape-notes.md");

const URL = "https://www.taqueriaibarrakc.com/order";

async function main() {
  const payloads = [];
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();
  page.on("response", async (res) => {
    const u = res.url();
    if (!/menufy|hungerrush|order|menu|graphql|api/i.test(u)) return;
    const ct = res.headers()["content-type"] || "";
    if (!/json/i.test(ct)) return;
    try {
      const j = await res.json();
      payloads.push({ url: u, keys: j && typeof j === "object" ? Object.keys(j).slice(0, 40) : [] });
      const raw = JSON.stringify(j).slice(0, 50000);
      if (raw.includes("671236") || /category|menuItem|MenuItem|modifiers/i.test(raw)) {
        payloads[payloads.length - 1].sample = raw.slice(0, 12000);
      }
    } catch {
      /* non-json body */
    }
  });

  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(8000);
  const html = await page.content();
  const categoryAnchors = [
    "671236", "671237", "671238", "671239", "741960", "741961", "741959", "671240", "671241", "671242",
  ];
  const foundAnchors = categoryAnchors.filter((id) => html.includes(id));
  const headings = await page
    .locator('[id^="categoryHeading-"], [id*="categoryHeading"]')
    .allTextContents()
    .catch(() => []);

  let domDump = "";
  try {
    domDump = await page.evaluate(() => {
      const out = [];
      const nodes = document.querySelectorAll(
        '[id*="category"], [class*="category"], [data-category], h2, h3, [role="heading"]',
      );
      nodes.forEach((n, i) => {
        if (i > 200) return;
        const id = n.id || "";
        const t = (n.textContent || "").trim().replace(/\s+/g, " ");
        if (t.length > 2 && t.length < 200) out.push({ tag: n.tagName, id, text: t.slice(0, 160) });
      });
      return JSON.stringify(out.slice(0, 120), null, 2);
    });
  } catch (e) {
    domDump = String(e);
  }

  await browser.close();

  const report = [
    "# Taqueria Ibarra order page scrape (automated)",
    "",
    `- **URL:** ${URL}`,
    `- **Time:** ${new Date().toISOString()}`,
    `- **Engine:** Playwright + Chrome channel (system browser)`,
    "",
    "## Network JSON responses (Menufy-related)",
    "",
    "```json",
    JSON.stringify(payloads, null, 2).slice(0, 25000),
    "```",
    "",
    "## Category anchor IDs present in final HTML",
    "",
    `- Expected: ${categoryAnchors.join(", ")}`,
    `- Found in DOM HTML: ${foundAnchors.length ? foundAnchors.join(", ") : "(none)"}`,
    "",
    "## Locator allTextContents for categoryHeading*",
    "",
    "```",
    JSON.stringify(headings, null, 2),
    "```",
    "",
    "## DOM sample (evaluated)",
    "",
    "```json",
    domDump.slice(0, 20000),
    "```",
    "",
  ].join("\n");

  fs.mkdirSync(path.dirname(outMd), { recursive: true });
  fs.writeFileSync(outMd, report);
  console.log("Wrote", outMd);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
