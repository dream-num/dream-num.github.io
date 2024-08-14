// Doc Data Validator
import { IRule } from "./rules/type";


export class DocDataValidator {
    private _rules: IRule[] = [];

    addRule(rule: IRule) {
        this._rules.push(rule);
    }

    validate(docData: unknown): string[] {
        const results: string[] = [];

        for (const rule of this._rules) {
            const ruleResults = rule.handler(docData);
            results.push(...ruleResults);
        }

        return results;
    }
}
