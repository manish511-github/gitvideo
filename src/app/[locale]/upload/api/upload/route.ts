import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import AWS from 'aws-sdk';
import { NextResponse } from 'next/server';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure AWS S3
const s3 = new AWS.S3({
  endpoint: 'http://localhost:4566', // LocalStack S3 endpoint
  s3ForcePathStyle: true,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileName, fileType, title, description, tags } = body;

    if (!fileName || !fileType || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Step 1: Generate Presigned URL
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // Use environment variable for bucket name
      Key: fileName,
      ContentType: fileType,
      Expires: 30000, // URL expiration time in seconds
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);

    // Step 2: Save Metadata in Database
    const video = await prisma.video.create({
      data: {
        title,
        description,
        tags,
        fileName,
        version: 'v1',
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ uploadUrl, video }, { status: 200 });
  } catch (error) {
    console.error('Error saving video metadata:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
