'use client';

import { useUser } from '@/lib/hooks/use-user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { UserCircle } from 'lucide-react';

export function UserProfile() {
  const { data, isLoading } = useUser();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center space-x-4'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[200px]' />
            <Skeleton className='h-4 w-[150px]' />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className='flex items-center space-x-4'>
        <Avatar className='h-12 w-12'>
          <AvatarImage src={data.avatar} alt={data.name || 'User'} />
          <AvatarFallback>
            <UserCircle className='h-6 w-6' />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className='font-medium'>{data.name || 'User'}</h3>
          <p className='text-muted-foreground text-sm'>{data.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
