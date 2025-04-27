'use client';

import { useState, useEffect } from 'react';
import { MapPin, X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MapViewProps {
  selectedAreaId?: number | null;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onClose?: () => void;
}

export function MapView({
  selectedAreaId,
  isFullscreen,
  onToggleFullscreen,
  onClose
}: MapViewProps) {
  const [areaName, setAreaName] = useState<string>('');

  // Simulate fetching area details when selectedAreaId changes
  useEffect(() => {
    if (selectedAreaId) {
      // This would be replaced with an actual API call
      const mockAreas = {
        1: 'boran',
        2: 'TEST 05',
        3: 'Field A',
        4: 'Field B',
        5: 'Field C'
      };
      setAreaName(
        mockAreas[selectedAreaId as keyof typeof mockAreas] || 'Unknown Area'
      );
    } else {
      setAreaName('');
    }
  }, [selectedAreaId]);

  return (
    <Card
      className={`overflow-hidden border ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[400px]'}`}
    >
      <div className='absolute top-2 right-2 z-10 flex gap-2'>
        <Button
          variant='secondary'
          size='sm'
          className='h-8 bg-white/90 shadow-sm hover:bg-white'
          onClick={onToggleFullscreen}
        >
          {isFullscreen ? (
            <>
              <Minimize2 className='mr-1.5 h-4 w-4' />
              Exit Fullscreen
            </>
          ) : (
            <>
              <Maximize2 className='mr-1.5 h-4 w-4' />
              Expand Map
            </>
          )}
        </Button>

        {isFullscreen && onClose && (
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8 bg-white/90 shadow-sm hover:bg-white'
            onClick={onClose}
          >
            <X className='h-4 w-4' />
            <span className='sr-only'>Close map</span>
          </Button>
        )}
      </div>

      <div className='flex h-full w-full items-center justify-center bg-slate-100'>
        {/* This is a placeholder for the actual map component */}
        <div className='text-center'>
          <div className='bg-primary/10 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full'>
            <MapPin className='text-primary h-8 w-8' />
          </div>
          <h3 className='text-lg font-medium'>
            {selectedAreaId
              ? `Showing ${areaName} (ID: ${selectedAreaId})`
              : 'Map View'}
          </h3>
          <p className='text-muted-foreground mt-2 max-w-md'>
            {selectedAreaId
              ? "This area's location is displayed on the map. You can zoom and pan to explore."
              : 'All areas are displayed on this map. Click on an area marker to see details.'}
          </p>
          <p className='text-muted-foreground mt-4 text-sm'>
            Map component will be integrated here
          </p>
        </div>
      </div>
    </Card>
  );
}
