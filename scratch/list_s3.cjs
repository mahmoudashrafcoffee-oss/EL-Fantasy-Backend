const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config();

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function listFiles() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_S3_BUCKET_NAME
  });
  
  try {
    const data = await client.send(command);
    console.log(data.Contents.map(c => c.Key));
  } catch (error) {
    console.error("Error listing files", error);
  }
}

listFiles();
