'use client';

import { useRef, useState, useTransition } from 'react';
import Image from 'next/image';

import { actionUploadThumbnail } from '@/app/lib/actions';

type Props = {
  value: string;
  onChange: (nextUrl: string) => void;
};

export default function ThumbnailUpload({ value, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onUpload = () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setError('Please choose an image first.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('File must be an image (JPEG, PNG, WEBP, etc).');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setError('File size must be less than 4MB.');
      return;
    }

    const formData = new FormData();
    formData.set('file', file);

    setError(null);

    startTransition(async () => {
      const result = await actionUploadThumbnail(null, formData);

      if (result?.error?.message) {
        setError(result.error.message);
        return;
      }

      if (result?.url) {
        onChange(result.url);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    });
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="flex items-start gap-4">
          <Image
            src={value}
            alt="Thumbnail preview"
            width={80}
            height={80}
            className="h-20 w-20 rounded-xl object-cover border border-slate-700"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 break-all mb-2">{value}</p>
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Remove thumbnail
            </button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-slate-500">No thumbnail uploaded yet.</div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="flex-1 text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 file:cursor-pointer file:transition-colors"
        />
        <button
          type="button"
          onClick={onUpload}
          disabled={isPending}
          className="btn-primary disabled:opacity-50"
        >
          {isPending ? 'Uploading…' : 'Upload'}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
