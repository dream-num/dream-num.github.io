// src/data/tools.ts
import { Tool } from '../types/Tool';

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
  }
];
