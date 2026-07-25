const { existsSync, mkdirSync, writeFileSync } = require("node:fs");
const { dirname, join } = require("node:path");

const runtimeEntry = require.resolve("typescript");
const packageRoot = dirname(dirname(runtimeEntry));
const legacyEntry = join(packageRoot, "lib", "typescript.js");

if (!existsSync(legacyEntry)) {
  mkdirSync(dirname(legacyEntry), { recursive: true });
  writeFileSync(
    legacyEntry,
    '"use strict";\nmodule.exports = require("../dist/typescript.js");\n',
    "utf8",
  );
  console.log("Created the TypeScript 7 compatibility entry required by Next.js 16.");
}
