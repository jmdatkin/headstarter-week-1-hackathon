import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";

export const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: "us-east-1",
});

export const getPutPresignedUrl = async (
  filename?: string,
  mimetype?: string
) => {
  const key = nanoid();
  console.log(mimetype);
  return await getSignedUrl(
    s3,
    new PutObjectCommand({
      Key: filename ?? key,
      ContentType: "image/png",
      Bucket: process.env.AWS_S3_BUCKET!,
    }),
    {
      expiresIn: 3600,
    }
  );
};

export const getObjectPresignedUrl = async (filename: string) => {
  return await getSignedUrl(
    s3,
    new GetObjectCommand({
      Key: filename,
      Bucket: process.env.AWS_S3_BUCKET!,
    }),
    {
      expiresIn: 3600,
    }
  );
};

export const getListObjects = async () => {
  return await s3.send(
    new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET!,
    })
  );
};
