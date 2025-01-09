import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Assuming Prisma ORM is set up
import AWS from 'aws-sdk';

// Configure AWS S3
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fileName, fileType, title, description, tags } = req.body;

  if (!fileName || !fileType || !title) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate file type

  try {
    // Step 1: Generate Presigned URL
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // Use environment variable for bucket name
      Key: fileName,
      ContentType: fileType,
      Expires: 60,
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

    return res.status(200).json({ uploadUrl, video });
  } catch (error) {
    console.error('Error saving video metadata:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}