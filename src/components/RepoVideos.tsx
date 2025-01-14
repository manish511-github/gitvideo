'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

export default function VideoList() {
  const [videos, setVideos] = useState([]);

  // Fetch video list
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('en/repovideos/api/videolist'); // Adjusted path
        const data = await response.json();
        // eslint-disable-next-line no-console
        console.log(data);
        setVideos(data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  // Handle video click
  const handleVideoClick = async (key) => {
    try {
      const response = await fetch(`video-url/${key}`); // Adjusted path
      const { url } = await response.json();
      window.open(url, '_blank'); // Opens video in a new tab
    } catch (error) {
      console.error('Error fetching video URL:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Uploaded Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{video.fileName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                <strong>File Type:</strong> {video.fileType}
              </p>
              <p className="text-sm text-gray-600">
                <strong>File Size:</strong> {video.fileSize} bytes
              </p>
              <p className="text-sm text-gray-600 truncate">
                <strong>S3 Path:</strong> {video.s3Path}
              </p>
              <Badge className="mt-2">ID: {video.id}</Badge>
              <button
                onClick={() => handleVideoClick(video.s3Path)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Watch Video
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}