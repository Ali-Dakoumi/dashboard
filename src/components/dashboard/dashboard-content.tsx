'use client';

import { useUser } from '@/lib/hooks/use-user';
import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  IconTrendingUp,
  IconBuildingFactory2,
  IconPlant2,
  IconDevices2,
  IconCreditCard,
  IconPlus
} from '@tabler/icons-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DashboardLoading from '../../app/dashboard/loading';
import Link from 'next/link';
import EmptyCard from './empty-card';
import { envConfig } from '@/lib/config';

interface UserData {
  production_cycles_number: number;
  active_services_production_cycles: number;
  areas_number: number;
  areas_right: boolean;
  sencrop_weather_stations_number: number;
  active_services_sencrop_weather_stations: number;
  status: string;
  payment_provider: string;
  currency: string;
  billing_details: {
    company: string;
    tva: string;
    billingAddress: string;
    city: string;
    postal_code: string;
  };
  user_type: string;
  preferred_language: string;
  discount_for_all_enabled: boolean;
  discount_for_all: number;
  has_renewal_discount: boolean;
}

export default function DashboardContent() {
  const { data, isLoading } = useUser() as {
    data: UserData;
    isLoading: boolean;
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return <DashboardLoading />;
  }

  // Ensure data exists before rendering
  if (!data) return null;

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-primary text-2xl font-bold tracking-tight uppercase'>
            {envConfig.PLATFORM}
          </h2>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
          {data.production_cycles_number === 22 ? (
            <EmptyCard
              title='Add Production Cycle'
              icon={IconBuildingFactory2}
              metricName='cycles'
              href='/dashboard/cycles'
            />
          ) : (
            <Card className='@container/card'>
              <CardHeader>
                <CardDescription>Production Cycles</CardDescription>
                <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                  {data.production_cycles_number}
                </CardTitle>
                <CardAction>
                  <Badge variant='outline'>
                    <IconBuildingFactory2 className='mr-1 h-4 w-4' />
                    Active: {data.active_services_production_cycles}
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                <div className='line-clamp-1 flex gap-2 font-medium'>
                  Production cycles managed
                </div>
                <div className='text-muted-foreground'>
                  Total cycles in the system
                </div>
              </CardFooter>
            </Card>
          )}

          {data.areas_number === 0 ? (
            <EmptyCard
              title='Add Area'
              icon={IconPlant2}
              metricName='areas'
              href='/dashboard/areas'
            />
          ) : (
            <Card className='@container/card'>
              <CardHeader>
                <CardDescription>Areas</CardDescription>
                <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                  {data.areas_number}
                </CardTitle>
                <CardAction>
                  <Badge variant='outline'>
                    <IconPlant2 className='mr-1 h-4 w-4' />
                    {data.areas_right ? 'Active' : 'Inactive'}
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                <div className='line-clamp-1 flex gap-2 font-medium'>
                  Managed farming areas
                </div>
                <div className='text-muted-foreground'>
                  Total registered areas
                </div>
              </CardFooter>
            </Card>
          )}

          {data.sencrop_weather_stations_number === 0 ? (
            <EmptyCard
              title='Add Weather Station'
              icon={IconDevices2}
              metricName='stations'
              href='/dashboard/weather-stations'
            />
          ) : (
            <Card className='@container/card'>
              <CardHeader>
                <CardDescription>Weather Stations</CardDescription>
                <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                  {data.sencrop_weather_stations_number}
                </CardTitle>
                <CardAction>
                  <Badge variant='outline'>
                    <IconDevices2 className='mr-1 h-4 w-4' />
                    Active: {data.active_services_sencrop_weather_stations}
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                <div className='line-clamp-1 flex gap-2 font-medium'>
                  Monitoring stations
                </div>
                <div className='text-muted-foreground'>
                  Sencrop weather stations deployed
                </div>
              </CardFooter>
            </Card>
          )}

          {!data.status || data.status === 'inactive' ? (
            <EmptyCard
              title='Complete Setup'
              icon={IconCreditCard}
              metricName='setup'
              href='/dashboard/setup'
            />
          ) : (
            <Card className='@container/card'>
              <CardHeader>
                <CardDescription>Account Status</CardDescription>
                <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                  {data.status}
                </CardTitle>
                <CardAction>
                  <Badge variant='outline'>
                    <IconCreditCard className='mr-1 h-4 w-4' />
                    {data.payment_provider}
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                <div className='line-clamp-1 flex gap-2 font-medium'>
                  {data.currency} Account
                </div>
                <div className='text-muted-foreground'>
                  {data.billing_details.company}
                </div>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>Billing Details</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <div className='text-sm font-medium'>Company</div>
                  <div className='text-muted-foreground text-sm'>
                    {data.billing_details.company}
                  </div>
                </div>
                <div>
                  <div className='text-sm font-medium'>VAT Number</div>
                  <div className='text-muted-foreground text-sm'>
                    {data.billing_details.tva}
                  </div>
                </div>
                <div>
                  <div className='text-sm font-medium'>Address</div>
                  <div className='text-muted-foreground text-sm'>
                    {data.billing_details.billingAddress}
                  </div>
                </div>
                <div>
                  <div className='text-sm font-medium'>Location</div>
                  <div className='text-muted-foreground text-sm'>
                    {data.billing_details.city},{' '}
                    {data.billing_details.postal_code}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='col-span-4 md:col-span-3'>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <div className='text-sm font-medium'>User Type</div>
                  <div className='text-muted-foreground text-sm'>
                    {data.user_type}
                  </div>
                </div>
                <div>
                  <div className='text-sm font-medium'>Language</div>
                  <div className='text-muted-foreground text-sm'>
                    {data.preferred_language.toUpperCase()}
                  </div>
                </div>
              </div>

              {(data.discount_for_all_enabled || data.has_renewal_discount) && (
                <div className='rounded-lg border p-3'>
                  <h4 className='mb-2 text-sm font-medium'>Active Discounts</h4>
                  {data.discount_for_all_enabled && (
                    <div className='flex items-center justify-between text-sm'>
                      <span>General Discount</span>
                      <Badge variant='outline'>
                        {data.discount_for_all}% off
                      </Badge>
                    </div>
                  )}
                  {data.has_renewal_discount && (
                    <div className='mt-2 flex items-center justify-between text-sm'>
                      <span>Renewal Discount</span>
                      <Badge variant='outline'>Active</Badge>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
