import React, { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

interface FileUploaderProps {
  onUploadComplete: (url: string) => void;
  accept?: string;
  maxSize?: number;
}

function FileUploader({ onUploadComplete, accept = '*/*', maxSize = 10 * 1024 * 1024 }: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Here you would typically upload to your storage service
      // For now, we'll create a temporary URL
      const url = URL.createObjectURL(file);
      onUploadComplete(url);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <label className="block w-full">
        <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white dark:bg-gray-800 border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Click or drag file to upload</span>
            </div>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FileUploader;