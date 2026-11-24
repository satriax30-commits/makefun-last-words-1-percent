// Famous Last Words at 1 Percent — make.fun entry (program/v1)
//
// Task: write the funniest possible one-line farewell a phone says as its
// battery hits 1 percent, to /output/entry.txt (1-199 UTF-8 characters).
//
// The line below was written against the judge's published brief, in order:
//   1. On-subject: first-person last words of a phone at 1% battery.
//   2. Real twist: the phone spent its final charge composing a farewell
//      note instead of calling for help — absurd priorities, surprise turn.
//   3. The phone's own voice, about its own dying battery.
//   4. Tight single line, punch word ("Priorities.") landing last.
//   5. Fresh: no will reading, no goodbye to the charger, no pun on
//      "1 percent" — the 1% is literal, not wordplay.
//
// Deterministic: no clock, no randomness, no network, no input. The same
// line is written on every run, byte for byte.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, the phone's last words at 1% battery.
const LINE =
  "I spent my last 1% writing this instead of calling for help. Priorities.";

// Where the grader expects the artifact. The sandbox mounts /output; allow
// an explicit override for local runs so the same code can be tested here.
function outputDir(): string {
  const override = process.env.OUTPUT_DIR;
  if (override !== undefined && override.trim() !== "") {
    return override;
  }
  return "/output";
}

// The gate, mirrored from RULES.txt: /output/entry.txt must be UTF-8 text
// of 1 to 199 characters, not only white space. A single line by design:
// any newline would break the "one line" the judge is briefed to read.
function validateEntry(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 199) {
    throw new Error(`entry is ${chars} characters, must be 1-199`);
  }
  if (line.trim() === "") {
    throw new Error("entry is only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateEntry(LINE);
  const outDir = outputDir();
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const chars = [...LINE].length;
  const bytes = Buffer.byteLength(LINE, "utf8");
  console.log(`wrote ${target} (${chars} chars, ${bytes} bytes)`);
}

main();
