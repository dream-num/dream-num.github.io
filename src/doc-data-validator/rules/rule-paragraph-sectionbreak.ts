import { IDocumentData, IParagraph, ISectionBreak } from "@univerjs/core";
import { IRule } from "./type";

function getParagraphsAndSectionErrors(dataStream: string, paragraphs: IParagraph[], sectionBreaks: ISectionBreak[]): string[] {
    const results = [];
    let paraCount = 0;
    let sectionBreak = 0;

    const wrongParagraphIndexes = [];
    const wrongSectionBreakIndexes = [];

    for (let i = 0; i < dataStream.length; i++) {
        const char = dataStream[i];

        if (char === '\r') {
            paraCount++;
            const para = paragraphs.find(p => p.startIndex === i);

            if (para == null) {
                wrongParagraphIndexes.push(i);
            }
        }

        if (char === '\n') {
            sectionBreak++;
            const section = sectionBreaks.find(s => s.startIndex === i);

            if (section == null) {
                wrongSectionBreakIndexes.push(i);
            }
        }
    }

    if (wrongParagraphIndexes.length) {
        results.push(`The following paragraph indexes do not match the number of \\r in dataStream: ${wrongParagraphIndexes.join(', ')}`);
    }

    if (wrongSectionBreakIndexes.length) {
        results.push(`The following section break indexes do not match the number of \\n in dataStream: ${wrongSectionBreakIndexes.join(', ')}`);
    }

    if (paraCount !== paragraphs.length) {
        results.push(`The number of paragraphs in the paragraphs field does not match the number of \\r in dataStream.`);
    }

    if (sectionBreak !== sectionBreaks.length) {
        results.push(`The number of section breaks in the sectionBreaks field does not match the number of \\n in dataStream`);
    }

    return results;
}

export const paragraphSectionBreakRule: IRule = {
    name: 'paragraph-section-break-validate',
    handler: (docData) => {
        const results: string[] = [];
        const { body, headers, footers } = docData as IDocumentData;

        if (body == null) {
            results.push('body is not defined');

            return results;
        }

        const { paragraphs = [], sectionBreaks = [], dataStream = '' } = body;
        
        const errorInBody = getParagraphsAndSectionErrors(dataStream, paragraphs, sectionBreaks);

        results.push(...errorInBody);

        return results;
    }
}