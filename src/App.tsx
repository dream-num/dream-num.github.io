import { DocumentDataValidator } from "./pages/doc-data-validator/DocDataValidator";

import { Routes, Route } from "react-router-dom";

import "./App.css";
import ToolList from "./components/tool-list/ToolList";
import { SpreadsheetDataValidator } from "./pages/sheet-data-validator/SheetDataValidator";
import ToolLayout from "./components/tool-layout/ToolLayout";
import { SpreadsheetDataConvertor } from "./pages/sheet-data-convertor/SheetDataConvertor";
import { ResponseDataLoader } from "./pages/response-data-loader/ResponseDataLoader";
import './i18n/config';

// import { useTranslation } from 'react-i18next';


function App() {

  // const { t } = useTranslation();
  // console.log('t',t);
  return (
    <Routes>
      <Route path="/" element={<ToolList />} />

      <Route path="tool" element={<ToolLayout />}>
        <Route path="doc-data-validator" element={<DocumentDataValidator />} />
        <Route
          path="sheet-data-validator"
          element={<SpreadsheetDataValidator />}
        />
        <Route
          path="sheet-data-convertor"
          element={<SpreadsheetDataConvertor />}
        />
        <Route
          path="response-data-loader"
          element={<ResponseDataLoader />}
        />
      </Route>
    </Routes>
  );
}

export default App;
