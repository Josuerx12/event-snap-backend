import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

export class S3Gateway {
  private s3: S3Client;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.get<string>('EVENTOSNAP_AWS_BUCKET')!;
    this.s3 = new S3({
      region: this.configService.get<string>('EVENTOSNAP_AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>(
          'EVENTOSNAP_AWS_ACCESS_KEY',
        )!,
        secretAccessKey: this.configService.get<string>(
          'EVENTOSNAP_AWS_SECRET_ACCESS_KEY',
        )!,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const mimeType = file.mimetype.split('/')[1];

    const fileKey = randomUUID() + '.' + mimeType;

    const object = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
      ACL: 'private',
      Body: file.buffer,
    });

    await this.s3.send(object);

    return fileKey;
  }

  async getUrl(fileKey: string): Promise<string> {
    const getObject = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    });

    const signedUrl = await getSignedUrl(this.s3, getObject, {
      expiresIn: 60 * 60,
    });

    return signedUrl;
  }

  async deleteFile(fileKey: string): Promise<void> {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    });

    await this.s3.send(deleteCommand);
  }
}
