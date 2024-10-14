import { promises as fs } from 'fs';

export async function removeFile(filePath?: string) {
  try {
    if (filePath) {
      await fs.unlink(filePath);
      await fs.unlink(filePath);
    }
  } catch (e) {
    console.error(`Failed to remove file: ${filePath}`);
    throw e;
  }
}
