/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import { lazy } from 'react';

import DashboardLayout from './layouts/Dashboard';

const routes = [
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('views/About'))
      },
      {
        path: '/About',
        exact: true,
        component: lazy(() => import('views/About'))
      },
      {
        path: '/',
        component: lazy(() => import('views/Toolkits'))
      }
    ]
  }
];

export default routes;
