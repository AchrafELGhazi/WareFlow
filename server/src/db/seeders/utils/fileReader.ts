import fs from 'fs';
import path from 'path';
import { logger } from './logger';

export const readJsonFile = <T>(fileName: string): T[] => {
  try {
    const filePath = path.join(__dirname, '../data', fileName);
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData) as T[];
  } catch (error) {
    logger.error(`Failed to read file: ${fileName}`);
    logger.error((error as Error).message);
    return [];
  }
};
