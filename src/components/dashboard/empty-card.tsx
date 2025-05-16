import type React from 'react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent
} from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

interface EmptyCardProps {
  title: string;
  description?: string;
  icon: React.ElementType;
  metricName: string;
  href: string;
  actionLabel?: string;
}

const EmptyCardEnhanced = ({
  title,
  description,
  icon: Icon,
  metricName,
  href,
  actionLabel
}: EmptyCardProps) => (
  <Link href={href} className='block no-underline'>
    <Card className='hover:bg-accent/5 @container/card relative flex h-full flex-col overflow-hidden transition-colors'>
      {/* Background decoration */}
      <div className='bg-primary/5 absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-70' />

      <CardHeader className='flex flex-col space-y-2'>
        <CardDescription>{title}</CardDescription>
      </CardHeader>

      <CardContent className='flex flex-grow items-center pt-0 pb-2'>
        <div className='flex w-full justify-center'>
          <div className='bg-muted/50 flex items-center justify-center rounded-sm p-6'>
            <PlusCircle className='text-muted-foreground h-20 w-20' />
          </div>
        </div>
      </CardContent>

      <CardFooter className='mt-auto flex-col items-start gap-1.5 text-sm'>
        <div className='line-clamp-1 flex gap-2 font-medium'>
          {actionLabel || `Add your first ${metricName}`}
        </div>
        <div className='text-muted-foreground'>
          {description || `No ${metricName} have been added yet`}
        </div>
      </CardFooter>
    </Card>
  </Link>
);

export default EmptyCardEnhanced;
