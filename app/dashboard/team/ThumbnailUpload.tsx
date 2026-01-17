'use client';

import { useRef, useState, useTransition } from 'react';

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
    <div className="space-y-2">
      {value ? (
        <div className="flex items-start gap-3">
          {/* Using <img> avoids next/image remote domain config */}
          <img
            src={value}
            alt="Thumbnail preview"
            className="h-16 w-16 rounded object-cover border"
          />
          <div className="min-w-0 flex-1">
            <div className="text-xs text-gray-600 break-all">{value}</div>
            <button
              type="button"
              onClick={() => onChange('')}
              className="mt-1 text-xs text-red-600 hover:underline"
            >
              Remove thumbnail
            </button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-600">No thumbnail uploaded yet.</div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="block w-full text-sm"
        />
        <button
          type="button"
          onClick={onUpload}
          disabled={isPending}
          className="shrink-0 bg-gray-900 text-white px-3 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending ? 'Uploading…' : 'Upload'}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
