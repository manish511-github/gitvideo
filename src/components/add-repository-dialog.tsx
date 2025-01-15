/* eslint-disable no-alert */
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Upload } from 'lucide-react';
import { useState } from 'react';

export function AddRepositoryDialog() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    file: null as File | null,
  });
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.file) {
      alert('Please select a file before submitting.');
      return;
    }
    setIsLoading(true);
    try {
      const fileType = formData.file.type;
      const fileName = formData.file.name;
      const body = {
        title: formData.name,
        description: formData.description,
        fileName,
        fileType,
      };
      const response = await fetch('http://localhost:4300/api/aws/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to create repository');
      }

      const { uploadUrl } = await response.json();

      // Upload the file to S3 using the presigned URL
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': fileType },
        body: formData.file,
      });

      alert('Repository created and file uploaded successfully.');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 size-4" />
          New Repository
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create new repository</DialogTitle>
            <DialogDescription>
              Add a new video repository to your workspace. You can upload your video and add details here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Repository name</Label>
              <Input
                id="name"
                placeholder="Enter repository name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter repository description"
                className="resize-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label>Video file</Label>
              <div className="grid gap-4">
                <div className="flex items-center justify-center">
                  <div className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 p-5 text-center hover:bg-muted/50">
                    <Upload className="size-8 text-muted-foreground" />
                    <div className="mt-4 flex flex-col items-center gap-1">
                      <p className="text-sm font-medium">Drag and drop your video here</p>
                      <p className="text-xs text-muted-foreground">
                        MP4, MOV, or WebM (max 2GB)
                      </p>
                      <Input
                        id="video"
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) =>
                          setFormData({ ...formData, file: e.target.files?.[0] || null })
                        }
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="mt-2"
                        disabled={isLoading}
                        onClick={() => document.getElementById('video')?.click()}
                      >
                        Select file
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create repository'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}