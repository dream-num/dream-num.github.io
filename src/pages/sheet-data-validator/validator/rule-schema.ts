import { schema } from "./sheet-data-schema";
import Ajv from "ajv";
import { ISheetRule } from "./type";

const ajv = new Ajv();

// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema);

export const sheetSchemaRule: ISheetRule = {
    name: 'json-schema-validate',
    handler: (sheetData) => {
        if (!validate(sheetData)) {
            return (validate.errors ?? []).map((error) => {
                const instancePath = error.instancePath || "N/A";
                const schemaPath = error.schemaPath || "N/A";
                const keyword = error.keyword || "N/A";
                const message = error.message || "N/A";

                return {
                    instancePath,
                    schemaPath,
                    keyword,
                    message,
                };
            });
        }

        return [];
    },
};
