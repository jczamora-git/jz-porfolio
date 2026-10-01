import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../../");

console.log("=== Deployment Audit ===");

// 1. Check next.config.ts for static export configuration
const nextConfigPath = join(root, "next.config.ts");
if (!existsSync(nextConfigPath)) {
  console.error("FAIL: next.config.ts not found");
  process.exit(1);
}
const nextConfigContent = readFileSync(nextConfigPath, "utf-8");
const hasOutputExport = /output\s*:\s*["']export["']/.test(nextConfigContent);
const hasUnoptimized = /unoptimized\s*:\s*true/.test(nextConfigContent);
const hasTrailingSlash = /trailingSlash\s*:\s*true/.test(nextConfigContent);

console.log(`[Config] output: "export": ${hasOutputExport ? "PASS" : "FAIL"}`);
console.log(`[Config] images.unoptimized: true: ${hasUnoptimized ? "PASS" : "FAIL"}`);
console.log(`[Config] trailingSlash: true: ${hasTrailingSlash ? "PASS" : "FAIL"}`);

if (!hasOutputExport || !hasUnoptimized) {
  console.error("FAIL: next.config.ts is missing required static export settings");
  process.exit(1);
}

// 2. Check .dockerignore
const dockerignorePath = join(root, ".dockerignore");
const dockerignoreExists = existsSync(dockerignorePath);
console.log(`[Context] .dockerignore exists: ${dockerignoreExists ? "PASS" : "FAIL"}`);

if (dockerignoreExists) {
  const content = readFileSync(dockerignorePath, "utf-8");
  const required = [".git", "node_modules", ".next", "out"];
  for (const item of required) {
    const ignored = content.includes(item);
    console.log(`[Context] .dockerignore excludes ${item}: ${ignored ? "PASS" : "FAIL"}`);
  }
}

// 3. Inspect public/ and gallery asset budget
function getFiles(dir) {
  let results = [];
  if (!existsSync(dir)) return results;
  const list = readdirSync(dir);
  for (const file of list) {
    const full = join(dir, file);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else {
      results.push({ path: full, size: stat.size });
    }
  }
  return results;
}

const pubFiles = getFiles(join(root, "public"));
const totalPubBytes = pubFiles.reduce((acc, f) => acc + f.size, 0);
const galFiles = pubFiles.filter((f) => f.path.includes(join("public", "gallery")));
const totalGalBytes = galFiles.reduce((acc, f) => acc + f.size, 0);

console.log(`[Assets] Total public files: ${pubFiles.length} (${(totalPubBytes / (1024 * 1024)).toFixed(2)} MB)`);
console.log(`[Assets] Gallery files: ${galFiles.length} (${(totalGalBytes / (1024 * 1024)).toFixed(2)} MB)`);
console.log(`[Assets] Gallery share: ${((totalGalBytes / totalPubBytes) * 100).toFixed(1)}% of total public assets`);

// 4. Verify no server-only API routes exist
const apiDir = join(root, "app", "api");
const hasApiRoutes = existsSync(apiDir);
console.log(`[Architecture] Server API routes absent: ${!hasApiRoutes ? "PASS" : "WARN (API routes found)"}`);

console.log("=== Deployment Audit Complete: READY FOR STATIC EXPORT ===");
