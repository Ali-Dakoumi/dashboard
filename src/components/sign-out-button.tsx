'use client';

import { LogOut } from 'lucide-react';
import { useTransition } from 'react';
import { useTopLoader } from 'nextjs-toploader';
import type { MouseEvent, FC } from 'react';
import { signOut } from 'next-auth/react';

export const SignOutButton: FC = () => {
  const [isPending, startTransition] = useTransition();
  const loader = useTopLoader();

  const handleSignOut = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    // Start the loading indicator
    loader.start();

    startTransition(async () => {
      try {
        await signOut({ redirect: true, callbackUrl: '/' });
      } catch (error) {
        // Type guard for error object
        if (error instanceof Error) {
          console.error('Sign out error:', error.message);
        } else {
          console.error('Sign out error:', error);
        }
      } finally {
        // Stop the loading indicator after a short delay for better UX
        setTimeout(() => {
          loader.done();
        }, 500);
      }
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      type='button'
      className='inset-0 flex w-full items-center gap-2 border-none shadow-none hover:bg-transparent'
    >
      <LogOut className='h-4 w-4' />
      {isPending ? 'Signing out...' : 'Sign Out'}
    </button>
  );
};
