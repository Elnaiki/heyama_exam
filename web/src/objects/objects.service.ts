import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectEntity, ObjectDocument } from './objects.schema';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class ObjectsService {
  private s3: S3Client;

  constructor(
    @InjectModel(ObjectEntity.name)
    private objectModel: Model<ObjectDocument>,
  ) {
    this.s3 = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<{ url: string; key: string }> {
    const key = `${Date.now()}-${file.originalname}`;
    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });
    await upload.done();
    const url = `${process.env.R2_PUBLIC_URL}/${key}`;
    return { url, key };
  }

  async create(title: string, description: string, file: Express.Multer.File) {
    const { url, key } = await this.uploadImage(file);
    const object = new this.objectModel({ title, description, imageUrl: url, imageKey: key });
    return object.save();
  }

  async findAll() {
    return this.objectModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    return this.objectModel.findById(id);
  }

  async remove(id: string) {
    const object = await this.objectModel.findById(id);
    if (object?.imageKey) {
      await this.s3.send(new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: object.imageKey,
      }));
    }
    return this.objectModel.findByIdAndDelete(id);
  }
}