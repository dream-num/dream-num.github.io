import { DocumentFlavor, IDocumentData } from "@univerjs/core";
import { IRule } from "./type";

export const documentFlavorRule: IRule = {
    name: 'document-flavor-validate',
    handler: (docData) => {
        const results = [];
        const { documentStyle, headers, footers } = docData as IDocumentData;

        if (documentStyle) {
            if (documentStyle.documentFlavor === DocumentFlavor.TRADITIONAL && (headers == null || footers == null)) {
                results.push('> TRADITIONAL Document must has header and footer fields');
            }

            if (documentStyle.documentFlavor === DocumentFlavor.MODERN && (headers != null || footers != null)) {
                results.push('> MODERN Document must not has header and footer fields');
            }
        }

        return results;
    }
}