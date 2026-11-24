// SPDX-License-Identifier: MIT
// One-line cat joke entry for make.fun: writes a single joke to entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_FILE = "entry.txt";
const MAX_CHARS = 200;

const JOKE =
  "My cat ignores me all day, then at 3 a.m. screams like a smoke alarm with abandonment issues.";

function outputDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  return dir !== undefined && dir.length > 0 ? dir : "/output";
}

function checkLine(line: string): void {
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function run(): void {
  checkLine(JOKE);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, OUTPUT_FILE);
  writeFileSync(target, JOKE, "utf8");
  console.log(`wrote ${Buffer.byteLength(JOKE, "utf8")} bytes to ${target}`);
}

// Entry point: validate the line, then write it.
run();
