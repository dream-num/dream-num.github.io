import { useState } from 'react';
import { DocDataValidator } from '../../doc-data-validator/validator';
import { schemaRule } from '../../doc-data-validator/rules/rule-schema';
import { indexValidationRule } from '../../doc-data-validator/rules/rule-index-validate';
import { documentFlavorRule } from '../../doc-data-validator/rules/rule-document-style';
import { useTranslation } from 'react-i18next';

import './index.css';

const validator = new DocDataValidator();

validator.addRule(schemaRule);
validator.addRule(indexValidationRule);
validator.addRule(documentFlavorRule);

export function DocumentDataValidator() {
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
    const { t } = useTranslation();

    return (<div className='doc-data-validator'>
        <h2>{t('docDataModelDataValidator_title')}</h2>
        <p>{t('docDataModelDataValidator_desc')}</p>
        <div className='container'>
            <textarea
                className='data'
                placeholder='Paste your document data here.'
                onChange={handleTextAreaChange}
            ></textarea>
            <button
                className="valid-btn"
                onClick={handleValidate}
            >{t('check_btn')}</button>
            <div className='results'>
                {results.length ?
                    results.map((result, index) => (
                        <p className="error" key={index}>{result}</p>
                    ))
                    : <p className="success">{ hasValidated ? t('check_pass') : t('no_result')}</p>}
            </div>
        </div>
    </div>);
}