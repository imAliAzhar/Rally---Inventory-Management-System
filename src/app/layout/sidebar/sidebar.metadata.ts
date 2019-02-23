export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'donut_small'
  },
  {
    path: '/login',
    title: 'Suppliers',
    icon: 'people'
  },
  {
    path: '/register',
    title: 'Materials',
    icon: 'poll'
  },
  {
    path: '/orders',
    title: 'Orders',
    icon: 'assignment_turned_in'
  }
];
