import { chromium } from "playwright-core";
import fs from "node:fs/promises";
import path from "node:path";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDir = path.join(process.cwd(), "verification");

async function getCanvasStats(page) {
  return page.evaluate(async () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      return { ok: false, reason: "No canvas found" };
    }

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const dataUrl = canvas.toDataURL("image/png");
    const image = new Image();
    image.src = dataUrl;
    await image.decode();

    const probe = document.createElement("canvas");
    probe.width = 48;
    probe.height = 48;
    const context = probe.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return { ok: false, reason: "Could not create 2D probe context" };
    }

    context.drawImage(image, 0, 0, probe.width, probe.height);
    const data = context.getImageData(0, 0, probe.width, probe.height).data;
    let litPixels = 0;
    let variance = 0;

    for (let i = 0; i < data.length; i += 4) {
      const brightness = data[i] + data[i + 1] + data[i + 2];
      if (brightness > 18) litPixels += 1;
      variance += Math.abs(data[i] - data[i + 1]) + Math.abs(data[i + 1] - data[i + 2]);
    }

    return {
      ok: litPixels > 80 && variance > 1000,
      width: canvas.width,
      height: canvas.height,
      litPixels,
      variance
    };
  });
}

async function runViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForSelector("canvas", { timeout: 15000 });
  await page.waitForTimeout(1200);
  await page.mouse.move(viewport.width * 0.66, viewport.height * 0.38);
  await page.screenshot({ path: path.join(outputDir, `${name}-hero.png`), fullPage: false });

  const heroStats = await getCanvasStats(page);
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.55, behavior: "instant" }));
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(outputDir, `${name}-scroll.png`), fullPage: false });
  const scrollStats = await getCanvasStats(page);

  await page.close();
  return { name, heroStats, scrollStats, errors };
}

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: edgePath,
  headless: true,
  args: ["--disable-gpu-sandbox", "--ignore-gpu-blocklist"]
});

try {
  const results = [];
  results.push(await runViewport(browser, "desktop", { width: 1440, height: 1000 }));
  results.push(await runViewport(browser, "mobile", { width: 390, height: 844 }));

  await fs.writeFile(path.join(outputDir, "visual-smoke.json"), JSON.stringify(results, null, 2));

  const failed = results.some((result) => {
    return !result.heroStats.ok || !result.scrollStats.ok || result.errors.length > 0;
  });

  if (failed) {
    console.error(JSON.stringify(results, null, 2));
    process.exit(1);
  }

  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
