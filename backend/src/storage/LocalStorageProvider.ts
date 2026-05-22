import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { IStorageProvider, UploadResult } from './IStorageProvider';

export class LocalStorageProvider implements IStorageProvider {
  private uploadDir: string;
  private baseUrl: string;

  constructor() {
    // Resolve uploads directory relative to backend root (parent of src directory)
    const uploadDirEnv = process.env.UPLOAD_DIR || 'uploads';
    this.uploadDir = uploadDirEnv.startsWith('/')
      ? uploadDirEnv
      : path.resolve(__dirname, '../../', uploadDirEnv);
    this.baseUrl = process.env.UPLOAD_BASE_URL || '/uploads';
  }

  async upload(_filePath: string, file: Express.Multer.File): Promise<UploadResult> {
    const ext = path.extname(file.originalname);
    const fileName = `${crypto.randomUUID()}${ext}`;
    const fullPath = path.join(this.uploadDir, fileName);

    await fs.mkdir(this.uploadDir, { recursive: true });
    await fs.writeFile(fullPath, file.buffer);

    return {
      url: `${this.baseUrl}/${fileName}`,
      fileName,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  async delete(fileName: string): Promise<void> {
    const fullPath = path.join(this.uploadDir, fileName);
    await fs.unlink(fullPath);
  }

  getUrl(fileName: string): string {
    return `${this.baseUrl}/${fileName}`;
  }
}
