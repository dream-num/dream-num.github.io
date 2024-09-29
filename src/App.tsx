import { DocumentDataValidator } from "./pages/doc-data-validator/DocDataValidator";

import { Routes, Route } from "react-router-dom";

import "./App.css";
import ToolList from "./components/tool-list/ToolList";
import { SpreadsheetDataValidator } from "./pages/sheet-data-validator/SheetDataValidator";
import ToolLayout from "./components/tool-layout/ToolLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ToolList />} />

      <Route path="tool" element={<ToolLayout />}>
        <Route path="doc-data-validator" element={<DocumentDataValidator />} />
        <Route
          path="sheet-data-validator"
          element={<SpreadsheetDataValidator />}
        />
      </Route>
    </Routes>
  );
}

export default App;
