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
        path: '/about',
        exact: true,
        component: lazy(() => import('views/About'))
      },
      {
        path: '/',
        exact: true,
        component: lazy(() => import('views/About'))
      },
      {
        path: '/',
        component: lazy(() => import('views/Quiz'))
      }
    ]
  }
];

export default routes;
