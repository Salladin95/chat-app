import path from 'path';
import { promises as fs } from 'fs';

export async function removeFile(filePath?: string) {
  if (filePath) {
    const p = path.resolve(filePath);
    try {
      await fs.access(p);
      await fs.unlink(p);
    } catch (e) {
      console.error(`Failed to remove file: ${p}`);
    }
  }
}
