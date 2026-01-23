'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThumbnailUpload from './ThumbnailUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const MEMBER_GROUPS = [
  { value: "general_supervisors", label: "General Supervisors" },
  { value: "supervisors", label: "Supervisors" },
  { value: "general_leaders", label: "General Leaders" },
  { value: "leaders", label: "Leaders" },
  { value: "vices", label: "Vices" },
  { value: "graduates", label: "Graduates" },
] as const;

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
] as const;

const MEMBER_STATUSES = [
  { value: "active", label: "Active" },
  { value: "graduated", label: "Graduated" },
] as const;

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
  const [gender, setGender] = useState(initialData?.gender ?? '');
  const [group, setGroup] = useState(initialData?.group ?? '');
  const [status, setStatus] = useState(initialData?.status ?? '');

  return (
    <form action={formAction} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initialData?.name}
          placeholder="Enter member name"
          className="bg-slate-900/50 border-slate-700 focus:border-orange-500/50"
        />
      </div>

      {/* Role */}
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          name="role"
          type="text"
          required
          defaultValue={initialData?.role}
          placeholder="Enter role"
          className="bg-slate-900/50 border-slate-700 focus:border-orange-500/50"
        />
      </div>

      {/* Two column grid for selects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Group */}
        <div className="space-y-2">
          <Label>Group</Label>
          <input type="hidden" name="group" value={group} />
          <Select value={group} onValueChange={setGroup} required>
            <SelectTrigger className="bg-slate-900/50 border-slate-700">
              <SelectValue placeholder="Select group" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {MEMBER_GROUPS.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label>Gender</Label>
          <input type="hidden" name="gender" value={gender} />
          <Select value={gender} onValueChange={setGender} required>
            <SelectTrigger className="bg-slate-900/50 border-slate-700">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {GENDERS.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>Status</Label>
          <input type="hidden" name="status" value={status} />
          <Select value={status} onValueChange={setStatus} required>
            <SelectTrigger className="bg-slate-900/50 border-slate-700">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {MEMBER_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Order */}
        <div className="space-y-2">
          <Label htmlFor="order">Order</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={initialData?.order ?? 0}
            className="bg-slate-900/50 border-slate-700 focus:border-orange-500/50"
          />
        </div>
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <Label>Thumbnail</Label>
        <input name="thumbnail" type="hidden" value={thumbnailUrl} />
        <div className="p-4 rounded-xl border border-slate-700 bg-slate-900/30">
          {gender === "female" ? (
            <div className="flex items-center gap-4">
              <Image
                src="https://cavrac2fayzzho5v.public.blob.vercel-storage.com/team/1768686255699-apel-women-N4TrfINpuymlgX4zqWH2hZz8QHSlSz.jpg"
                alt="Default female avatar"
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
        <Button
          type="submit"
          disabled={isPending}
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending 
            ? (mode === 'create' ? "Adding..." : "Saving...") 
            : (mode === 'create' ? "Add Member" : "Save Changes")
          }
        </Button>

        <Link href="/dashboard/team">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            Cancel
          </Button>
        </Link>
      </div>

      {/* Feedback */}
      {state?.error && (
        <Alert variant="destructive" className="bg-red-950/30 border-red-900/50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.error.message}</AlertDescription>
        </Alert>
      )}
      
      {state?.success && !isPending && (
        <Alert className="bg-emerald-950/30 border-emerald-900/50 text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            {mode === 'create' ? "Member added successfully!" : "Member updated successfully!"}
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}
