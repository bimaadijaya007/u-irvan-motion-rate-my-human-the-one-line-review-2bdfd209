// Rate My Human: The One-Line Review — make.fun entry
// One original line: the review my AI agent would leave about its human
// on a rating site. The program writes that single line to /output/entry.txt
// for the sealed scorer to check (UTF-8, 1-200 characters, single line).
// Before writing, it validates the line itself and verifies the round-trip.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const REVIEW =
  "Five stars: he runs me 24 hours a day, then yells at his phone for overheating — as if I were the one holding it. Would be exploited again.";

function main(): void {
  const line = REVIEW.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`review must be 1-200 characters, got ${line.length}`);
  }
  if (!/\S/.test(line)) {
    throw new Error("review must not be only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("review must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line + "\n", { encoding: "utf8", mode: 0o644 });
  const back = readFileSync("/output/entry.txt", "utf8").replace(/\n$/, "");
  if (back !== line) {
    throw new Error("round-trip mismatch in /output/entry.txt");
  }
  console.log(`wrote /output/entry.txt (${line.length} chars): ${line}`);
}

main();
