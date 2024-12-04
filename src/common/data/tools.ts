// src/data/tools.ts
import { Tool } from '../../types/Tool';

export const tools: Tool[] = [
  {
    id: '1',
    name: 'Univer Doc Data Validator',
    description: 'Verify whether the Doc data meets the requirements.',
    emoji: '📝',
    path: '/tool/doc-data-validator',
  },
  {
    id: '2',
    name: 'Univer Sheet Data Validator',
    description: 'Verify whether the Sheet data meets the requirements.',
    emoji: '📊',
    path: '/tool/sheet-data-validator',
  },
  {
    id: '3',
    name: 'Univer Sheet Data Converter',
    description: 'Format conversion between IWorkbookData and Snapshot.',
    emoji: '🔄',
    path: '/tool/sheet-data-convertor',
  },
  {
    id: '4',
    name: 'Response Data Loader',
    description: 'Load snapshot and block in collaborative response into Univer.',
    emoji: '⏳',
    path: '/tool/response-data-loader',
  },
];
