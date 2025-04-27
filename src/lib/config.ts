type Platform = 'agrisense' | 'netirrig';
type Environment = 'development' | 'production';

interface PlatformConfig {
  name: string;
  environment: Environment;
  apiUrl: string;
  features: string[];
  // Add any other configuration properties you need
}

// Get the current platform from environment variables
export function getCurrentPlatform(): Platform {
  // This can be set via environment variables or build arguments
  return (process.env.NEXT_PLATFORM as Platform) || 'agrisense';
}

// Get the current environment
export function getCurrentEnvironment(): Environment {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

// Configuration for each platform and environment
const configs: Record<Platform, Record<Environment, PlatformConfig>> = {
  agrisense: {
    development: {
      name: 'AgriSense',
      environment: 'development',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'not able to load it',
      features: ['soil-monitoring', 'weather-forecast', 'crop-analysis']
    },
    production: {
      name: 'AgriSense',
      environment: 'production',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'not able to load it',
      features: [
        'soil-monitoring',
        'weather-forecast',
        'crop-analysis',
        'advanced-analytics'
      ]
    }
  },
  netirrig: {
    development: {
      name: 'NetIrrig',
      environment: 'development',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'not able to load it',
      features: ['irrigation-control', 'water-usage-monitoring']
    },
    production: {
      name: 'NetIrrig',
      environment: 'production',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'not able to load it',
      features: [
        'irrigation-control',
        'water-usage-monitoring',
        'smart-scheduling'
      ]
    }
  }
};

// Get the configuration for the current platform and environment
export function getPlatformConfig(): PlatformConfig {
  const platform = getCurrentPlatform();
  const environment = getCurrentEnvironment();

  return configs[platform][environment];
}
