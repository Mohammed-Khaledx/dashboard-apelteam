'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import ThumbnailUpload from './ThumbnailUpload';

// Move local constants here so they are reusable
const MEMBER_GROUPS = [
  "general_supervisors",
  "supervisors",
  "general_leaders",
  "leaders",
  "vices",
  "graduates"
] as const;

const GENDERS = ["male", "female"] as const;
const MEMBER_STATUSES = ["active", "graduated"] as const;

// Define a type for your action to ensure type safety
type FormState = { success?: boolean; error?: { message: string } } | null;
type ActionFunction = (state: FormState, formData: FormData) => Promise<FormState>;

interface TeamFormProps {
  action: ActionFunction;
  initialData?: {
    name?: string;
    role?: string;
    group?: string;
    gender?: string;
    status?: string;
    thumbnail?: string;
    order?: number;
  };
  mode?: 'create' | 'edit';
}

export default function TeamForm({ action, initialData, mode = 'create' }: TeamFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail ?? '');

  return (
    <form action={formAction}>
      {/* Name */}
      <div className="mb-3">
        <label className="block font-medium">Name</label>
        <input
          name="name"
          type="text"
          required
          defaultValue={initialData?.name}
          className="border p-2 w-full"
        />
      </div>

      {/* Role */}
      <div className="mb-3">
        <label className="block font-medium">Role</label>
        <input
          name="role"
          type="text"
          required
          defaultValue={initialData?.role}
          className="border p-2 w-full"
        />
      </div>

      {/* Group */}
      <div className="mb-3">
        <label className="block font-medium">Group</label>
        <select
          name="group"
          required
          className="border p-2 w-full"
          defaultValue={initialData?.group || ""}
        >
          <option value="" disabled>Select group</option>
          {MEMBER_GROUPS.map((g) => (
            <option key={g} value={g}>{g.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div className="mb-3">
        <label className="block font-medium">Gender</label>
        <select
          name="gender"
          required
          className="border p-2 w-full"
          defaultValue={initialData?.gender || ""}
        >
          <option value="" disabled>Select gender</option>
          {GENDERS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="mb-3">
        <label className="block font-medium">Status</label>
        <select
          name="status"
          required
          className="border p-2 w-full"
          defaultValue={initialData?.status || ""}
        >
          <option value="" disabled>Select status</option>
          {MEMBER_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Thumbnail */}
      <div className="mb-3">
        <label className="block font-medium">Thumbnail</label>
        <input name="thumbnail" type="hidden" value={thumbnailUrl} />

        <ThumbnailUpload value={thumbnailUrl} onChange={setThumbnailUrl} />

        <div className="mt-2">
          <label className="block text-sm text-gray-700">Or paste an image URL</label>
          <input
            type="text"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="border p-2 w-full"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Order */}
      <div className="mb-3">
        <label className="block font-medium">Order</label>
        <input
          name="order"
          type="number"
          defaultValue={initialData?.order ?? 0}
          className="border p-2 w-full"
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-4 mt-6">
        <button
          type="submit"
          disabled={isPending}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending ? (mode === 'create' ? "Adding..." : "Saving...") : (mode === 'create' ? "Add Member" : "Save Changes")}
        </button>
        
        <Link href="/dashboard/team" className="text-sm text-blue-600 hover:underline">
          Cancel
        </Link>
      </div>

      {/* Feedback Messages */}
      {state?.error && (
        <p className="text-red-500 mt-2">{state.error.message}</p>
      )}
      {state?.success && !isPending && (
        <p className="text-green-600 mt-2">
          {mode === 'create' 
            ? "Member added successfully!" 
            : "Member updated successfully!"}
        </p>
      )}
    </form>
  );
}
