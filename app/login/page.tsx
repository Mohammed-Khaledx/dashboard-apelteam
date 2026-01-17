"use client"
import { redirect } from 'next/navigation';

import { login } from '../lib/actions';
import { useActionState, useState } from 'react';

export default function LoginPage() {
  //this work better than redirect/next in client components 
  // specially with enents like "onClick"
  // const router = useRouter();

  // gonna to implement this later to preserve the state after error 
  const [email, setEmail] = useState('');
  const [state, action] = useActionState(login, null);

  if (state?.success) {
    redirect('/dashboard')
  }

  return (
    <main style={{ padding: 24 }}>
      <h1 className='bg-blue-200 rounded-lg p-2 m-2'>Login</h1>

      <form action={action} style={{ maxWidth: 300 }}>
        <div>
          <input
          className='bg-gray-200 rounded-lg p-2 m-2'
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div>
          <input
          className='bg-gray-200 rounded-lg p-2 m-2'
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button className='bg-red-200 rounded-lg p-2' type="submit">Login</button>
        {state?.error && (
          <p className='text-red-500'>{state.error}</p>
        )}
      </form>
    </main>
  );
}
