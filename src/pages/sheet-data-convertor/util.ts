import { b64DecodeUnicode, transformSnapshotToWorkbookData } from "@univerjs-pro/collaboration";
import { IDeserializedSheetBlock } from "@univerjs/protocol";

// TODO@Dushusir use real interface after exported from univer
export function transformSnapshotJsonToWorkbookData(json: any){
    const snapshot = json.snapshot;
    const sheetBlocks = json.sheetBlocks;
    const blocks = Object.keys(sheetBlocks).map((blockKey) => sheetBlocks[blockKey]);

    const b64decodedBlocks = blocks.map((block) => {
        return {
            ...block,
            data: block.data ? JSON.parse(b64DecodeUnicode(block.data as unknown as string)) : undefined,
        };
    }) as IDeserializedSheetBlock[];

    return transformSnapshotToWorkbookData(snapshot, b64decodedBlocks);
}