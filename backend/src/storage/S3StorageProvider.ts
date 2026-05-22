import { IStorageProvider, UploadResult } from './IStorageProvider';

export class S3StorageProvider implements IStorageProvider {
  constructor() {
    if (!process.env.S3_BUCKET || !process.env.S3_REGION) {
      console.warn('S3 storage not configured. Set S3_BUCKET and S3_REGION env vars.');
    }
  }

  async upload(_filePath: string, _file: Express.Multer.File): Promise<UploadResult> {
    throw new Error(
      'S3 storage not implemented. Install @aws-sdk/client-s3 and @aws-sdk/lib-storage, then implement S3StorageProvider.upload()'
    );
  }

  async delete(_fileName: string): Promise<void> {
    throw new Error('S3 storage not implemented.');
  }

  getUrl(fileName: string): string {
    return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`;
  }
}
