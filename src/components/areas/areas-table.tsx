'use client';

import React from 'react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Eye,
  Trash2,
  MapPin,
  Layers,
  AlertCircle,
  CheckCircle,
  ChevronUp,
  Leaf,
  Droplets,
  Sun,
  Cloud,
  Tag,
  Clock,
  BarChart3,
  Crop,
  Landmark,
  PenTool,
  Filter,
  Map,
  X
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { AreasHeader } from '@/components/areas/areas-header';
import { MapView } from '@/components/areas/map-view';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Update the mock data to include subareas and more details
const areas = [
  {
    id: 1,
    name: 'boran',
    size: '51.25 Hectar',
    subAreasNumber: 0,
    status: 'Inactive',
    mapImage: '/placeholder.svg?height=80&width=120',
    information: 'INFORMATION AND RECOMMENDATIONS',
    lastUpdated: '2023-10-15',
    cropType: 'None',
    alerts: 2,
    soilType: 'Clay loam',
    productivity: 'Low',
    irrigationType: 'None',
    subareas: []
  },
  {
    id: 2,
    name: 'TEST 05',
    size: '18.29 Hectar',
    subAreasNumber: 0,
    status: 'Active',
    mapImage: '/placeholder.svg?height=80&width=120',
    information: 'INFORMATION AND RECOMMENDATIONS',
    lastUpdated: '2023-11-20',
    cropType: 'Wheat',
    alerts: 0,
    soilType: 'Sandy loam',
    productivity: 'High',
    irrigationType: 'Drip',
    subareas: []
  },
  {
    id: 3,
    name: 'Field A',
    size: '32.45 Hectar',
    subAreasNumber: 2,
    status: 'Active',
    mapImage: '/placeholder.svg?height=80&width=120',
    information: 'INFORMATION AND RECOMMENDATIONS',
    lastUpdated: '2023-12-05',
    cropType: 'Corn',
    alerts: 1,
    soilType: 'Silt loam',
    productivity: 'Medium',
    irrigationType: 'Sprinkler',
    subareas: [
      {
        id: 31,
        name: 'Field A - North',
        size: '18.20 Hectar',
        status: 'Active',
        mapImage: '/placeholder.svg?height=60&width=100',
        lastUpdated: '2023-12-05',
        cropType: 'Corn',
        soilType: 'Silt loam',
        productivity: 'High'
      },
      {
        id: 32,
        name: 'Field A - South',
        size: '14.25 Hectar',
        status: 'Active',
        mapImage: '/placeholder.svg?height=60&width=100',
        lastUpdated: '2023-12-05',
        cropType: 'Corn',
        soilType: 'Silt loam',
        productivity: 'Medium'
      }
    ]
  },
  {
    id: 4,
    name: 'Field B',
    size: '27.80 Hectar',
    subAreasNumber: 1,
    status: 'Active',
    mapImage: '/placeholder.svg?height=80&width=120',
    information: 'INFORMATION AND RECOMMENDATIONS',
    lastUpdated: '2024-01-10',
    cropType: 'Soybeans',
    alerts: 0,
    soilType: 'Clay',
    productivity: 'High',
    irrigationType: 'Flood',
    subareas: [
      {
        id: 41,
        name: 'Field B - East',
        size: '27.80 Hectar',
        status: 'Active',
        mapImage: '/placeholder.svg?height=60&width=100',
        lastUpdated: '2024-01-10',
        cropType: 'Soybeans',
        soilType: 'Clay',
        productivity: 'High'
      }
    ]
  },
  {
    id: 5,
    name: 'Field C',
    size: '15.60 Hectar',
    subAreasNumber: 0,
    status: 'Inactive',
    mapImage: '/placeholder.svg?height=80&width=120',
    information: 'INFORMATION AND RECOMMENDATIONS',
    lastUpdated: '2023-09-30',
    cropType: 'None',
    alerts: 3,
    soilType: 'Sandy',
    productivity: 'Low',
    irrigationType: 'None',
    subareas: []
  }
];

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
    case 'Inactive':
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    default:
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
  }
};

