import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardLoading() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <Skeleton className='h-8 w-[200px]' />
          <div className='hidden items-center space-x-2 md:flex'>
            <Skeleton className='h-9 w-[100px]' />
          </div>
        </div>

        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='analytics' disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className='@container/card'>
                  <CardHeader>
                    <Skeleton className='h-4 w-[140px]' />
                    <Skeleton className='mt-2 h-8 w-[120px]' />
                    <Skeleton className='mt-2 h-6 w-[160px]' />
                  </CardHeader>
                  <CardFooter className='flex-col items-start gap-1.5'>
                    <Skeleton className='h-4 w-[180px]' />
                    <Skeleton className='h-4 w-[140px]' />
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
              <Card className='col-span-4'>
                <CardHeader>
                  <Skeleton className='h-6 w-[140px]' />
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i}>
                        <Skeleton className='mb-2 h-4 w-[100px]' />
                        <Skeleton className='h-4 w-[140px]' />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className='col-span-4 md:col-span-3'>
                <CardHeader>
                  <Skeleton className='h-6 w-[180px]' />
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i}>
                        <Skeleton className='mb-2 h-4 w-[80px]' />
                        <Skeleton className='h-4 w-[120px]' />
                      </div>
                    ))}
                  </div>
                  <div className='rounded-lg border p-3'>
                    <Skeleton className='mb-4 h-4 w-[140px]' />
                    <div className='space-y-3'>
                      <div className='flex items-center justify-between'>
                        <Skeleton className='h-4 w-[100px]' />
                        <Skeleton className='h-6 w-[80px]' />
                      </div>
                      <div className='flex items-center justify-between'>
                        <Skeleton className='h-4 w-[120px]' />
                        <Skeleton className='h-6 w-[60px]' />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
