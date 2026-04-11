import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { getCurrentIsoDatetimeWithOffset } from "./datetime.mjs";

const BLOG_DIR = "src/data/blog/";
const SUPPORTED_EXTENSIONS = /\.(md|mdx)$/i;

function getStagedModifiedFiles() {
  const output = execFileSync("git", ["diff", "--cached", "--name-status", "--diff-filter=M"], {
    encoding: "utf8",
  }).trim();

  if (!output) return [];

  return output
    .split(/\r?\n/)
    .map(line => {
      const [status, ...rest] = line.split("\t");
      return { status, file: rest.join("\t").replace(/\\/g, "/") };
    })
    .filter(item => item.status === "M")
    .map(item => item.file)
    .filter(file => file.startsWith(BLOG_DIR) && SUPPORTED_EXTENSIONS.test(file));
}

function updateModDatetime(filePath, datetime) {
  const raw = readFileSync(filePath, "utf8");

  if (!raw.startsWith("---")) return false;

  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = raw.match(frontmatterPattern);

  if (!match) return false;

  const frontmatter = match[1];
  const nextFrontmatter = /^modDatetime:[^\r\n]*$/m.test(frontmatter)
    ? frontmatter.replace(/^modDatetime:[^\r\n]*$/m, `modDatetime: ${datetime}`)
    : `${frontmatter}${eol}modDatetime: ${datetime}`;

  const nextRaw = raw.replace(frontmatterPattern, `---${eol}${nextFrontmatter}${eol}---`);

  if (nextRaw === raw) return false;

  writeFileSync(filePath, nextRaw, "utf8");
  execFileSync("git", ["add", "--", filePath]);
  return true;
}

function main() {
  const files = getStagedModifiedFiles();

  if (files.length === 0) return;

  const datetime = getCurrentIsoDatetimeWithOffset();
  let updatedCount = 0;

  for (const file of files) {
    if (updateModDatetime(file, datetime)) {
      updatedCount += 1;
      console.log(`Updated modDatetime: ${file}`);
    }
  }

  if (updatedCount > 0) {
    console.log(`Updated modDatetime for ${updatedCount} modified post(s).`);
  }
}

try {
  main();
} catch (error) {
  console.error("Failed to update modDatetime in pre-commit.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
