import { useState } from "react";

import "./index.css";
import Button from "../../components/button/Button";
import { transformSnapshotJsonToWorkbookData } from "./util";
import { transformWorkbookDataToSnapshotJson } from "@univerjs-pro/exchange-client";
import { downloadJSONString } from "../../common/utils/file";

export function SpreadsheetDataConvertor() {
  const [workbookData, setIWorkbookData] = useState("");
  const [snapshot, setSnapshot] = useState("");

  const convertToSnapshot = async () => {
    try {
      const snapshot = await transformWorkbookDataToSnapshotJson(
        JSON.parse(workbookData)
      );
      const converted = JSON.stringify(snapshot, null, 2);
      setSnapshot(converted);
    } catch (error) {
      alert("Invalid JSON input for IWorkbookData");
    }
  };

  const convertToIWorkbookData = () => {
    try {
      const workbookData = transformSnapshotJsonToWorkbookData(
        JSON.parse(snapshot)
      );
      const converted = JSON.stringify(workbookData, null, 2);
      setIWorkbookData(converted);
    } catch (error) {
      alert("Invalid JSON input for Snapshot");
    }
  };

  const downloadWorkbookData = () => {
    if (workbookData === "") {
      return;
    }

    downloadJSONString(workbookData, "workbookData");
  };

  const downloadSnapshot = () => {
    if (snapshot === "") {
      return;
    }

    downloadJSONString(snapshot, "snapshot");
  };

  return (
    <div className="sheet-data-convertor">
      <h2>Univer Sheet Data Format Convertor</h2>
      <p>
        Conversion between{" "}
        <a href="https://univer.ai/typedoc/@univerjs/core/interfaces/IWorkbookData">
          IWorkbookData
        </a>{" "}
        and Snapshot formats. Data in Snapshot format is usually used for
        server-side import interface.
      </p>

      <div className="container">
        <div className="conversion-tool">
          {/* Conversion Tool 1 */}
          <div className="conversion-section">
            <div className="text-area">
              <b>IWorkbookData</b>
              <textarea
                value={workbookData}
                onChange={(e) => setIWorkbookData(e.target.value)}
                placeholder="Enter IWorkbookData JSON"
              />
              <Button btnType="plain-text" onClick={downloadWorkbookData}>
                Download📥
              </Button>
            </div>

            <div className="button-group">
              <Button btnType="default" onClick={convertToSnapshot}>
                Convert➡️
              </Button>
              <Button btnType="default" onClick={convertToIWorkbookData}>
                ⬅️Convert
              </Button>
            </div>

            <div className="text-area">
              <b>Snapshot</b>
              <textarea
                value={snapshot}
                readOnly
                placeholder="Converted Snapshot JSON"
              />
              <Button btnType="plain-text" onClick={downloadSnapshot}>
                Download📥
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
