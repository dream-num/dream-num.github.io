import { ISheetRule } from "./type";


export class SheetDataValidator {
    private _rules: ISheetRule[] = [];

    addRule(rule: ISheetRule) {
        this._rules.push(rule);
    }

    validate(docData: unknown): { instancePath: string; schemaPath: string; keyword: string; message: string }[] {
        const results: { instancePath: string; schemaPath: string; keyword: string; message: string }[] = [];

        for (const rule of this._rules) {
            const ruleResults = rule.handler(docData).map((error) => ({
                instancePath: error.instancePath || '',
                schemaPath: error.schemaPath || '',
                keyword: error.keyword || '',
                message: error.message || '',
            }));
            results.push(...ruleResults);
        }

        return results;
    }
}
