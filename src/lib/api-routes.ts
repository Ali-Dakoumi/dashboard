// Define the API routes with their request and response types
export const apiRoutes = {
  auth: {
    signIn: {
      path: '/auth/signin',
      method: 'POST' as const,
      // Define request and response types
      request: {} as {
        email: string;
        password: string;
      },
      response: {} as {
        message: string;
        token: string;
        userid: string;
        email: string;
        username: string;
        user_type: string;
        status: string;
      }
    }
    // Add other auth routes
  },
  user: {
    status: {
      path: '/user/status',
      method: 'GET' as const,
      response: {} as {
        user_type: string;
        status: string;
      }
    },
    updateProfile: {
      path: '/user/profile',
      method: 'PUT' as const,
      request: {} as {
        name?: string;
        email?: string;
      },
      response: {} as {
        message: string;
        success: boolean;
      }
    }
    // Add other user routes
  }
  // Add other API sections
};

// Type helper for extracting request and response types
export type ApiRoute<
  T extends keyof typeof apiRoutes,
  U extends keyof (typeof apiRoutes)[T]
> = (typeof apiRoutes)[T][U];

export type ApiRequest<
  T extends keyof typeof apiRoutes,
  U extends keyof (typeof apiRoutes)[T]
> = (typeof apiRoutes)[T][U]['request'];

export type ApiResponse<
  T extends keyof typeof apiRoutes,
  U extends keyof (typeof apiRoutes)[T]
> = (typeof apiRoutes)[T][U]['response'];
