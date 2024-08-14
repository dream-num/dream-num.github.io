export const schema = {
  "description": "Properties of document",
  "type": "object",
  "properties": {
    "id": {
      "description": "unit ID",
      "type": "string"
    },
    "rev": {
      "description": "Revision of this document. Would be used in collaborated editing. Starts with zero.",
      "type": "number"
    },
    "locale": {
      "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
      "enum": [
        "enUS",
        "ruRU",
        "viVN",
        "zhCN",
        "zhTW"
      ],
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "body": {
      "description": "Properties of document body\nContain three update types: range overlay, range mutual exclusion, and placeholder\n\\v COLUMN_BREAK\n\\f PAGE_BREAK\n\\0 DOCS_END\n\\t TAB\n\nNeeds to be changed：\n\\r PARAGRAPH\n\\n SECTION_BREAK\n\n\\b customBlock: Scenarios where customBlock, images, mentions, etc. do not participate in the document flow.\n\nTable\n\\x1A table start\n\\x1B table row start\n\\x1C table cell start\n\\x1D table cell end\n\\x1E table row end\n\\x1F table end\n\nSpecial ranges within the document flow:：hyperlinks，field，structured document tags， bookmark，comment\n\\x1F customRange start\n\\x1E customRange end",
      "$ref": "#/definitions/IDocumentBody"
    },
    "documentStyle": {
      "$ref": "#/definitions/IDocumentStyle"
    },
    "settings": {
      "$ref": "#/definitions/IDocumentSettings"
    },
    "resources": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "data": {
            "type": "string"
          }
        },
        "required": [
          "data",
          "name"
        ]
      }
    },
    "disabled": {
      "type": "boolean"
    },
    "tableSource": {
      "$ref": "#/definitions/ITables"
    },
    "footers": {
      "description": "Set of footer",
      "$ref": "#/definitions/IFooters"
    },
    "headers": {
      "description": "Set of headers",
      "$ref": "#/definitions/IHeaders"
    },
    "lists": {
      "description": "Set of lists",
      "$ref": "#/definitions/ILists"
    },
    "drawings": {
      "description": "Set of Drawings",
      "$ref": "#/definitions/IDrawings"
    },
    "drawingsOrder": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "headerFooterDrawingsOrder": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "shouldStartRenderingImmediately": {
      "description": "should start renderLoop Immediately\ndefault is true",
      "type": "boolean"
    },
    "container": {
      "description": "HTML selector\ndefault is null",
      "type": "string"
    }
  },
  "required": [
    "documentStyle",
    "id"
  ],
  "definitions": {
    "IDocumentBody": {
      "description": "Properties of document body\nContain three update types: range overlay, range mutual exclusion, and placeholder\n\\v COLUMN_BREAK\n\\f PAGE_BREAK\n\\0 DOCS_END\n\\t TAB\n\nNeeds to be changed：\n\\r PARAGRAPH\n\\n SECTION_BREAK\n\n\\b customBlock: Scenarios where customBlock, images, mentions, etc. do not participate in the document flow.\n\nTable\n\\x1A table start\n\\x1B table row start\n\\x1C table cell start\n\\x1D table cell end\n\\x1E table row end\n\\x1F table end\n\nSpecial ranges within the document flow:：hyperlinks，field，structured document tags， bookmark，comment\n\\x1F customRange start\n\\x1E customRange end",
      "type": "object",
      "properties": {
        "dataStream": {
          "type": "string"
        },
        "textRuns": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ITextRun"
          }
        },
        "paragraphs": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/IParagraph"
          }
        },
        "sectionBreaks": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ISectionBreak"
          }
        },
        "customBlocks": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ICustomBlock"
          }
        },
        "tables": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ICustomTable"
          }
        },
        "customRanges": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ICustomRange"
          }
        },
        "customDecorations": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ICustomDecoration"
          }
        },
        "payloads": {
          "description": "for copy/paste, data of custom-range and other module\nit won't save to disk",
          "$ref": "#/definitions/Record<string,string>"
        }
      },
      "required": [
        "dataStream"
      ]
    },
    "ITextRun": {
      "description": "A ParagraphElement that represents a run of text that all has the same styling.",
      "type": "object",
      "properties": {
        "st": {
          "type": "number"
        },
        "ed": {
          "type": "number"
        },
        "sId": {
          "type": "string"
        },
        "ts": {
          "description": "Properties of text style",
          "$ref": "#/definitions/ITextStyle"
        }
      },
      "required": [
        "ed",
        "st"
      ]
    },
    "ITextStyle": {
      "description": "Properties of text style",
      "type": "object",
      "properties": {
        "sc": {
          "type": "number"
        },
        "pos": {
          "type": "number"
        },
        "sa": {
          "type": "number"
        },
        "ff": {
          "$ref": "#/definitions/Nullable<string>",
          "description": "fontFamily"
        },
        "fs": {
          "description": "fontSize\n\npt",
          "type": "number"
        },
        "it": {
          "description": "italic\n0: false\n1: true",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "bl": {
          "description": "bold\n0: false\n1: true",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "ul": {
          "description": "underline",
          "$ref": "#/definitions/ITextDecoration"
        },
        "bbl": {
          "description": "bottomBorerLine",
          "$ref": "#/definitions/ITextDecoration"
        },
        "st": {
          "description": "strikethrough",
          "$ref": "#/definitions/ITextDecoration"
        },
        "ol": {
          "description": "overline",
          "$ref": "#/definitions/ITextDecoration"
        },
        "bg": {
          "$ref": "#/definitions/Nullable<IColorStyle>",
          "description": "background"
        },
        "bd": {
          "$ref": "#/definitions/Nullable<IBorderData>",
          "description": "border"
        },
        "cl": {
          "$ref": "#/definitions/Nullable<IColorStyle>",
          "description": "foreground"
        },
        "va": {
          "$ref": "#/definitions/Nullable<BaselineOffset>",
          "description": "(Subscript 下标 /Superscript上标 Text)"
        },
        "n": {
          "$ref": "#/definitions/Nullable<{pattern:string;}>",
          "description": "Numfmt pattern"
        }
      }
    },
    "Nullable<string>": {
      "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
      "type": [
        "null",
        "string"
      ]
    },
    "ITextDecoration": {
      "description": "Properties of text decoration",
      "type": "object",
      "properties": {
        "s": {
          "$ref": "#/definitions/BooleanNumber"
        },
        "c": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "cl": {
          "description": "RGB color or theme color",
          "$ref": "#/definitions/IColorStyle"
        },
        "t": {
          "description": "Types of text decoration",
          "enum": [
            0,
            1,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
          ],
          "type": "number"
        }
      },
      "required": [
        "s"
      ]
    },
    "BooleanNumber": {
      "description": "General Boolean Enum",
      "type": "number",
      "enum": [
        0,
        1
      ]
    },
    "IColorStyle": {
      "description": "RGB color or theme color",
      "type": "object",
      "properties": {
        "rgb": {
          "$ref": "#/definitions/Nullable<string>"
        },
        "th": {
          "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
          "enum": [
            0,
            1,
            10,
            11,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
          ],
          "type": "number"
        }
      }
    },
    "Nullable<IColorStyle>": {
      "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
      "anyOf": [
        {
          "$ref": "#/definitions/IColorStyle"
        },
        {
          "type": "null"
        }
      ]
    },
    "Nullable<IBorderData>": {
      "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
      "anyOf": [
        {
          "$ref": "#/definitions/IBorderData"
        },
        {
          "type": "null"
        }
      ]
    },
    "IBorderData": {
      "description": "Style properties of top, bottom, left and right border\n\nTLBR = 'tlbr', //START_TOP_LEFT_END_BOTTOM_RIGHT\nTLBC = 'tlbc', // START_TOP_LEFT_END_BOTTOM_CENTER\n\nTLMR = 'tlmr', // START_TOP_LEFT_END_MIDDLE_RIGHT\n\nBLTR = 'bltr', // START_BOTTOM_LEFT_END_TOP_RIGHT\n\nMLTR = 'mltr', // START_MIDDLE_LEFT_END_TOP_RIGHT\n\nBCTR = 'bctr', // START_BOTTOM_CENTER_END_TOP_RIGHT",
      "type": "object",
      "properties": {
        "t": {
          "$ref": "#/definitions/Nullable<IBorderStyleData>"
        },
        "r": {
          "$ref": "#/definitions/Nullable<IBorderStyleData>"
        },
        "b": {
          "$ref": "#/definitions/Nullable<IBorderStyleData>"
        },
        "l": {
          "$ref": "#/definitions/Nullable<IBorderStyleData>"
        },
        "tl_br": {
          "$ref": "#/definitions/Nullable<IBorderStyleData>"
        },
        "tl_bc": {
          "$ref": "#/definitions/Nullable<IBorderStyleData>"
        },
        "tl_mr": {
          "$ref": "#/definitions/Nullable<IBorderStyleData>"
        },
        "bl_tr": {
          "$ref": "#/definitions/Nullable<IBorderStyleData>"
        },
        "ml_tr": {
          "$ref": "#/definitions/Nullable<IBorderStyleData>"
        },
        "bc_tr": {
          "$ref": "#/definitions/Nullable<IBorderStyleData>"
        }
      }
    },
    "Nullable<IBorderStyleData>": {
      "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
      "anyOf": [
        {
          "$ref": "#/definitions/IBorderStyleData"
        },
        {
          "type": "null"
        }
      ]
    },
    "IBorderStyleData": {
      "description": "Style properties of border",
      "type": "object",
      "properties": {
        "s": {
          "$ref": "#/definitions/BorderStyleTypes"
        },
        "cl": {
          "$ref": "#/definitions/IColorStyle"
        }
      },
      "required": [
        "cl",
        "s"
      ]
    },
    "BorderStyleTypes": {
      "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
      "type": "number",
      "enum": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13
      ]
    },
    "Nullable<BaselineOffset>": {
      "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
      "anyOf": [
        {
          "enum": [
            1,
            2,
            3
          ],
          "type": "number"
        },
        {
          "type": "null"
        }
      ]
    },
    "Nullable<{pattern:string;}>": {
      "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "pattern": {
              "type": "string"
            }
          },
          "required": [
            "pattern"
          ]
        },
        {
          "type": "null"
        }
      ]
    },
    "IParagraph": {
      "type": "object",
      "properties": {
        "startIndex": {
          "type": "number"
        },
        "paragraphStyle": {
          "description": "Properties of paragraph style",
          "$ref": "#/definitions/IParagraphStyle"
        },
        "bullet": {
          "description": "Properties of list",
          "$ref": "#/definitions/IBullet"
        }
      },
      "required": [
        "startIndex"
      ]
    },
    "IParagraphStyle": {
      "description": "Properties of paragraph style",
      "type": "object",
      "properties": {
        "textStyle": {
          "description": "Properties of text style",
          "$ref": "#/definitions/ITextStyle"
        },
        "headingId": {
          "type": "string"
        },
        "namedStyleType": {
          "description": "Types of name style",
          "enum": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
          ],
          "type": "number"
        },
        "horizontalAlign": {
          "description": "An enum that specifies the horizontal alignment of text.",
          "enum": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "type": "number"
        },
        "lineSpacing": {
          "type": "number"
        },
        "direction": {
          "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
          "enum": [
            0,
            1,
            2
          ],
          "type": "number"
        },
        "spacingRule": {
          "enum": [
            0,
            1,
            2
          ],
          "type": "number"
        },
        "snapToGrid": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "spaceAbove": {
          "$ref": "#/definitions/INumberUnit"
        },
        "spaceBelow": {
          "$ref": "#/definitions/INumberUnit"
        },
        "borderBetween": {
          "description": "Properties of paragraph border",
          "$ref": "#/definitions/IParagraphBorder"
        },
        "borderTop": {
          "description": "Properties of paragraph border",
          "$ref": "#/definitions/IParagraphBorder"
        },
        "borderBottom": {
          "description": "Properties of paragraph border",
          "$ref": "#/definitions/IParagraphBorder"
        },
        "borderLeft": {
          "description": "Properties of paragraph border",
          "$ref": "#/definitions/IParagraphBorder"
        },
        "borderRight": {
          "description": "Properties of paragraph border",
          "$ref": "#/definitions/IParagraphBorder"
        },
        "keepLines": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "keepNext": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "wordWrap": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "widowControl": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "shading": {
          "description": "Properties of shading",
          "$ref": "#/definitions/IShading"
        },
        "suppressHyphenation": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "indentFirstLine": {
          "$ref": "#/definitions/INumberUnit"
        },
        "hanging": {
          "$ref": "#/definitions/INumberUnit"
        },
        "indentStart": {
          "$ref": "#/definitions/INumberUnit"
        },
        "tabStops": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ITabStop"
          }
        },
        "indentEnd": {
          "$ref": "#/definitions/INumberUnit"
        }
      }
    },
    "INumberUnit": {
      "type": "object",
      "properties": {
        "v": {
          "type": "number"
        },
        "u": {
          "enum": [
            0,
            1,
            2,
            3,
            4
          ],
          "type": "number"
        }
      },
      "required": [
        "v"
      ]
    },
    "IParagraphBorder": {
      "description": "Properties of paragraph border",
      "type": "object",
      "properties": {
        "padding": {
          "type": "number"
        },
        "color": {
          "$ref": "#/definitions/IColorStyle"
        },
        "width": {
          "type": "number"
        },
        "dashStyle": {
          "$ref": "#/definitions/DashStyleType"
        }
      },
      "required": [
        "color",
        "dashStyle",
        "padding",
        "width"
      ]
    },
    "DashStyleType": {
      "description": "The kinds of dashes with which linear geometry can be rendered.",
      "type": "number",
      "enum": [
        0,
        1,
        2,
        3
      ]
    },
    "IShading": {
      "description": "Properties of shading",
      "type": "object",
      "properties": {
        "backgroundColor": {
          "$ref": "#/definitions/IColorStyle"
        }
      },
      "required": [
        "backgroundColor"
      ]
    },
    "ITabStop": {
      "description": "A tab stop within a paragraph.",
      "type": "object",
      "properties": {
        "offset": {
          "type": "number"
        },
        "alignment": {
          "$ref": "#/definitions/TabStopAlignment"
        }
      },
      "required": [
        "alignment",
        "offset"
      ]
    },
    "TabStopAlignment": {
      "description": "The alignment of the tab stop.",
      "type": "number",
      "enum": [
        0,
        1,
        2,
        3
      ]
    },
    "IBullet": {
      "description": "Properties of list",
      "type": "object",
      "properties": {
        "listType": {
          "type": "string"
        },
        "listId": {
          "type": "string"
        },
        "nestingLevel": {
          "type": "number"
        },
        "textStyle": {
          "description": "Properties of text style",
          "$ref": "#/definitions/ITextStyle"
        }
      },
      "required": [
        "listId",
        "listType",
        "nestingLevel"
      ]
    },
    "ISectionBreak": {
      "description": "Properties of section break",
      "type": "object",
      "properties": {
        "startIndex": {
          "type": "number"
        },
        "pageNumberStart": {
          "type": "number"
        },
        "pageSize": {
          "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
          "$ref": "#/definitions/ISize"
        },
        "pageOrient": {
          "description": "Paper orientation, whether it's portrait (vertical) or landscape (horizontal)",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "documentFlavor": {
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "marginHeader": {
          "type": "number"
        },
        "marginFooter": {
          "type": "number"
        },
        "renderConfig": {
          "description": "the alignment mode is returned with respect to the offset of the sheet cell,\nbecause the document needs to render the layout for cells and\nsupport alignment across multiple cells (e.g., horizontal alignment of long text in overflow mode).\nThe alignment mode of the document itself cannot meet this requirement,\nso an additional renderConfig needs to be added during the rendering of the document component.\nThis means that there are two coexisting alignment modes.\nIn certain cases, such as in an editor, conflicts may arise,\nrequiring only one alignment mode to be retained.\nBy removing the relevant configurations in renderConfig,\nthe alignment mode of the sheet cell can be modified.\nThe alternative alignment mode is applied to paragraphs within the document.",
          "$ref": "#/definitions/IDocumentRenderConfig"
        },
        "marginTop": {
          "type": "number"
        },
        "marginBottom": {
          "type": "number"
        },
        "marginRight": {
          "type": "number"
        },
        "marginLeft": {
          "type": "number"
        },
        "charSpace": {
          "type": "number"
        },
        "linePitch": {
          "type": "number"
        },
        "gridType": {
          "enum": [
            0,
            1,
            2,
            3
          ],
          "type": "number"
        },
        "columnProperties": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ISectionColumnProperties"
          }
        },
        "columnSeparatorType": {
          "description": "The style of column separators between columns.",
          "enum": [
            0,
            1,
            2
          ],
          "type": "number"
        },
        "contentDirection": {
          "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
          "enum": [
            0,
            1,
            2
          ],
          "type": "number"
        },
        "sectionType": {
          "description": "Represents how the start of the current section is positioned relative to the previous section.",
          "enum": [
            0,
            1,
            2,
            3,
            4
          ],
          "type": "number"
        },
        "sectionTypeNext": {
          "description": "Represents how the start of the current section is positioned relative to the previous section.",
          "enum": [
            0,
            1,
            2,
            3,
            4
          ],
          "type": "number"
        },
        "textDirection": {
          "description": "Direction of text",
          "enum": [
            0,
            1,
            2
          ],
          "type": "number"
        },
        "defaultHeaderId": {
          "type": "string"
        },
        "defaultFooterId": {
          "type": "string"
        },
        "evenPageHeaderId": {
          "type": "string"
        },
        "evenPageFooterId": {
          "type": "string"
        },
        "firstPageHeaderId": {
          "type": "string"
        },
        "firstPageFooterId": {
          "type": "string"
        },
        "useFirstPageHeaderFooter": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "evenAndOddHeaders": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        }
      },
      "required": [
        "startIndex"
      ]
    },
    "ISize": {
      "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
      "type": "object",
      "properties": {
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        }
      }
    },
    "IDocumentRenderConfig": {
      "description": "the alignment mode is returned with respect to the offset of the sheet cell,\nbecause the document needs to render the layout for cells and\nsupport alignment across multiple cells (e.g., horizontal alignment of long text in overflow mode).\nThe alignment mode of the document itself cannot meet this requirement,\nso an additional renderConfig needs to be added during the rendering of the document component.\nThis means that there are two coexisting alignment modes.\nIn certain cases, such as in an editor, conflicts may arise,\nrequiring only one alignment mode to be retained.\nBy removing the relevant configurations in renderConfig,\nthe alignment mode of the sheet cell can be modified.\nThe alternative alignment mode is applied to paragraphs within the document.",
      "type": "object",
      "properties": {
        "verticalAlign": {
          "description": "An enum that specifies the vertical alignment of text.",
          "enum": [
            0,
            1,
            2,
            3
          ],
          "type": "number"
        },
        "centerAngle": {
          "type": "number"
        },
        "vertexAngle": {
          "type": "number"
        },
        "horizontalAlign": {
          "description": "An enum that specifies the horizontal alignment of text.",
          "enum": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "type": "number"
        },
        "isRotateNonEastAsian": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "background": {
          "description": "RGB color or theme color",
          "$ref": "#/definitions/IColorStyle"
        },
        "wrapStrategy": {
          "description": "An enumeration of the strategies used to handle cell text wrapping.",
          "enum": [
            0,
            1,
            2,
            3
          ],
          "type": "number"
        },
        "cellValueType": {
          "description": "General Boolean Enum",
          "enum": [
            1,
            2,
            3,
            4
          ],
          "type": "number"
        },
        "isRenderStyle": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        }
      }
    },
    "ISectionColumnProperties": {
      "description": "Properties of section column",
      "type": "object",
      "properties": {
        "width": {
          "type": "number"
        },
        "paddingEnd": {
          "type": "number"
        }
      },
      "required": [
        "paddingEnd",
        "width"
      ]
    },
    "ICustomBlock": {
      "description": "Custom Block",
      "type": "object",
      "properties": {
        "startIndex": {
          "type": "number"
        },
        "blockType": {
          "description": "Type of block",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "blockId": {
          "type": "string"
        }
      },
      "required": [
        "blockId",
        "startIndex"
      ]
    },
    "ICustomTable": {
      "type": "object",
      "properties": {
        "startIndex": {
          "type": "number"
        },
        "endIndex": {
          "type": "number"
        },
        "tableId": {
          "type": "string"
        }
      },
      "required": [
        "endIndex",
        "startIndex",
        "tableId"
      ]
    },
    "ICustomRange": {
      "type": "object",
      "properties": {
        "startIndex": {
          "type": "number"
        },
        "endIndex": {
          "type": "number"
        },
        "rangeId": {
          "type": "string"
        },
        "rangeType": {
          "$ref": "#/definitions/CustomRangeType"
        },
        "wholeEntity": {
          "description": "display as a whole-entity",
          "type": "boolean"
        }
      },
      "required": [
        "endIndex",
        "rangeId",
        "rangeType",
        "startIndex"
      ]
    },
    "CustomRangeType": {
      "type": "number",
      "enum": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ]
    },
    "ICustomDecoration": {
      "type": "object",
      "properties": {
        "startIndex": {
          "type": "number"
        },
        "endIndex": {
          "type": "number"
        },
        "id": {
          "type": "string"
        },
        "type": {
          "$ref": "#/definitions/CustomDecorationType"
        }
      },
      "required": [
        "endIndex",
        "id",
        "startIndex",
        "type"
      ]
    },
    "CustomDecorationType": {
      "type": "number",
      "const": 0
    },
    "Record<string,string>": {
      "type": "object"
    },
    "IDocumentStyle": {
      "type": "object",
      "properties": {
        "textStyle": {
          "description": "Properties of text style",
          "$ref": "#/definitions/ITextStyle"
        },
        "pageNumberStart": {
          "type": "number"
        },
        "pageSize": {
          "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
          "$ref": "#/definitions/ISize"
        },
        "pageOrient": {
          "description": "Paper orientation, whether it's portrait (vertical) or landscape (horizontal)",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "documentFlavor": {
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "marginHeader": {
          "type": "number"
        },
        "marginFooter": {
          "type": "number"
        },
        "renderConfig": {
          "description": "the alignment mode is returned with respect to the offset of the sheet cell,\nbecause the document needs to render the layout for cells and\nsupport alignment across multiple cells (e.g., horizontal alignment of long text in overflow mode).\nThe alignment mode of the document itself cannot meet this requirement,\nso an additional renderConfig needs to be added during the rendering of the document component.\nThis means that there are two coexisting alignment modes.\nIn certain cases, such as in an editor, conflicts may arise,\nrequiring only one alignment mode to be retained.\nBy removing the relevant configurations in renderConfig,\nthe alignment mode of the sheet cell can be modified.\nThe alternative alignment mode is applied to paragraphs within the document.",
          "$ref": "#/definitions/IDocumentRenderConfig"
        },
        "marginTop": {
          "type": "number"
        },
        "marginBottom": {
          "type": "number"
        },
        "marginRight": {
          "type": "number"
        },
        "marginLeft": {
          "type": "number"
        },
        "defaultTabStop": {
          "type": "number"
        },
        "characterSpacingControl": {
          "enum": [
            0,
            1,
            2
          ],
          "type": "number"
        },
        "paragraphLineGapDefault": {
          "type": "number"
        },
        "spaceWidthEastAsian": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "autoHyphenation": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "consecutiveHyphenLimit": {
          "type": "number"
        },
        "doNotHyphenateCaps": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "hyphenationZone": {
          "type": "number"
        },
        "defaultHeaderId": {
          "type": "string"
        },
        "defaultFooterId": {
          "type": "string"
        },
        "evenPageHeaderId": {
          "type": "string"
        },
        "evenPageFooterId": {
          "type": "string"
        },
        "firstPageHeaderId": {
          "type": "string"
        },
        "firstPageFooterId": {
          "type": "string"
        },
        "useFirstPageHeaderFooter": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "evenAndOddHeaders": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        }
      }
    },
    "IDocumentSettings": {
      "type": "object",
      "properties": {
        "zoomRatio": {
          "type": "number"
        }
      }
    },
    "ITables": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/ITable"
      }
    },
    "ITable": {
      "description": "Properties of table",
      "type": "object",
      "properties": {
        "tableRows": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ITableRow"
          }
        },
        "tableColumns": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ITableColumn"
          }
        },
        "align": {
          "$ref": "#/definitions/TableAlignmentType"
        },
        "indent": {
          "$ref": "#/definitions/INumberUnit"
        },
        "textWrap": {
          "$ref": "#/definitions/TableTextWrapType"
        },
        "position": {
          "$ref": "#/definitions/ITableAnchor"
        },
        "dist": {
          "$ref": "#/definitions/IDistFromText"
        },
        "size": {
          "$ref": "#/definitions/IWidthInTableSize"
        },
        "tableId": {
          "type": "string"
        },
        "cellMargin": {
          "$ref": "#/definitions/ITableCellMargin"
        },
        "layout": {
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "overlap": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "align",
        "dist",
        "indent",
        "position",
        "size",
        "tableColumns",
        "tableId",
        "tableRows",
        "textWrap"
      ]
    },
    "ITableRow": {
      "description": "Properties of row of table",
      "type": "object",
      "properties": {
        "tableCells": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ITableCell"
          }
        },
        "trHeight": {
          "$ref": "#/definitions/ITableRowSize"
        },
        "cantSplit": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "isFirstRow": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "repeatHeaderRow": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        }
      },
      "required": [
        "tableCells",
        "trHeight"
      ]
    },
    "ITableCell": {
      "description": "Properties of table cell",
      "type": "object",
      "properties": {
        "margin": {
          "$ref": "#/definitions/ITableCellMargin"
        },
        "rowSpan": {
          "type": "number"
        },
        "columnSpan": {
          "type": "number"
        },
        "backgroundColor": {
          "description": "RGB color or theme color",
          "$ref": "#/definitions/IColorStyle"
        },
        "borderLeft": {
          "description": "Properties of cell border",
          "$ref": "#/definitions/ITableCellBorder"
        },
        "borderRight": {
          "description": "Properties of cell border",
          "$ref": "#/definitions/ITableCellBorder"
        },
        "borderTop": {
          "description": "Properties of cell border",
          "$ref": "#/definitions/ITableCellBorder"
        },
        "borderBottom": {
          "description": "Properties of cell border",
          "$ref": "#/definitions/ITableCellBorder"
        },
        "size": {
          "$ref": "#/definitions/IWidthInTableSize"
        },
        "tcFitText": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "vAlign": {
          "description": "The content alignments for a Shape or TableCell. The supported alignments correspond to predefined text anchoring types from the ECMA-376 standard.",
          "enum": [
            0,
            1,
            2,
            3,
            4
          ],
          "type": "number"
        }
      }
    },
    "ITableCellMargin": {
      "type": "object",
      "properties": {
        "start": {
          "$ref": "#/definitions/INumberUnit"
        },
        "end": {
          "$ref": "#/definitions/INumberUnit"
        },
        "top": {
          "$ref": "#/definitions/INumberUnit"
        },
        "bottom": {
          "$ref": "#/definitions/INumberUnit"
        }
      },
      "required": [
        "bottom",
        "end",
        "start",
        "top"
      ]
    },
    "ITableCellBorder": {
      "description": "Properties of cell border",
      "type": "object",
      "properties": {
        "color": {
          "$ref": "#/definitions/IColorStyle"
        },
        "width": {
          "$ref": "#/definitions/INumberUnit"
        },
        "dashStyle": {
          "$ref": "#/definitions/DashStyleType"
        }
      },
      "required": [
        "color",
        "dashStyle",
        "width"
      ]
    },
    "IWidthInTableSize": {
      "type": "object",
      "properties": {
        "type": {
          "$ref": "#/definitions/TableSizeType"
        },
        "width": {
          "$ref": "#/definitions/INumberUnit"
        }
      },
      "required": [
        "type",
        "width"
      ]
    },
    "TableSizeType": {
      "type": "number",
      "enum": [
        0,
        1
      ]
    },
    "ITableRowSize": {
      "type": "object",
      "properties": {
        "val": {
          "$ref": "#/definitions/INumberUnit"
        },
        "hRule": {
          "$ref": "#/definitions/TableCellHeightRule"
        }
      },
      "required": [
        "hRule",
        "val"
      ]
    },
    "TableCellHeightRule": {
      "type": "number",
      "enum": [
        0,
        1,
        2
      ]
    },
    "ITableColumn": {
      "type": "object",
      "properties": {
        "size": {
          "$ref": "#/definitions/IWidthInTableSize"
        }
      },
      "required": [
        "size"
      ]
    },
    "TableAlignmentType": {
      "type": "number",
      "enum": [
        0,
        1,
        2
      ]
    },
    "TableTextWrapType": {
      "type": "number",
      "enum": [
        0,
        1
      ]
    },
    "ITableAnchor": {
      "type": "object",
      "properties": {
        "positionH": {
          "$ref": "#/definitions/IObjectPositionH"
        },
        "positionV": {
          "$ref": "#/definitions/IObjectPositionV"
        }
      },
      "required": [
        "positionH",
        "positionV"
      ]
    },
    "IObjectPositionH": {
      "type": "object",
      "properties": {
        "relativeFrom": {
          "$ref": "#/definitions/ObjectRelativeFromH"
        },
        "align": {
          "enum": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "type": "number"
        },
        "posOffset": {
          "type": "number"
        },
        "percent": {
          "type": "number"
        }
      },
      "required": [
        "relativeFrom"
      ]
    },
    "ObjectRelativeFromH": {
      "type": "number",
      "enum": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ]
    },
    "IObjectPositionV": {
      "type": "object",
      "properties": {
        "relativeFrom": {
          "$ref": "#/definitions/ObjectRelativeFromV"
        },
        "align": {
          "enum": [
            0,
            1,
            2,
            3,
            4
          ],
          "type": "number"
        },
        "posOffset": {
          "type": "number"
        },
        "percent": {
          "type": "number"
        }
      },
      "required": [
        "relativeFrom"
      ]
    },
    "ObjectRelativeFromV": {
      "type": "number",
      "enum": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ]
    },
    "IDistFromText": {
      "type": "object",
      "properties": {
        "distT": {
          "type": "number"
        },
        "distB": {
          "type": "number"
        },
        "distL": {
          "type": "number"
        },
        "distR": {
          "type": "number"
        }
      },
      "required": [
        "distB",
        "distL",
        "distR",
        "distT"
      ]
    },
    "IFooters": {
      "description": "Set of footer",
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/IFooterData"
      }
    },
    "IFooterData": {
      "description": "Properties of doc footer",
      "type": "object",
      "properties": {
        "footerId": {
          "type": "string"
        },
        "body": {
          "$ref": "#/definitions/IDocumentBody"
        }
      },
      "required": [
        "body",
        "footerId"
      ]
    },
    "IHeaders": {
      "description": "Set of headers",
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/IHeaderData"
      }
    },
    "IHeaderData": {
      "description": "Properties of doc header",
      "type": "object",
      "properties": {
        "headerId": {
          "type": "string"
        },
        "body": {
          "$ref": "#/definitions/IDocumentBody"
        }
      },
      "required": [
        "body",
        "headerId"
      ]
    },
    "ILists": {
      "description": "Set of lists",
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/IListData"
      }
    },
    "IListData": {
      "description": "The properties of a list which describe the look and feel of bullets belonging to paragraphs associated with a list.",
      "type": "object",
      "properties": {
        "listType": {
          "type": "string"
        },
        "nestingLevel": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/INestingLevel"
          }
        }
      },
      "required": [
        "listType",
        "nestingLevel"
      ]
    },
    "INestingLevel": {
      "description": "Contains properties describing the look and feel of a list bullet at a given level of nesting.",
      "type": "object",
      "properties": {
        "paragraphProperties": {
          "description": "Properties of paragraph style",
          "$ref": "#/definitions/IParagraphStyle"
        },
        "paragraphTextStyle": {
          "description": "Properties of text style",
          "$ref": "#/definitions/ITextStyle"
        },
        "bulletAlignment": {
          "$ref": "#/definitions/BulletAlignment"
        },
        "glyphFormat": {
          "type": "string"
        },
        "textStyle": {
          "description": "Properties of text style",
          "$ref": "#/definitions/ITextStyle"
        },
        "startNumber": {
          "type": "number"
        },
        "glyphType": {
          "description": "An enumeration of the supported glyph types.",
          "enum": [
            0,
            1,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            2,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            3,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            4,
            40,
            41,
            42,
            43,
            44,
            45,
            46,
            47,
            48,
            49,
            5,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            58,
            59,
            6,
            60,
            7,
            8,
            9
          ],
          "type": "number"
        },
        "glyphSymbol": {
          "type": "string"
        }
      },
      "required": [
        "bulletAlignment",
        "glyphFormat",
        "startNumber"
      ]
    },
    "BulletAlignment": {
      "description": "The types of alignment for a bullet.",
      "type": "number",
      "enum": [
        0,
        1,
        2,
        3,
        4
      ]
    },
    "IDrawings": {
      "description": "Set of Drawings",
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/IDocDrawingBase"
      }
    },
    "IDocDrawingBase": {
      "description": "Properties of Drawing\n20.4.2.8 inline (Inline DrawingML Object)\n20.4.2.15 wrapNone (No Text Wrapping)\n20.4.2.16 wrapPolygon (Wrapping Polygon)\n20.4.2.17 wrapSquare (Square Wrapping)\n20.4.2.18 wrapThrough (Through Wrapping)\n20.4.2.19 wrapTight (Tight Wrapping)\n20.4.2.20 wrapTopAndBottom (Top and Bottom Wrapping)",
      "type": "object",
      "properties": {
        "drawingId": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "docTransform": {
          "$ref": "#/definitions/IDocDrawingPosition"
        },
        "layoutType": {
          "$ref": "#/definitions/PositionedObjectLayoutType"
        },
        "behindDoc": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "start": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "lineTo": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "number"
            }
          }
        },
        "wrapText": {
          "description": "Types of wrap text",
          "enum": [
            0,
            1,
            2,
            3
          ],
          "type": "number"
        },
        "distL": {
          "type": "number"
        },
        "distR": {
          "type": "number"
        },
        "distT": {
          "type": "number"
        },
        "distB": {
          "type": "number"
        },
        "drawingType": {
          "type": "number"
        },
        "transform": {
          "$ref": "#/definitions/Nullable<ITransformState>"
        },
        "transforms": {
          "$ref": "#/definitions/Nullable<ITransformState[]>"
        },
        "isMultiTransform": {
          "description": "General Boolean Enum",
          "enum": [
            0,
            1
          ],
          "type": "number"
        },
        "groupId": {
          "type": "string"
        },
        "unitId": {
          "type": "string"
        },
        "subUnitId": {
          "type": "string"
        }
      },
      "required": [
        "description",
        "docTransform",
        "drawingId",
        "drawingType",
        "layoutType",
        "subUnitId",
        "title",
        "unitId"
      ]
    },
    "IDocDrawingPosition": {
      "description": "Properties of a draw object",
      "type": "object",
      "properties": {
        "size": {
          "$ref": "#/definitions/ISize"
        },
        "positionH": {
          "$ref": "#/definitions/IObjectPositionH"
        },
        "positionV": {
          "$ref": "#/definitions/IObjectPositionV"
        },
        "angle": {
          "type": "number"
        }
      },
      "required": [
        "angle",
        "positionH",
        "positionV",
        "size"
      ]
    },
    "PositionedObjectLayoutType": {
      "description": "The possible layouts of a [PositionedObject]",
      "type": "number",
      "enum": [
        0,
        1,
        2,
        3,
        4,
        5,
        6
      ]
    },
    "Nullable<ITransformState>": {
      "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
      "anyOf": [
        {
          "$ref": "#/definitions/ITransformState"
        },
        {
          "type": "null"
        }
      ]
    },
    "ITransformState": {
      "type": "object",
      "properties": {
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        },
        "left": {
          "type": "number"
        },
        "top": {
          "type": "number"
        },
        "scaleX": {
          "type": "number"
        },
        "scaleY": {
          "type": "number"
        },
        "angle": {
          "type": "number"
        },
        "skewX": {
          "type": "number"
        },
        "skewY": {
          "type": "number"
        },
        "flipX": {
          "type": "boolean"
        },
        "flipY": {
          "type": "boolean"
        }
      }
    },
    "Nullable<ITransformState[]>": {
      "description": "Copyright 2023-present DreamNum Inc.\n\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.",
      "anyOf": [
        {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ITransformState"
          }
        },
        {
          "type": "null"
        }
      ]
    }
  },
  "$schema": "http://json-schema.org/draft-07/schema#"
}