import {
  ArrowLeft,
  Calendar,
  Layers,
  MapPin,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

// Mock function to get area by ID
function getAreaById(id: string) {
  const areas = [
    {
      id: 1,
      name: 'boran',
      size: '51.25 Hectar',
      subAreasNumber: 0,
      status: 'Desactivated',
      mapImage: '/placeholder.svg?height=400&width=600',
      information: 'INFORMATION AND RECOMMENDATIONS',
      description:
        'This area is currently not active. It spans over 51.25 hectares of land.',
      coordinates: '37.7749° N, 122.4194° W',
      lastUpdated: '2023-10-15',
      soilType: 'Clay loam',
      cropType: 'None',
      alerts: 2,
      alertDetails: [
        {
          id: 1,
          type: 'Maintenance',
          message: 'Soil testing required',
          date: '2023-10-10'
        },
        {
          id: 2,
          type: 'System',
          message: 'Satellite imagery outdated',
          date: '2023-10-12'
        }
      ],
      weatherData: {
        temperature: '18°C',
        humidity: '65%',
        precipitation: '30%',
        windSpeed: '12 km/h'
      },
      soilHealth: {
        ph: 6.5,
        nitrogen: 'Medium',
        phosphorus: 'Low',
        potassium: 'High',
        organicMatter: '4.2%'
      }
    },
    {
      id: 2,
      name: 'TEST 05',
      size: '18.29 Hectar',
      subAreasNumber: 0,
      status: 'Active',
      mapImage: '/placeholder.svg?height=400&width=600',
      information: 'INFORMATION AND RECOMMENDATIONS',
      description:
        'This is a test area that is currently active. It covers 18.29 hectares.',
      coordinates: '34.0522° N, 118.2437° W',
      lastUpdated: '2023-11-20',
      soilType: 'Sandy loam',
      cropType: 'Wheat',
      alerts: 0,
      alertDetails: [],
      weatherData: {
        temperature: '22°C',
        humidity: '55%',
        precipitation: '10%',
        windSpeed: '8 km/h'
      },
      soilHealth: {
        ph: 7.2,
        nitrogen: 'High',
        phosphorus: 'Medium',
        potassium: 'Medium',
        organicMatter: '3.8%'
      }
    }
  ];

  return areas.find((area) => area.id.toString() === id) || null;
}

export default function AreaDetailsPage({ params: { id } }: any) {
  const area = getAreaById(id);

  if (!area) {
    return (
      <div className='container mx-auto py-10 text-center'>
        <h1 className='mb-4 text-2xl font-bold'>Area not found</h1>
        <Link href='/areas'>
          <Button>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Areas
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='container mx-auto space-y-6 px-6 py-8'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/areas'>Areas</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/areas/${area.id}`}>
              {area.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <div className='flex items-center gap-3'>
          <Link href='/areas'>
            <Button
              variant='outline'
              size='icon'
              className='h-9 w-9 rounded-full'
            >
              <ArrowLeft className='h-4 w-4' />
              <span className='sr-only'>Back</span>
            </Button>
          </Link>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>{area.name}</h1>
            <p className='text-muted-foreground'>
              Last updated on {area.lastUpdated}
            </p>
          </div>
          <Badge
            variant={area.status === 'Active' ? 'default' : 'secondary'}
            className={`flex items-center gap-1 rounded-full px-3 py-1 ${
              area.status === 'Active'
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {area.status === 'Active' ? (
              <CheckCircle className='h-3 w-3' />
            ) : (
              <AlertCircle className='h-3 w-3' />
            )}
            {area.status}
          </Badge>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' className='gap-2'>
            <Edit className='h-4 w-4' />
            Edit
          </Button>
          <Button variant='destructive' className='gap-2'>
            <Trash2 className='h-4 w-4' />
            Delete
          </Button>
        </div>
      </div>

      <Tabs defaultValue='overview' className='w-full'>
        <TabsList className='h-auto w-full justify-start rounded-none border-b px-0'>
          <TabsTrigger
            value='overview'
            className='data-[state=active]:border-primary rounded-none data-[state=active]:border-b-2'
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value='satellite'
            className='data-[state=active]:border-primary rounded-none data-[state=active]:border-b-2'
          >
            Satellite Images
          </TabsTrigger>
          <TabsTrigger
            value='subareas'
            className='data-[state=active]:border-primary rounded-none data-[state=active]:border-b-2'
          >
            SubAreas
          </TabsTrigger>
          <TabsTrigger
            value='analytics'
            className='data-[state=active]:border-primary rounded-none data-[state=active]:border-b-2'
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value='history'
            className='data-[state=active]:border-primary rounded-none data-[state=active]:border-b-2'
          >
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='pt-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <div className='space-y-6 md:col-span-2'>
              <Card className='overflow-hidden'>
                <div className='relative h-[400px] w-full'>
                  <Image
                    src={area.mapImage || '/placeholder.svg'}
                    alt={`Map of ${area.name}`}
                    fill
                    className='object-cover'
                  />
                  <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white'>
                    <div className='flex items-center gap-2'>
                      <MapPin className='h-5 w-5' />
                      <span>{area.coordinates}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{area.description}</p>
                </CardContent>
              </Card>

              {area.alerts > 0 && (
                <Card className='border-destructive/50'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-destructive flex items-center gap-2'>
                      <AlertCircle className='h-5 w-5' />
                      Alerts ({area.alerts})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {area.alertDetails.map((alert) => (
                        <div
                          key={alert.id}
                          className='flex items-start gap-3 border-b pb-3 last:border-0'
                        >
                          <AlertCircle className='text-destructive mt-0.5 h-5 w-5' />
                          <div>
                            <div className='font-medium'>{alert.type}</div>
                            <div className='text-muted-foreground text-sm'>
                              {alert.message}
                            </div>
                            <div className='text-muted-foreground mt-1 text-xs'>
                              {alert.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className='space-y-6'>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle>Area Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <dt className='text-muted-foreground flex items-center gap-2'>
                        <MapPin className='h-4 w-4' />
                        Size
                      </dt>
                      <dd className='font-medium'>{area.size}</dd>
                    </div>
                    <div className='flex items-center justify-between'>
                      <dt className='text-muted-foreground flex items-center gap-2'>
                        <Layers className='h-4 w-4' />
                        SubAreas
                      </dt>
                      <dd className='font-medium'>{area.subAreasNumber}</dd>
                    </div>
                    <div className='flex items-center justify-between'>
                      <dt className='text-muted-foreground flex items-center gap-2'>
                        <Calendar className='h-4 w-4' />
                        Last Updated
                      </dt>
                      <dd className='font-medium'>{area.lastUpdated}</dd>
                    </div>
                    <div className='flex items-center justify-between'>
                      <dt className='text-muted-foreground'>Soil Type</dt>
                      <dd className='font-medium'>{area.soilType}</dd>
                    </div>
                    <div className='flex items-center justify-between'>
                      <dt className='text-muted-foreground'>Crop Type</dt>
                      <dd className='font-medium'>{area.cropType || 'None'}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle>Weather Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <div className='text-muted-foreground text-sm'>
                        Temperature
                      </div>
                      <div className='font-medium'>
                        {area.weatherData.temperature}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <div className='text-muted-foreground text-sm'>
                        Humidity
                      </div>
                      <div className='font-medium'>
                        {area.weatherData.humidity}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <div className='text-muted-foreground text-sm'>
                        Precipitation
                      </div>
                      <div className='font-medium'>
                        {area.weatherData.precipitation}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <div className='text-muted-foreground text-sm'>
                        Wind Speed
                      </div>
                      <div className='font-medium'>
                        {area.weatherData.windSpeed}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle>Soil Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='space-y-1'>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground text-sm'>
                          pH Level
                        </span>
                        <span className='font-medium'>
                          {area.soilHealth.ph}
                        </span>
                      </div>
                      <div className='bg-muted h-2 w-full rounded-full'>
                        <div
                          className='bg-primary h-2 rounded-full'
                          style={{
                            width: `${(area.soilHealth.ph / 14) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-1'>
                        <div className='text-muted-foreground text-sm'>
                          Nitrogen
                        </div>
                        <div className='font-medium'>
                          {area.soilHealth.nitrogen}
                        </div>
                      </div>
                      <div className='space-y-1'>
                        <div className='text-muted-foreground text-sm'>
                          Phosphorus
                        </div>
                        <div className='font-medium'>
                          {area.soilHealth.phosphorus}
                        </div>
                      </div>
                      <div className='space-y-1'>
                        <div className='text-muted-foreground text-sm'>
                          Potassium
                        </div>
                        <div className='font-medium'>
                          {area.soilHealth.potassium}
                        </div>
                      </div>
                      <div className='space-y-1'>
                        <div className='text-muted-foreground text-sm'>
                          Organic Matter
                        </div>
                        <div className='font-medium'>
                          {area.soilHealth.organicMatter}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='satellite' className='pt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Satellite Imagery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className='relative aspect-video overflow-hidden rounded-lg border'
                  >
                    <Image
                      src='/placeholder.svg'
                      alt={`Satellite image ${i}`}
                      fill
                      className='object-cover'
                    />
                    <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white'>
                      <div className='text-sm'>
                        Captured: 2023-{10 + i}-{i * 5}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='subareas' className='pt-6'>
          <Card>
            <CardHeader>
              <CardTitle>SubAreas</CardTitle>
            </CardHeader>
            <CardContent>
              {area.subAreasNumber > 0 ? (
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  {Array.from({ length: area.subAreasNumber }).map((_, i) => (
                    <Card key={i}>
                      <CardContent className='flex items-center gap-4 p-4'>
                        <div className='relative h-16 w-16 overflow-hidden rounded-md'>
                          <Image
                            src='/placeholder.svg'
                            alt={`SubArea ${i + 1}`}
                            fill
                            className='object-cover'
                          />
                        </div>
                        <div>
                          <h3 className='font-medium'>SubArea {i + 1}</h3>
                          <p className='text-muted-foreground text-sm'>
                            Size:{' '}
                            {(
                              +area.size.split(' ')[0] /
                              (area.subAreasNumber + 1)
                            ).toFixed(2)}{' '}
                            Hectar Hectar
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className='py-8 text-center'>
                  <p className='text-muted-foreground'>
                    No subareas have been created yet.
                  </p>
                  <Button className='mt-4'>Create SubArea</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='analytics' className='pt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent className='flex h-[400px] items-center justify-center'>
              <p className='text-muted-foreground'>
                Analytics data visualization would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='history' className='pt-6'>
          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className='flex gap-4 border-b pb-4 last:border-0'
                  >
                    <div className='bg-muted flex h-10 w-10 items-center justify-center rounded-full'>
                      {i % 2 === 0 ? (
                        <Edit className='text-muted-foreground h-5 w-5' />
                      ) : (
                        <MapPin className='text-muted-foreground h-5 w-5' />
                      )}
                    </div>
                    <div>
                      <p className='font-medium'>
                        {i % 2 === 0
                          ? 'Area information updated'
                          : 'Satellite imagery added'}
                      </p>
                      <p className='text-muted-foreground text-sm'>
                        2023-{10 - i}-{i * 5}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
