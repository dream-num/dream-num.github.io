import { useEffect, useRef, useState } from "react";
import { createUniver, defaultTheme, FUniver, LocaleType, Tools } from '@univerjs/presets'
import sheetsConditionalFormattingEnUS from '@univerjs/presets/preset-sheets-conditional-formatting/locales/en-US'
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core'
import sheetsCoreEnUS from '@univerjs/presets/preset-sheets-core/locales/en-US'
import sheetsDataValidationEnUS from '@univerjs/presets/preset-sheets-data-validation/locales/en-US'
import sheetsDrawingEnUS from '@univerjs/presets/preset-sheets-drawing/locales/en-US'
import sheetsFilterEnUS from '@univerjs/presets/preset-sheets-filter/locales/en-US'
import sheetsHyperLinkEnUS from '@univerjs/presets/preset-sheets-hyper-link/locales/en-US'
import '@univerjs/presets/lib/styles/preset-sheets-core.css'
import "./index.css";
import { downloadJSONString } from "../../common/utils/file";
import Button from "../../components/button/Button";

export function ResponseDataLoader() {
  const [workbookData, setIWorkbookData] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const univerAPI = useRef<FUniver | null>(null);

  const init = (data = {}) => {
    if (!containerRef.current) {
      throw Error("container not initialized");
    }

    const { univerAPI: univerAPICurrent } = createUniver({
      locale: LocaleType.EN_US,
      locales: {
        enUS: Tools.deepMerge(
          {},
          sheetsCoreEnUS,
          sheetsConditionalFormattingEnUS,
          sheetsDataValidationEnUS,
          sheetsDrawingEnUS,
          sheetsFilterEnUS,
          sheetsHyperLinkEnUS,
        ),
      },
      theme: defaultTheme,
      presets: [
        UniverSheetsCorePreset({
          container: containerRef.current,
        }),
      ],
    })
    
    univerAPICurrent.createUniverSheet(data)
    univerAPI.current = univerAPICurrent
  };

  const destroyUniver = () => {
    // univerRef.current?.dispose();
    const unitId = univerAPI.current?.getActiveWorkbook()?.getId();

    if (!unitId) {
      return;
    }

    univerAPI.current?.disposeUnit(unitId);
    univerAPI.current = null;
  };

  useEffect(() => {
    init();
    return () => {
      destroyUniver();
    };
  }, []);

  const downloadWorkbookData = () => {
    if (workbookData === "") {
      return;
    }

    downloadJSONString(workbookData, "workbookData");
  };

  const loadData = () => {
    
  }

  return (
    <div className="sheet-data-convertor">
      <h2>Collaborative Response Data Loader [👨‍💻TODO。。。]</h2>
      <p>
        Load the snapshot and block data obtained in the collaborative request
        into Univer to obtain a complete{" "}
        <a href="https://univer.ai/typedoc/@univerjs/core/interfaces/IWorkbookData">
          IWorkbookData
        </a>
        .
      </p>
      <p>
        Get snapshot interface: universer-api/workspace/2/unit/[unitID]/rev/0
      </p>
      <p>
        Get block interface:
        /universer-api/snapshot/block/2/unit/[unitID]/block/[blockID]
      </p>

    <div className="operate-area">
      <div>
        <label htmlFor="">Snapshot <input type="file" accept=".json, .txt"/></label>
      </div>
      <div>
        <label htmlFor="">Block Data (Multiple) <input type="file" accept=".json, .txt" multiple/></label>
      </div>
      <div>
        <Button btnType="primary" onClick={loadData}>Load</Button>
      </div>
    </div>

      <div className="container">
        <div className="conversion-tool">
          {/* Conversion Tool 1 */}
          <div className="conversion-section">
            <div className="text-area">
              <b>Univer</b>
              <div ref={containerRef} className="univer-container"></div>
            </div>

            <div className="text-area">
              <b>IWorkbookData</b>
              <textarea
                value={workbookData}
                readOnly
                placeholder="Converted Snapshot JSON"
              />
              <Button btnType="plain-text" onClick={downloadWorkbookData}>
                Download📥
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
