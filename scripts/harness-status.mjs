import fs from "node:fs";
import { execFileSync } from "node:child_process";

function sh(cmd, args = []) {
  try {
    return execFileSync(cmd, args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    return "UNAVAILABLE";
  }
}

function exists(path) {
  return fs.existsSync(path) ? "yes" : "no";
}

let pkg = {};
try {
  pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
} catch {}

const head = sh("git", ["rev-parse", "--short", "HEAD"]);
const branch = sh("git", ["branch", "--show-current"]);
const status = sh("git", ["status", "--short"]);
const nextVersion =
  pkg?.dependencies?.next ??
  pkg?.devDependencies?.next ??
  "unknown";

console.log("HARNESS STATUS");
console.log(`branch: ${branch}`);
console.log(`head: ${head}`);
console.log(`next: ${nextVersion}`);
console.log(`agents: ${exists("AGENTS.md")}`);
console.log(`handoff: ${exists("docs/harness/HANDOFF.md")}`);
console.log(`audit: ${exists("docs/harness/AUDIT.md")}`);
console.log(`changelog: ${exists("docs/harness/CHANGELOG.md")}`);
console.log(`working_tree: ${status ? "dirty" : "clean"}`);

if (status) {
  console.log("changed_files:");
  for (const line of status.split(/\r?\n/).slice(0, 30)) {
    console.log(`  ${line}`);
  }
  if (status.split(/\r?\n/).length > 30) {
    console.log("  ...truncated");
  }
}

const scripts = pkg?.scripts ?? {};
const interesting = [
  "verify",
  "build",
  "verify:static",
  "deploy:audit",
  "gallery:audit",
  "memory:audit",
  "harness:status",
];
console.log("known_scripts:");
for (const name of interesting) {
  if (scripts[name]) console.log(`  ${name}: ${scripts[name]}`);
}
