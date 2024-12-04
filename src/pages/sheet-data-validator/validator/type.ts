export interface IErrorResult { 
    instancePath: string; 
    schemaPath: string; 
    keyword: string; 
    message: string
}


export interface ISheetRule {
    name: string;
    handler: (data: unknown) => IErrorResult[];
}


