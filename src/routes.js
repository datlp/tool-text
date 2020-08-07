/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import { lazy } from 'react';

import DashboardLayout from './layouts/ToolTexts';

const routes = [
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/',
        component: lazy(() => import('views/tool-texts/Toolkits'))
      }
    ]
  }
];

export default routes;
