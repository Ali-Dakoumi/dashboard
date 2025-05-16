'use client';

import type React from 'react';

import { useState, useEffect, useRef, useTransition } from 'react';
import { login } from '@/lib/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { envConfig } from '@/lib/config';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTopLoader } from 'nextjs-toploader';

// This component handles the submit button state
function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button type='submit' className='w-full' disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader className='mr-2 h-4 w-4 animate-spin' />
          Signing in...
        </>
      ) : (
        'Sign In'
      )}
    </Button>
  );
}

// Initial state for the form
const initialState = {
  success: false,
  error: undefined
} as const;

export default function SignIn() {
  const loader = useTopLoader();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<{
    success?: boolean;
    error?: string;
  }>({});
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle error messages
  const errorMessage = formState?.error || '';

  // Redirect on success
  useEffect(() => {
    if (formState?.success) {
      // Start the top loader
      loader.start();

      // Keep the button in loading state
      setIsSubmitting(true);

      // Set a timeout for the redirect to allow the loader to be visible
      redirectTimeoutRef.current = setTimeout(() => {
        router.push('/dashboard');

        // Set another timeout to complete the loader after navigation starts
        setTimeout(() => {
          loader.done();
        }, 500);
      }, 500);
    } else if (formState?.error) {
      // If there's an error, stop the loading state
      setIsSubmitting(false);
      loader.done();
    }

    // Cleanup function
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, [formState, router, loader]);

  // Get environment name for styling
  const envName = envConfig.PLATFORM || 'development';

  // Define environment-specific styling
  const envStyles = {
    development: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-300'
    },
    qa: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-300'
    },
    staging: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      border: 'border-amber-300'
    },
    demo: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300'
    }
  }[envName] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300'
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Start the loading state immediately when the form is submitted
    setIsSubmitting(true);

    // Start the top loader
    loader.start();

    // Create form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Use startTransition to avoid the error
    startTransition(async () => {
      try {
        // Call the server action
        const result = await login(formState, formData);

        // Update form state with the result
        setFormState(result);

        // If there was an error, stop the loading state
        if (result.error) {
          setIsSubmitting(false);
          loader.done();
        }
      } catch (error) {
        // If there's an error, stop the loading state
        setIsSubmitting(false);
        loader.done();
        console.error('Form submission error:', error);

        // Set a generic error message
        setFormState({
          error: 'An unexpected error occurred. Please try again later.'
        });
      }
    });
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center p-4 ${envStyles.bg}`}
    >
      <div className='w-full max-w-md'>
        <div
          className={`mb-6 rounded-lg p-4 ${envStyles.border} flex items-center justify-center gap-3`}
        >
          <AlertCircle className={envStyles.text} />
          <h1 className={`text-xl font-bold ${envStyles.text}`}>
            Environment: {envConfig.PLATFORM}
          </h1>
        </div>

        <Card className='border-2 shadow-lg'>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <Alert variant='destructive' className='mb-4'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='your.email@example.com'
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password'>Password</Label>
                  <a
                    href='/forgot-password'
                    className='text-sm text-blue-600 hover:underline'
                    tabIndex={isSubmitting ? -1 : 0}
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••••'
                  required
                  disabled={isSubmitting}
                />
              </div>

              <SubmitButton isSubmitting={isSubmitting || isPending} />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
