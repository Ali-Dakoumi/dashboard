'use client';

import {
  PlusCircle,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  LayoutList,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '../reusable/page-header';

interface AreasHeaderProps {
  viewMode: string;
  setViewMode: (mode: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
}

export function AreasHeader({
  viewMode,
  setViewMode,
  filter,
  setFilter,
  statusFilter,
  setStatusFilter
}: AreasHeaderProps) {
  return (
    <div className='space-y-5'>
      <PageHeader
        title='Areas'
        subtitle='Manage and monitor your agricultural areas'
      >
        <Tabs
          value={viewMode}
          onValueChange={setViewMode}
          className='hidden sm:block'
        >
          <TabsList className='grid w-[180px] grid-cols-2'>
            <TabsTrigger value='table' className='flex items-center gap-1.5'>
              <LayoutList className='h-4 w-4' />
              Table
            </TabsTrigger>
            <TabsTrigger value='cards' className='flex items-center gap-1.5'>
              <LayoutGrid className='h-4 w-4' />
              Cards
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button className='bg-primary hover:bg-primary/90 gap-2'>
          <PlusCircle className='h-4 w-4' />
          Add New Area
        </Button>
      </PageHeader>

      <div className='overflow-hidden rounded-lg border'>
        <div className='flex flex-col items-stretch sm:flex-row'>
          <div className='flex-shrink-0 border-b p-3 sm:w-[280px] sm:border-r sm:border-b-0 sm:p-4'>
            <div className='text-muted-foreground mb-3 flex items-center gap-1.5 text-sm font-medium'>
              <Filter className='h-4 w-4' />
              Filter by Status
            </div>
            <Tabs
              defaultValue={statusFilter}
              onValueChange={setStatusFilter}
              className='w-full'
            >
              <TabsList className='grid h-auto w-full grid-cols-3 p-1'>
                <TabsTrigger value='all' className='py-1.5 text-xs'>
                  All Areas
                </TabsTrigger>
                <TabsTrigger value='active' className='py-1.5 text-xs'>
                  Active
                </TabsTrigger>
                <TabsTrigger value='inactive' className='py-1.5 text-xs'>
                  Inactive
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className='flex flex-grow items-center gap-3 p-3 sm:p-4'>
            <div className='relative flex-grow'>
              <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
              <Input
                type='search'
                placeholder='Search areas...'
                className='w-full pl-8'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <Button
              variant='outline'
              size='icon'
              className='h-9 w-9 flex-shrink-0'
            >
              <SlidersHorizontal className='h-4 w-4' />
              <span className='sr-only'>Advanced filters</span>
            </Button>

            <Tabs
              value={viewMode}
              onValueChange={setViewMode}
              className='sm:hidden'
            >
              <TabsList className='grid w-[120px] grid-cols-2'>
                <TabsTrigger value='table'>
                  <LayoutList className='h-4 w-4' />
                </TabsTrigger>
                <TabsTrigger value='cards'>
                  <LayoutGrid className='h-4 w-4' />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
