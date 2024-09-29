import { useState } from 'react';
import { DocDataValidator } from '../../doc-data-validator/validator';

import './index.css';
import Button from '../../components/button/Button';
import { sheetSchemaRule } from './validator/rule-schema';

const validator = new DocDataValidator();


validator.addRule(sheetSchemaRule);

export function SpreadsheetDataValidator() {
    const [hasValidated, setHasValidated] = useState(false);
    const [data, setData] = useState('');
    const [results, setResults] = useState<string[]>([]);

    function handleValidate() {
        try {
            const jsonData = JSON.parse(data);
            const results = validator.validate(jsonData);
            setResults(results);
            setHasValidated(true);
        } catch (error) {
            setResults([`Invalid JSON: ${error}`]);
        }
    }

    function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setData(event.target.value);
    }

    return (<div className='sheet-data-validator'>
        <h2>Univer Sheet Data Model Validator</h2>
        <p>Paste Sheet Data Model into the input box below (make sure it is a JSON object), and click the Verify button to verify whether the data meets the requirements of <a href="https://univer.ai/typedoc/@univerjs/core/interfaces/IWorkbookData">IWorkbookData</a> (<a href="https://univer.ai/guides/sheet/features/core/sheet-api#getting-workbook-data">How to get IWorkbookData ?</a>)</p>
       
        <div className='container'>
            <textarea
                className='data'
                placeholder='Paste your spreadsheet data here.'
                onChange={handleTextAreaChange}
            ></textarea>
            <Button
                btnType='primary'
                className='valid-btn'
                onClick={handleValidate}
            >Verify</Button>
            <div className='results'>
                {results.length ?
                    results.map((result, index) => (
                        <p className="error" key={index}>{result}</p>
                    ))
                    : <p className="success">{ hasValidated ? 'PASS' : 'No results'}</p>}
            </div>
        </div>
    </div>);
}