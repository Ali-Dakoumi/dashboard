export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    signIn: '/api/login',
    signUp: '/api/auth/sign-up'
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels'
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search'
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search'
  },
  stats: {
    mapping: 'api/admin/stats/mapping',
    newlySubscribedUsers: 'api/admin/users_perday_reporting',
    newlyAreasCreated: 'api/admin/areas_created_perday'
  },
  user: {
    allUsers: '/api/allUser',
    areas: '/api/areas',
    AreasWithMap: '/api/AreasWithMap',
    connectedUserStatus: '/api/connected_user_stats',
    updateUser: '/api/admin/users/',
    // this endpoint should be updated in back and front
    deleteUser: '/api/users/'
  },
  orders: {
    orders: '/api/orders',
    oneOrder: 'api/orders/order_lines'
  },
  areas: {
    areas: '/api/Area'
  },
  satelliteImagery: {
    update: '/api/admin/satellite/update',
    activate: '/api/admin/satellite/activate'
  },
  cultures: {
    cultures: '/api/PrmCultureFamily',
    addCulture: '/api/PrmCultureFamily',
    culture: 'api/culturesByFamily',
    updateCulture: 'api/Culture',
    deleteSubCulture: '/api/Culture/',
    addSubCulture: '/api/Culture',
    deleteCulture: '/api/PrmCultureFamily/'
  },
  voucher: {
    vouchers: '/api/admin/invoiceService/vouchers',
    addVoucher: '/api/admin/invoiceService/vouchers'
  },
  equipments: {
    equipments: 'api/Equipment',
    dataTypeList: 'api/PrmDataType'
  }
};
