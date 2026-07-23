import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "../config/env";
import crypto from "crypto";

const s3 = new S3Client({
    region: config.awsRegion,
    credentials: {
        accessKeyId: config.awsAccessKey,
        secretAccessKey: config.awsSecretKey
    }
});

export const uploadToS3 = async (file: Express.Multer.File): Promise<string> => {
    const fileKey = `${crypto.randomBytes(16).toString("hex")}-${file.originalname}`;
    
    await s3.send(new PutObjectCommand({
        Bucket: config.awsS3Bucket,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype
    }));

    return `https://${config.awsS3Bucket}.s3.${config.awsRegion}.amazonaws.com/${fileKey}`;
};