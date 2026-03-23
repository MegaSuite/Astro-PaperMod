import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT_DIR, "src", "data", "blog");
const TEMPLATE_PATH = path.join(ROOT_DIR, "src", "data", "template", "posts.md");
const CONFIG_PATH = path.join(ROOT_DIR, "src", "config.ts");

function pad(value) {
  return String(value).padStart(2, "0");
}

function getTimezoneOffsetString(date) {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absolute = Math.abs(offsetMinutes);
  const hours = pad(Math.floor(absolute / 60));
  const minutes = pad(absolute % 60);

  return `${sign}${hours}:${minutes}`;
}

function getPubDatetime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const date = pad(now.getDate());
  const hour = pad(now.getHours());
  const minute = pad(now.getMinutes());
  const second = pad(now.getSeconds());
  const timezone = getTimezoneOffsetString(now);

  return `${year}-${month}-${date}T${hour}:${minute}:${second}.000${timezone}`;
}

function usage() {
  console.error('Usage: npm run new "<filename|subdir/filename>.md"');
}

async function getSiteAuthor() {
  const configContent = await readFile(CONFIG_PATH, "utf8");
  const match = configContent.match(/\bauthor\s*:\s*(["'])(.*?)\1\s*,?/);

  if (!match) {
    throw new Error("Cannot find SITE.author in src/config.ts");
  }

  return match[2];
}

async function main() {
  const targetArg = process.argv[2];

  if (!targetArg) {
    usage();
    process.exit(1);
  }

  const normalizedInput = targetArg.replace(/\\/g, "/").replace(/^\/+/, "");
  const relativeTargetPath = path.normalize(normalizedInput);

  if (path.isAbsolute(relativeTargetPath) || relativeTargetPath.startsWith("..")) {
    console.error("Invalid target path. Please provide a path inside src/data/blog.");
    process.exit(1);
  }

  const outputPath = path.join(BLOG_DIR, relativeTargetPath);
  const outputDir = path.dirname(outputPath);
  const siteAuthor = await getSiteAuthor();

  const template = await readFile(TEMPLATE_PATH, "utf8");
  const content = template
    .replace(/^pubDatetime:[^\r\n]*$/m, `pubDatetime: ${getPubDatetime()}`)
    .replace(/^modDatetime:[^\r\n]*$/m, "modDatetime: ")
    .replace(/^author:[^\r\n]*$/m, `author: ${siteAuthor}`);

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, content, { flag: "wx" });

  console.log(`Created: ${path.relative(ROOT_DIR, outputPath).replace(/\\/g, "/")}`);
}

main().catch(error => {
  if (error && error.code === "EEXIST") {
    console.error("Target file already exists.");
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});
