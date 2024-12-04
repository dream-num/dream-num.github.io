import { useState } from 'react';

import './index.css';
import Button from '../../components/button/Button';
import { sheetSchemaRule } from './validator/rule-schema';
import { SheetDataValidator } from './validator/validator';

const validator = new SheetDataValidator();

/**
 * Special processing for schema
 * 1. Remove required items
 * 2. cellData/rowData/columnData is an object
 */
validator.addRule(sheetSchemaRule);


export function SpreadsheetDataValidator() {
    const [hasValidated, setHasValidated] = useState(false);
    const [data, setData] = useState('');
    const [results, setResults] = useState<
        { instancePath: string; schemaPath: string; keyword: string; message: string }[]
    >([]);

    function handleValidate() {
        try {
            const jsonData = JSON.parse(data);
            const validationResults = validator.validate(jsonData);
            setResults(validationResults);
            setHasValidated(true);
        } catch (error) {
            setResults([
                {
                    instancePath: "",
                    schemaPath: "",
                    keyword: "",
                    message: `Invalid JSON: ${error}`,
                },
            ]);
        }
    }

    function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setData(event.target.value);
    }

    return (
        <div className="sheet-data-validator">
            <h2>Univer Sheet Data Model Validator</h2>
            <p>
                Paste Sheet Data Model into the input box below (make sure it is a JSON object), and click the Verify button to verify whether the data meets the requirements of{' '}
                <a href="https://univer.ai/typedoc/@univerjs/core/interfaces/IWorkbookData">IWorkbookData</a> (<a href="https://univer.ai/guides/sheet/features/core/sheet-api#getting-workbook-data">How to get IWorkbookData ?</a>)
            </p>

            <div className="container">
                <textarea
                    className="data"
                    placeholder="Paste your spreadsheet data here."
                    onChange={handleTextAreaChange}
                ></textarea>
                <Button btnType="primary" className="valid-btn" onClick={handleValidate}>
                    Verify
                </Button>
                <div className="results">
                    {results.length ? (
                        results.map((result, index) => (
                            <div className="error" key={index}>
                                <p>
                                    <strong>Instance Path:</strong> {result.instancePath}
                                </p>
                                <p>
                                    <strong>Schema Path:</strong> {result.schemaPath}
                                </p>
                                <p>
                                    <strong>Keyword:</strong> {result.keyword}
                                </p>
                                <p>
                                    <strong>Message:</strong> {result.message}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="success">{hasValidated ? 'PASS' : 'No results'}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
