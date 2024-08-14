import { useState } from 'react';
import { DocDataValidator } from '../../doc-data-validator/validator';
import { schemaRule } from '../../doc-data-validator/rules/rule-schema';
import { indexValidationRule } from '../../doc-data-validator/rules/rule-index-validate';
import { documentFlavorRule } from '../../doc-data-validator/rules/rule-document-style';

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
        console.log(event.target.value);
        setData(event.target.value);
    }

    return (<div className='doc-data-validator'>
        <h2>Univer Doc Data Model 数据验证器</h2>
        <p>将 Doc Data Model 黏贴到下面输入框（保证是 JSON 对象），点击验证按钮，即可验证数据是否符合要求</p>
        <div className='container'>
            <textarea
                className='data'
                placeholder='Paste your document data here.'
                onChange={handleTextAreaChange}
            ></textarea>
            <button
                className="valid-btn"
                onClick={handleValidate}
            >验证</button>
            <div className='results'>
                {results.length ?
                    results.map((result, index) => (
                        <p className="error" key={index}>{result}</p>
                    ))
                    : <p>{ hasValidated ? '验证通过' : '无结果'}</p>}
            </div>
        </div>
    </div>);
}