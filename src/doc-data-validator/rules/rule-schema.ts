import { schema } from "../doc-data-schema";
import Ajv from "ajv";
import { IRule } from "./type";

const ajv = new Ajv();

// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema);

export const schemaRule: IRule = {
    name: 'json-schema-validate',
    handler: (docData) => {
        if (!validate(docData)) {
            return (validate.errors ?? [])
                .filter(e => typeof e.message === 'string')
                .map(e => `> ${e.instancePath} ${e.message!}`);
        }

        return [];
    }
}