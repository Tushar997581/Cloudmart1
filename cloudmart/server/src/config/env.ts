import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'dev_secret',
    awsRegion: process.env.AWS_REGION || 'us-east-1',
    awsS3Bucket: process.env.AWS_S3_BUCKET || 'cloudmart-assets',
    awsAccessKey: process.env.AWS_ACCESS_KEY_ID || '',
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY || '',
};