// Helper function to get productivity color
const getProductivityColor = (productivity: string) => {
  switch (productivity) {
    case 'High':
      return 'text-emerald-600';
    case 'Medium':
      return 'text-amber-600';
    case 'Low':
      return 'text-rose-600';
    default:
      return 'text-gray-600';
  }
};

// Helper function to get crop icon
const getCropIcon = (cropType: string) => {
  switch (cropType) {
    case 'Wheat':
      return <Crop className='h-4 w-4 text-amber-600' />;
    case 'Corn':
      return <Crop className='h-4 w-4 text-yellow-600' />;
    case 'Soybeans':
      return <Leaf className='h-4 w-4 text-green-600' />;
    default:
      return <Landmark className='h-4 w-4 text-gray-500' />;
  }
};

// Helper function to get irrigation icon
const getIrrigationIcon = (irrigationType: string) => {
  switch (irrigationType) {
    case 'Drip':
      return <Droplets className='h-4 w-4 text-blue-600' />;
    case 'Sprinkler':
      return <Cloud className='h-4 w-4 text-blue-500' />;
    case 'Flood':
      return <Droplets className='h-4 w-4 text-blue-700' />;
    default:
      return <Sun className='h-4 w-4 text-orange-500' />;
  }
};

export default function AreasTable() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(40);
  const [filter, setFilter] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [showMapView, setShowMapView] = useState(false);

  // Toggle row expansion
  const toggleRowExpansion = (e: React.MouseEvent, areaId: number) => {
    e.stopPropagation();
    setExpandedRows((prev) =>
      prev.includes(areaId)
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId]
    );
  };

  // Check if row is expanded
  const isRowExpanded = (areaId: number) => expandedRows.includes(areaId);

  // Filter areas based on search term and status
  const filteredAreas = areas.filter((area) => {
    const matchesSearch =
      area.name.toLowerCase().includes(filter.toLowerCase()) ||
      area.cropType.toLowerCase().includes(filter.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && area.status === 'Active') ||
      (statusFilter === 'inactive' && area.status === 'Inactive');

    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAreas.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredAreas.length);
  const currentAreas = filteredAreas.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, statusFilter]);

  // Handle row click to navigate to area details or select for map
  const handleRowClick = (areaId: number) => {
    if (showMapView) {
      setSelectedAreaId(areaId);
    } else {
      router.push(`/areas/${areaId}`);
    }
  };

  // Toggle map fullscreen
  const toggleMapFullscreen = () => {
    setIsMapFullscreen(!isMapFullscreen);
  };

  // Toggle map view
  const toggleMapView = () => {
    setShowMapView(!showMapView);
    if (!showMapView) {
      // When enabling map view, reset selected area
      setSelectedAreaId(null);
    }
  };

  return (
    <div className='space-y-6'>
      <AreasHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        filter={filter}
        setFilter={setFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className='from-primary/10 border-primary/20 mb-4 rounded-lg border bg-gradient-to-r to-transparent p-4 shadow-sm'>
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-3'>
            <Button
              variant={showMapView ? 'default' : 'outline'}
              size='lg'
              className='group relative gap-2 overflow-hidden'
              onClick={toggleMapView}
            >
              <div
                className={`bg-primary/10 absolute inset-0 transform transition-transform duration-300 ${showMapView ? 'translate-y-0' : 'translate-y-full'}`}
              ></div>
              <Map className='relative z-10 h-5 w-5' />
              <span className='relative z-10 font-medium'>
                {showMapView ? 'Exit Map View' : 'Map View'}
              </span>
              {!showMapView && (
                <span className='bg-primary absolute top-1 right-2 h-2 w-2 animate-pulse rounded-full'></span>
              )}
            </Button>
            {selectedAreaId && showMapView && (
              <Badge
                variant='outline'
                className='gap-1 bg-white px-3 py-1.5 shadow-sm'
              >
                <MapPin className='text-primary h-3.5 w-3.5' />
                Selected:{' '}
                {areas.find((a) => a.id === selectedAreaId)?.name ||
                  `Area ${selectedAreaId}`}
                <Button
                  variant='ghost'
                  size='icon'
                  className='hover:bg-muted -mr-1 ml-1 h-5 w-5 rounded-full'
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAreaId(null);
                  }}
                >
                  <X className='h-3 w-3' />
                </Button>
              </Badge>
            )}
          </div>

          {!showMapView && (
            <div className='flex justify-end'>
              <Tabs
                value={viewMode}
                onValueChange={setViewMode}
                className='w-[200px]'
              >
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='table'>Table</TabsTrigger>
                  <TabsTrigger value='cards'>Cards</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}
        </div>
        {!showMapView && (
          <p className='text-muted-foreground mt-2 text-sm'>
            Switch to Map View to visualize all areas on an interactive map.
            Select areas to see their boundaries.
          </p>
        )}
      </div>

      {showMapView ? (
        <MapView
          selectedAreaId={selectedAreaId}
          isFullscreen={isMapFullscreen}
          onToggleFullscreen={toggleMapFullscreen}
          onClose={isMapFullscreen ? toggleMapView : undefined}
        />
      ) : (
        <div className='rounded-xl border bg-white shadow-sm'>
          {viewMode === 'table' ? (
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-muted/50'>
                    <TableHead className='w-[30px]'></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>SubAreas</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Crop Type</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Map</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAreas.length > 0 ? (
                    currentAreas.map((area) => (
                      <React.Fragment key={area.id}>
                        <TableRow
                          key={area.id}
                          className='hover:bg-muted/50 cursor-pointer transition-colors'
                          onClick={() => handleRowClick(area.id)}
                        >
                          <TableCell className='px-2'>
                            {area.subAreasNumber > 0 ? (
                              <button
                                onClick={(e) => toggleRowExpansion(e, area.id)}
                                className='hover:bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full transition-colors'
                              >
                                {isRowExpanded(area.id) ? (
                                  <ChevronUp className='text-primary h-3.5 w-3.5' />
                                ) : (
                                  <ChevronDown className='text-muted-foreground h-3.5 w-3.5' />
                                )}
                              </button>
                            ) : (
                              <div className='h-6 w-6' />
                            )}
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center gap-2 font-medium'>
                              <div className='bg-primary/10 flex h-7 w-7 items-center justify-center rounded-full'>
                                <Tag className='text-primary h-3.5 w-3.5' />
                              </div>
                              {area.name}
                              {area.alerts > 0 && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Badge
                                        variant='destructive'
                                        className='flex h-5 w-5 items-center justify-center rounded-full p-0'
                                      >
                                        {area.alerts}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{area.alerts} alerts need attention</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center gap-1.5'>
                              <MapPin className='h-4 w-4 text-rose-500' />
                              {area.size}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center gap-1.5'>
                              <Layers className='h-4 w-4 text-indigo-500' />
                              {area.subAreasNumber}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant='outline'
                              className={`flex items-center gap-1 rounded-full px-3 py-1 ${getStatusColor(area.status)}`}
                            >
                              {area.status === 'Active' ? (
                                <CheckCircle className='h-3 w-3' />
                              ) : (
                                <AlertCircle className='h-3 w-3' />
                              )}
                              {area.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center gap-1.5'>
                              {getCropIcon(area.cropType)}
                              <span>{area.cropType || 'None'}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='text-muted-foreground flex items-center gap-1.5'>
                              <Clock className='h-4 w-4 text-sky-500' />
                              {area.lastUpdated}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='group relative h-[60px] w-[100px] overflow-hidden rounded-md border'>
                              <Image
                                src={area.mapImage || '/placeholder.svg'}
                                alt={`Map of ${area.name}`}
                                fill
                                className='object-cover transition-transform group-hover:scale-110'
                              />
                              <div className='absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-1 opacity-0 transition-opacity group-hover:opacity-100'>
                                <div className='flex items-center gap-1 text-xs text-white'>
                                  <MapPin className='h-3 w-3 text-white' />
                                  <span>View</span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className='text-right'>
                            <div
                              className='flex items-center justify-end gap-1'
                              onClick={(e) => e.stopPropagation()}
                            >
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant='ghost'
                                      size='icon'
                                      className='h-8 w-8 rounded-full text-sky-600'
                                    >
                                      <Eye className='h-4 w-4' />
                                      <span className='sr-only'>
                                        View details
                                      </span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View details</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant='ghost'
                                      size='icon'
                                      className='h-8 w-8 rounded-full text-amber-600'
                                    >
                                      <Edit className='h-4 w-4' />
                                      <span className='sr-only'>Edit</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit area</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant='ghost'
                                      size='icon'
                                      className='text-destructive hover:text-destructive h-8 w-8 rounded-full'
                                    >
                                      <Trash2 className='h-4 w-4' />
                                      <span className='sr-only'>Delete</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete area</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Expandable row for subareas */}
                        {isRowExpanded(area.id) && area.subareas.length > 0 && (
                          <TableRow className='bg-primary/5 border-l-primary/30 border-l-4'>
                            <TableCell colSpan={9} className='p-0'>
                              <div className='animate-in slide-in-from-top-2 p-4 pl-12 duration-200'>
                                <div className='text-primary mb-3 flex items-center gap-1.5 text-sm font-medium'>
                                  <Layers className='h-4 w-4' />
                                  SubAreas
                                </div>
                                <div className='space-y-2'>
                                  {area.subareas.map((subarea) => (
                                    <div
                                      key={subarea.id}
                                      className='border-muted hover:border-primary/30 hover:bg-primary/5 flex cursor-pointer items-center gap-4 rounded-md border bg-white p-3 transition-colors'
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/areas/${subarea.id}`);
                                      }}
                                    >
                                      <div className='relative h-[40px] w-[60px] overflow-hidden rounded-md border'>
                                        <Image
                                          src={
                                            subarea.mapImage ||
                                            '/placeholder.svg'
                                          }
                                          alt={`Map of ${subarea.name}`}
                                          fill
                                          className='object-cover'
                                        />
                                      </div>
                                      <div>
                                        <div className='flex items-center gap-1.5 font-medium'>
                                          {subarea.name}
                                          <div
                                            className={`h-2 w-2 rounded-full ${
                                              getProductivityColor(
                                                subarea.productivity
                                              ) === 'text-emerald-600'
                                                ? 'bg-emerald-500'
                                                : getProductivityColor(
                                                      subarea.productivity
                                                    ) === 'text-amber-600'
                                                  ? 'bg-amber-500'
                                                  : 'bg-rose-500'
                                            }`}
                                          ></div>
                                        </div>
                                        <div className='text-muted-foreground mt-1 flex items-center gap-3 text-xs'>
                                          <div className='flex items-center gap-1'>
                                            <MapPin className='h-3 w-3' />
                                            {subarea.size}
                                          </div>
                                          <div className='flex items-center gap-1'>
                                            {getCropIcon(subarea.cropType)}
                                            {subarea.cropType}
                                          </div>
                                        </div>
                                      </div>
                                      <Badge
                                        variant='outline'
                                        className={`ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${getStatusColor(
                                          subarea.status
                                        )}`}
                                      >
                                        {subarea.status}
                                      </Badge>
                                      <Button
                                        variant='ghost'
                                        size='icon'
                                        className='text-muted-foreground hover:text-primary ml-auto h-7 w-7 rounded-full'
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          router.push(`/areas/${subarea.id}`);
                                        }}
                                      >
                                        <ChevronRight className='h-4 w-4' />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className='h-24 text-center'>
                        <div className='text-muted-foreground flex flex-col items-center justify-center'>
                          <Filter className='mb-2 h-8 w-8 opacity-40' />
                          <p>No areas match your filters</p>
                          <Button
                            variant='link'
                            className='mt-2'
                            onClick={() => {
                              setFilter('');
                              setStatusFilter('all');
                            }}
                          >
                            Clear filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className='p-4'>
              {currentAreas.length > 0 ? (
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  {currentAreas.map((area) => (
                    <div key={area.id}>
                      <Card
                        className='cursor-pointer overflow-hidden border-t-4 transition-shadow hover:shadow-md'
                        style={{
                          borderTopColor:
                            area.status === 'Active'
                              ? 'rgb(16, 185, 129)'
                              : area.status === 'Inactive'
                                ? 'rgb(156, 163, 175)'
                                : 'rgb(59, 130, 246)'
                        }}
                        onClick={() => handleRowClick(area.id)}
                      >
                        <div className='relative h-[120px] w-full'>
                          <Image
                            src={area.mapImage || '/placeholder.svg'}
                            alt={`Map of ${area.name}`}
                            fill
                            className='object-cover'
                          />
                          <div className='absolute top-2 right-2'>
                            <Badge
                              variant='outline'
                              className={`flex items-center gap-1 rounded-full px-3 py-1 ${getStatusColor(
                                area.status
                              )} bg-opacity-90 backdrop-blur-sm`}
                            >
                              {area.status === 'Active' ? (
                                <CheckCircle className='h-3 w-3' />
                              ) : (
                                <AlertCircle className='h-3 w-3' />
                              )}
                              {area.status}
                            </Badge>
                          </div>
                          <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-2'>
                            <div className='flex items-center gap-1.5'>
                              <div className='flex h-6 w-6 items-center justify-center rounded-full bg-white'>
                                <Tag className='text-primary h-3 w-3' />
                              </div>
                              <h3 className='font-medium text-white'>
                                {area.name}
                              </h3>
                              {area.alerts > 0 && (
                                <Badge
                                  variant='destructive'
                                  className='ml-auto flex h-5 w-5 items-center justify-center rounded-full p-0'
                                >
                                  {area.alerts}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <CardContent className='p-4'>
                          <div className='grid grid-cols-2 gap-3 text-sm'>
                            <div className='space-y-3'>
                              <div className='flex items-center gap-1.5'>
                                <MapPin className='h-4 w-4 text-rose-500' />
                                <span className='text-muted-foreground'>
                                  Size:
                                </span>
                                <span className='ml-auto font-medium'>
                                  {area.size}
                                </span>
                              </div>
                              <div className='flex items-center gap-1.5'>
                                <Layers className='h-4 w-4 text-indigo-500' />
                                <span className='text-muted-foreground'>
                                  SubAreas:
                                </span>
                                <span className='ml-auto font-medium'>
                                  {area.subAreasNumber}
                                </span>
                              </div>
                              <div className='flex items-center gap-1.5'>
                                {getCropIcon(area.cropType)}
                                <span className='text-muted-foreground'>
                                  Crop:
                                </span>
                                <span className='ml-auto font-medium'>
                                  {area.cropType || 'None'}
                                </span>
                              </div>
                            </div>
                            <div className='space-y-3'>
                              <div className='flex items-center gap-1.5'>
                                <PenTool className='h-4 w-4 text-purple-500' />
                                <span className='text-muted-foreground'>
                                  Soil:
                                </span>
                                <span className='ml-auto font-medium'>
                                  {area.soilType}
                                </span>
                              </div>
                              <div className='flex items-center gap-1.5'>
                                {getIrrigationIcon(area.irrigationType)}
                                <span className='text-muted-foreground'>
                                  Irrigation:
                                </span>
                                <span className='ml-auto font-medium'>
                                  {area.irrigationType}
                                </span>
                              </div>
                              <div className='flex items-center gap-1.5'>
                                <BarChart3
                                  className={`h-4 w-4 ${getProductivityColor(area.productivity)}`}
                                />
                                <span className='text-muted-foreground'>
                                  Productivity:
                                </span>
                                <span
                                  className={`ml-auto font-medium ${getProductivityColor(area.productivity)}`}
                                >
                                  {area.productivity}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className='mt-4 flex items-center justify-between border-t pt-3'>
                            <div className='text-muted-foreground flex items-center gap-1.5 text-xs'>
                              <Clock className='h-3.5 w-3.5 text-sky-500' />
                              Updated: {area.lastUpdated}
                            </div>
                            <div
                              className='flex gap-1'
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 rounded-full text-sky-600'
                              >
                                <Eye className='h-4 w-4' />
                              </Button>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 rounded-full text-amber-600'
                              >
                                <Edit className='h-4 w-4' />
                              </Button>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='text-destructive hover:text-destructive h-8 w-8 rounded-full'
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                            </div>
                          </div>

                          {area.subAreasNumber > 0 && (
                            <div className='mt-3 border-t pt-2'>
                              <Button
                                variant='outline'
                                size='sm'
                                className='h-8 w-full gap-1.5'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleRowExpansion(e, area.id);
                                }}
                              >
                                {isRowExpanded(area.id) ? (
                                  <>
                                    <ChevronUp className='h-3.5 w-3.5' />
                                    Hide SubAreas
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className='h-3.5 w-3.5' />
                                    Show SubAreas ({area.subAreasNumber})
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Expandable card for subareas */}
                      {isRowExpanded(area.id) && area.subareas.length > 0 && (
                        <div className='bg-primary/5 border-primary/20 animate-in slide-in-from-top-2 mt-2 mb-4 rounded-lg border p-3 duration-200'>
                          <div className='text-primary mb-2 flex items-center gap-1.5 text-sm font-medium'>
                            <Layers className='h-4 w-4' />
                            SubAreas
                          </div>
                          <div className='space-y-2'>
                            {area.subareas.map((subarea) => (
                              <div
                                key={subarea.id}
                                className='border-muted hover:border-primary/30 hover:bg-primary/5 flex cursor-pointer items-center gap-3 rounded-md border bg-white p-3 transition-colors'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/areas/${subarea.id}`);
                                }}
                              >
                                <div className='relative h-[40px] w-[60px] overflow-hidden rounded-md border'>
                                  <Image
                                    src={subarea.mapImage || '/placeholder.svg'}
                                    alt={`Map of ${subarea.name}`}
                                    fill
                                    className='object-cover'
                                  />
                                </div>
                                <div>
                                  <div className='flex items-center gap-1.5 font-medium'>
                                    {subarea.name}
                                    <div
                                      className={`h-2 w-2 rounded-full ${
                                        getProductivityColor(
                                          subarea.productivity
                                        ) === 'text-emerald-600'
                                          ? 'bg-emerald-500'
                                          : getProductivityColor(
                                                subarea.productivity
                                              ) === 'text-amber-600'
                                            ? 'bg-amber-500'
                                            : 'bg-rose-500'
                                      }`}
                                    ></div>
                                  </div>
                                  <div className='text-muted-foreground mt-1 flex items-center gap-3 text-xs'>
                                    <div className='flex items-center gap-1'>
                                      <MapPin className='h-3 w-3' />
                                      {subarea.size}
                                    </div>
                                    <div className='flex items-center gap-1'>
                                      {getCropIcon(subarea.cropType)}
                                      {subarea.cropType}
                                    </div>
                                  </div>
                                </div>
                                <Badge
                                  variant='outline'
                                  className={`ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${getStatusColor(
                                    subarea.status
                                  )}`}
                                >
                                  {subarea.status}
                                </Badge>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='text-muted-foreground hover:text-primary ml-auto h-7 w-7 rounded-full'
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/areas/${subarea.id}`);
                                  }}
                                >
                                  <ChevronRight className='h-4 w-4' />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-muted-foreground flex h-40 flex-col items-center justify-center'>
                  <Filter className='mb-2 h-8 w-8 opacity-40' />
                  <p>No areas match your filters</p>
                  <Button
                    variant='link'
                    className='mt-2'
                    onClick={() => {
                      setFilter('');
                      setStatusFilter('all');
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {currentAreas.length > 0 && (
            <div className='flex items-center justify-between border-t px-4 py-2'>
              <div className='flex items-center gap-2'>
                <Select
                  value={rowsPerPage.toString()}
                  onValueChange={(value) =>
                    setRowsPerPage(Number.parseInt(value))
                  }
                >
                  <SelectTrigger className='h-8 w-[70px]'>
                    <SelectValue>{rowsPerPage} rows</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='10'>10 rows</SelectItem>
                    <SelectItem value='20'>20 rows</SelectItem>
                    <SelectItem value='40'>40 rows</SelectItem>
                    <SelectItem value='100'>100 rows</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex items-center gap-1 text-sm'>
                <span>
                  {startIndex + 1}-{endIndex} of {filteredAreas.length}
                </span>
                <div className='flex items-center'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8'
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className='h-4 w-4' />
                    <span className='sr-only'>First page</span>
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8'
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className='h-4 w-4' />
                    <span className='sr-only'>Previous page</span>
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8'
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className='h-4 w-4' />
                    <span className='sr-only'>Next page</span>
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8'
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className='h-4 w-4' />
                    <span className='sr-only'>Last page</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
