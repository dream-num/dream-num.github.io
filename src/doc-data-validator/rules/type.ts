export interface IRule {
    name: string;
    handler: (data: unknown) => string[];
}
