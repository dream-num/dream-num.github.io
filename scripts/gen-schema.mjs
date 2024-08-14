import { resolve } from "path";
import fs from 'fs';

import * as TJS from "typescript-json-schema";

// optionally pass argument to schema generator
const settings = {
    required: true,
};

// optionally pass ts compiler options
const compilerOptions = {
    strictNullChecks: true,
};

// optionally pass a base path
const basePath = "./my-dir";

const program = TJS.getProgramFromFiles(
  [resolve("node_modules/@univerjs/core/lib/types/types/interfaces/i-document-data.d.ts")],
  compilerOptions,
  basePath
);

// We can either get the schema for one file and one type...
const schema = TJS.generateSchema(program, "IDocumentData", settings);

fs.writeFileSync("./src/doc-data-validator/doc-data-schema.ts", `export const schema = ${JSON.stringify(schema, null, 2)}`);
