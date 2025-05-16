// lib/api/routes.ts

export const apiRoutes = {
  auth: {
    signIn: {
      path: '/auth/signin',
      method: 'POST',
      request: {
        email: '',
        password: ''
      },
      response: {
        message: '',
        token: '',
        userid: '',
        email: '',
        username: '',
        user_type: '',
        status: ''
      }
    }
  },
  user: {
    status: {
      path: '/user/status',
      method: 'GET',
      response: {
        user_type: '',
        status: ''
      }
    },
    updateProfile: {
      path: '/user/profile',
      method: 'PUT',
      request: {
        name: '',
        email: ''
      },
      response: {
        message: '',
        success: false
      }
    }
  }
} as const;
