'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/page-container';
import { IconAlertCircle, IconRefresh } from '@tabler/icons-react';

export default function DashboardError({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col items-center justify-center gap-4'>
        <Alert variant='destructive' className='max-w-[500px]'>
          <IconAlertCircle className='h-4 w-4' />
          <AlertTitle>Error Loading Dashboard</AlertTitle>
          <AlertDescription className='mt-2 flex flex-col gap-4'>
            <p>
              {error.message ||
                'Failed to load dashboard data. Please try again.'}
            </p>
            <Button
              variant='outline'
              size='sm'
              className='w-fit'
              onClick={() => reset()}
            >
              <IconRefresh className='mr-2 h-4 w-4' />
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    </PageContainer>
  );
}
