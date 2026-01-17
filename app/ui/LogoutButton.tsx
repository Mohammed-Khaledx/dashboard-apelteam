import { logout } from "@/app/lib/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button className='bg-red-300' type="submit">Logout</button>
    </form>
  );
}