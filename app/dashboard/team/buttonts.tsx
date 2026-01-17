import { actionDeleteMember } from '@/app/lib/actions';
// import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function AddMember() {
  return (
    <Link
      href="/dashboard/team/new"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add New Member</span>{' '}
      {/* <PlusIcon className="h-5 md:ml-4" /> */}
    </Link>
  );
}

export function UpdateMemebr({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/team/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span>Edit</span>
      {/* <PencilIcon className="w-5" /> */}
    </Link>
  );
}

export function DeleteMemeber({ id }: { id: string }) {
  const deleteMemberWithId = actionDeleteMember.bind(null, id);


  return (
    <>
      <form action={deleteMemberWithId}>

        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <p>Delete</p>
          {/* <TrashIcon className="w-5" /> */}
        </button>
      </form>
    </>
  );
}
