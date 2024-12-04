import { downloadFile } from "@univerjs-pro/exchange-client";

/**
 * Download file from json string
 * @param json 
 */
export function downloadJSONString(str: string, filename: string = 'data') {

    // Create a Blob object
    const blob = new Blob([str], { type: "application/json" });

    downloadFile(blob, filename, 'json')
}