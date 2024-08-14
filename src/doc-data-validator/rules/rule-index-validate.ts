import { DataStreamTreeTokenType, ICustomBlock, ICustomRange, ICustomTable, IDocumentData, IParagraph, ISectionBreak } from "@univerjs/core";
import { IRule } from "./type";

function getParagraphsAndSectionErrors(
    dataStream: string,
    paragraphs: IParagraph[],
    sectionBreaks: ISectionBreak[],
    customBlocks: ICustomBlock[] = [],
    tables: ICustomTable[] = [],
    customRanges: ICustomRange[] = [],
): string[] {
    const results = [];
    let paraCount = 0;
    let sectionBreak = 0;
    let customBlockCount = 0;
    let tableCount = 0;
    let customRangeCount = 0;
    

    const wrongParagraphIndexes = [];
    const wrongSectionBreakIndexes = [];
    const wrongCustomBlockIndexes = [];
    const wrongCustomTableIndexes = [];
    const wrongCustomRangeIndexes = [];

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

        if (char === '\b') {
            customBlockCount++;
            const customBlock = customBlocks?.find(c => c.startIndex === i);

            if (customBlock == null) {
                wrongCustomBlockIndexes.push(i);
            }
        }

        if (char === DataStreamTreeTokenType.TABLE_START) {
            tableCount++;
            const table = tables.find(t => t.startIndex === i);

            if (table == null) {
                wrongCustomTableIndexes.push(i);
            } else {
                const { endIndex } = table;
                const endChar = dataStream[endIndex];

                if (endChar !== DataStreamTreeTokenType.TABLE_END) {
                    wrongCustomTableIndexes.push(endIndex);
                }
            }
        }

        if (char === DataStreamTreeTokenType.CUSTOM_RANGE_START) {
            customRangeCount++;

            const customRange = customRanges.find(r => r.startIndex === i);

            if (customRange == null) {
                wrongCustomRangeIndexes.push(i);
            } else {
                const { endIndex } = customRange;
                const endChar = dataStream[endIndex];

                if (endChar !== DataStreamTreeTokenType.CUSTOM_RANGE_END) {
                    wrongCustomRangeIndexes.push(endIndex);
                }
            }
        }
    }

    if (wrongParagraphIndexes.length) {
        results.push(`> The following paragraph indexes do not match \\r in dataStream: ${wrongParagraphIndexes.join(', ')}`);
    }

    if (paraCount !== paragraphs.length) {
        results.push(`> The number of paragraphs in the paragraphs field does not match the number of \\r in dataStream.`);
    }

    if (wrongSectionBreakIndexes.length) {
        results.push(`> The following section break indexes do not match \\n in dataStream: ${wrongSectionBreakIndexes.join(', ')}`);
    }

    if (sectionBreak !== sectionBreaks.length) {
        results.push(`> The number of section breaks in the sectionBreaks field does not match the number of \\n in dataStream`);
    }

    if (wrongCustomBlockIndexes.length) {
        results.push(`> The following custom block indexes do not match \\b in dataStream: ${wrongCustomBlockIndexes.join(', ')}`);
    }

    if (customBlockCount !== customBlocks.length) {
        results.push('> The number of custom blocks in customBlocks field does not match the number of \\b in dataStream');
    }

    if (wrongCustomTableIndexes.length) {
        results.push(`> The following table indexes do not match in dataStream: ${wrongCustomTableIndexes.join(', ')}`);
    }

    if (tableCount !== tables.length) {
        results.push('> the number of custom tables in tables field does not match the number of table in dataStream');
    }

    if (wrongCustomRangeIndexes.length) {
        results.push(`> The following custom range indexes do not match range in dataStream: ${wrongCustomRangeIndexes.join(', ')}`);
    }

    if (customBlockCount !== customRanges.length) {
        results.push('> the number of custom ranges in customRanges field does not match the number of custom range in dataStream');
    }

    if (!dataStream.endsWith('\r\n')) {
        results.push('> dataStream does not end with \\r\\n');
    }

    return results;
}

export const indexValidationRule: IRule = {
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

        if (errorInBody.length) {
            results.push('Error in body field.');
            results.push(...errorInBody);
        }

        if (headers != null) {
            for (const key of Object.keys(headers)) {
                const { body } = headers[key];
                const { paragraphs = [], sectionBreaks = [], dataStream = '' } = body;
                const errorInHeader = getParagraphsAndSectionErrors(dataStream, paragraphs, sectionBreaks);

                if (errorInHeader.length) {
                    results.push(`Error in header: ${key}`);
                    results.push(...errorInHeader);
                }
            }
        }

        if (footers != null) {
            for (const key of Object.keys(footers)) {
                const { body } = footers[key];
                const { paragraphs = [], sectionBreaks = [], dataStream = '' } = body;
                const errorInFooter = getParagraphsAndSectionErrors(dataStream, paragraphs, sectionBreaks);

                if (errorInFooter.length) {
                    results.push(`Error in header: ${key}`);
                    results.push(...errorInFooter);
                }
            }
        }

        return results;
    }
}