import { useState } from "react";

import "./index.css";
import Button from "../../components/button/Button";
import { transformSnapshotJsonToWorkbookData } from "./util";
import { transformWorkbookDataToSnapshotJson } from "@univerjs-pro/exchange-client";

export function SpreadsheetDataConvertor() {
  const [iWorkbookData1, setIWorkbookData1] = useState("");
  const [snapshot1, setSnapshot1] = useState("");
  const [snapshot2, setSnapshot2] = useState("");
  const [iWorkbookData2, setIWorkbookData2] = useState("");

  const convertToSnapshot = async () => {
    try {
      const snapshot = await transformWorkbookDataToSnapshotJson(
        JSON.parse(iWorkbookData1)
      );
      const converted = JSON.stringify(snapshot, null, 2);
      setSnapshot1(converted);
    } catch (error) {
      alert("Invalid JSON input for IWorkbookData");
    }
  };

  const convertToIWorkbookData = () => {
    try {
      const workbookData = transformSnapshotJsonToWorkbookData(
        JSON.parse(snapshot2)
      );
      const converted = JSON.stringify(workbookData, null, 2);
      setIWorkbookData2(converted);
    } catch (error) {
      alert("Invalid JSON input for Snapshot");
    }
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
            <textarea
              value={iWorkbookData1}
              onChange={(e) => setIWorkbookData1(e.target.value)}
              placeholder="Enter IWorkbookData JSON"
            />
            <Button btnType="primary" onClick={convertToSnapshot}>
              Convert
            </Button>
            <textarea
              value={snapshot1}
              readOnly
              placeholder="Converted Snapshot JSON"
            />
          </div>

          {/* Conversion Tool 2 */}
          <div className="conversion-section">
            <textarea
              value={snapshot2}
              onChange={(e) => setSnapshot2(e.target.value)}
              placeholder="Enter Snapshot JSON"
            />
            <Button btnType="primary" onClick={convertToIWorkbookData}>
              Convert
            </Button>
            <textarea
              value={iWorkbookData2}
              readOnly
              placeholder="Converted IWorkbookData JSON"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
