import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../contents/interview/react");

const API_KEY = "AIzaSyCe0mNniEjdZ7uU3i2A_81eeb4Hbm4fnwg";
const BASE_URL = `https://firestore.googleapis.com/v1/projects/dev-stack-app/databases/(default)/documents/data/answers/react`;

const TOTAL_QUESTIONS = 100;

function fetchDocument(id) {
  const url = `${BASE_URL}/react${id}?key=${API_KEY}`;
  const cmd = `curl -s "${url}" -H "Referer: https://devinterview.io/"`;
  const result = execSync(cmd, { encoding: "utf8", maxBuffer: 1024 * 1024 });
  return JSON.parse(result);
}

function extractField(fields, key) {
  const field = fields[key];
  if (!field) return null;
  if (field.stringValue !== undefined) return field.stringValue;
  if (field.integerValue !== undefined) return parseInt(field.integerValue, 10);
  if (field.booleanValue !== undefined) return field.booleanValue;
  return null;
}

function difficultyLabel(level) {
  switch (level) {
    case 1: return "🟢 Beginner";
    case 2: return "🟡 Intermediate";
    case 3: return "🔴 Advanced";
    default: return "Unknown";
  }
}

function buildMarkdown(q) {
  const title = q.title.replace(/_([^_]+)_/g, "**$1**");

  return `# Q${q.orderNumber}: ${title}

| | |
|---|---|
| **Category** | ${q.group} |
| **Difficulty** | ${difficultyLabel(q.difficulty)} |

---

${q.content}

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
`;
}

function sanitizeFilename(title) {
  return title
    .replace(/_([^_]+)_/g, "$1")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .slice(0, 60)
    .replace(/-+$/, "");
}

function main() {
  console.log("Fetching React interview questions from Firestore...\n");
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const questions = [];

  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
    process.stdout.write(`  Fetching Q${i}... `);
    try {
      const doc = fetchDocument(i);

      if (doc.error) {
        console.log(`skipped (${doc.error.status})`);
        continue;
      }

      const { fields } = doc;
      const q = {
        orderNumber: extractField(fields, "orderNumber"),
        title: extractField(fields, "title"),
        content: extractField(fields, "content"),
        group: extractField(fields, "group"),
        difficulty: extractField(fields, "difficulty"),
        id: extractField(fields, "id"),
      };

      if (!q.title || !q.content) {
        console.log("skipped (missing data)");
        continue;
      }

      questions.push(q);
      console.log(`✓ ${q.title.slice(0, 50)}`);
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  }

  console.log(`\nFetched ${questions.length} questions. Writing files...\n`);

  questions.sort((a, b) => a.orderNumber - b.orderNumber);

  const fileMap = {};
  for (const q of questions) {
    const filename = `${String(q.orderNumber).padStart(3, "0")}-${sanitizeFilename(q.title)}.md`;
    writeFileSync(join(OUTPUT_DIR, filename), buildMarkdown(q), "utf8");
    fileMap[q.orderNumber] = filename;
    console.log(`  ✓ ${filename}`);
  }

  // Build grouped index
  const groupedByCategory = {};
  for (const q of questions) {
    if (!groupedByCategory[q.group]) groupedByCategory[q.group] = [];
    groupedByCategory[q.group].push(q);
  }

  let indexContent = `# React Interview Questions & Answers

> **${questions.length} questions** covering React fundamentals to advanced topics.
> Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)

---

`;

  for (const [category, qs] of Object.entries(groupedByCategory)) {
    indexContent += `## ${category}\n\n`;
    indexContent += `| # | Question | Difficulty |\n|---|---|---|\n`;
    for (const q of qs) {
      const filename = fileMap[q.orderNumber];
      const title = q.title.replace(/_([^_]+)_/g, "**$1**");
      indexContent += `| [Q${q.orderNumber}](./${filename}) | ${title} | ${difficultyLabel(q.difficulty)} |\n`;
    }
    indexContent += "\n";
  }

  writeFileSync(join(OUTPUT_DIR, "index.md"), indexContent, "utf8");

  console.log(`\n  ✓ index.md`);
  console.log(`\nDone! ${questions.length} files + index written to:\n  ${OUTPUT_DIR}`);
}

main();
