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
  [resolve("node_modules/@univerjs/core/lib/types/sheets/typedef.d.ts")],
  compilerOptions,
  basePath
);

// We can either get the schema for one file and one type...
const schema = TJS.generateSchema(program, "IWorkbookData", settings);

fs.writeFileSync("./src/pages/sheet-data-validator/validator/sheet-data-schema.ts", `export const schema = ${JSON.stringify(schema, null, 2)}`);
