export interface UploadResult {
  url: string;
  fileName: string;
  size: number;
  mimeType: string;
}

export interface IStorageProvider {
  upload(filePath: string, file: Express.Multer.File): Promise<UploadResult>;
  delete(fileName: string): Promise<void>;
  getUrl(fileName: string): string;
}
