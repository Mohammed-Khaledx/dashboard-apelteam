'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import ThumbnailUpload from './ThumbnailUpload';
import Image from 'next/image';

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
    thumbnail?: string | null;
    order?: number;
  };
  mode?: 'create' | 'edit';
}

export default function TeamForm({ action, initialData, mode = 'create' }: TeamFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail ?? '');
  const [choice, setChoice] = useState('');

  return (
    <form action={formAction} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
        <input
          name="name"
          type="text"
          required
          defaultValue={initialData?.name}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
          placeholder="Enter member name"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
        <input
          name="role"
          type="text"
          required
          defaultValue={initialData?.role}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
          placeholder="Enter role"
        />
      </div>

      {/* Two column grid for selects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Group */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Group</label>
          <select
            name="group"
            required
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
            defaultValue={initialData?.group || ""}
          >
            <option value="" disabled className="bg-slate-900">Select group</option>
            {MEMBER_GROUPS.map((g) => (
              <option key={g} value={g} className="bg-slate-900">{g.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Gender</label>
          <select
            name="gender"
            required
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
            onChange={(e) => setChoice(e.target.value)}
            defaultValue={initialData?.gender || ""}
          >
            <option value="" disabled className="bg-slate-900">Select gender</option>
            {GENDERS.map((g) => (
              <option key={g} value={g} className="bg-slate-900">{g}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
          <select
            name="status"
            required
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
            defaultValue={initialData?.status || ""}
          >
            <option value="" disabled className="bg-slate-900">Select status</option>
            {MEMBER_STATUSES.map((s) => (
              <option key={s} value={s} className="bg-slate-900">{s}</option>
            ))}
          </select>
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Order</label>
          <input
            name="order"
            type="number"
            defaultValue={initialData?.order ?? 0}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Thumbnail</label>
        <input name="thumbnail" type="hidden" value={thumbnailUrl} />
        <div className="card p-4">
          {initialData?.gender === "female" || choice === "female" ? (
            <div className="flex items-center gap-4">
              <Image
                src="https://cavrac2fayzzho5v.public.blob.vercel-storage.com/team/1768686255699-apel-women-N4TrfINpuymlgX4zqWH2hZz8QHSlSz.jpg"
                alt="Thumbnail preview"
                width={64}
                height={64}
                className="h-16 w-16 rounded-xl object-cover border border-slate-700"
              />
              <p className="text-sm text-slate-400">Default female avatar will be used</p>
            </div>
          ) : (
            <ThumbnailUpload value={thumbnailUrl} onChange={setThumbnailUrl} />
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="btn-highlight disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending 
            ? (mode === 'create' ? "Adding..." : "Saving...") 
            : (mode === 'create' ? "Add Member" : "Save Changes")
          }
        </button>

        <Link 
          href="/dashboard/team" 
          className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
        >
          Cancel
        </Link>
      </div>

      {/* Feedback */}
      {state?.error && (
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-400">
          {state.error.message}
        </div>
      )}
      {state?.success && !isPending && (
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50 text-emerald-400">
          {mode === 'create' ? "Member added successfully!" : "Member updated successfully!"}
        </div>
      )}
    </form>
  );
}
