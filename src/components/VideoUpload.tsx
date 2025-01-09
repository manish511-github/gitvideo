'use client';
/* eslint-disable no-alert */
import { useState } from 'react';

const VideoUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleUpload = async () => {
    if (!file || !title) {
      alert('File and Title are required!');
      return;
    }

    try {
      // Step 1: Send metadata to backend and get upload URL
      const response = await fetch('/api/upload-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          title,
          description,
          tags: tags.split(','),
        }),
      });

      const { uploadUrl } = await response.json();

      // Step 2: Upload the video file to S3
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
      });

      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload video');
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default VideoUploadForm;
