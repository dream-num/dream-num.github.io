import { IRule } from "../../../doc-data-validator/rules/type";
import { schema } from "./sheet-data-schema";
import Ajv from "ajv";
const ajv = new Ajv();

// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema);

export const sheetSchemaRule: IRule = {
    name: 'json-schema-validate',
    handler: (sheetData) => {
        if (!validate(sheetData)) {
            return (validate.errors ?? [])
                .filter(e => typeof e.message === 'string')
                .map(e => `> ${e.message!}`);
        }

        return [];
    }
}