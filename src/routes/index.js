import {lazy} from "react";

const Auth = lazy(() => import('@pages/Auth'));
const Add = lazy(() => import('@pages/Add'));
const About = lazy(() => import('@pages/About'));
const Dashboard = lazy(() => import('@pages/Dashboard'));
const PageNotFound = lazy(() => import('@pages/PageNotFound'));
const Settings = lazy(() => import('@pages/Settings'));
const Stats = lazy(() => import('@pages/Stats'));
const View = lazy(() => import('@pages/View'));
const Workouts = lazy(() => import('@pages/Workouts'));

export let privateRoutes = [
  {index: 'true', element: Dashboard, },
  {path: 'add', element: Add},
  {path: 'workouts', element: Workouts},
  {path: 'workouts/:id', element: View},
  {path: 'stats', element: Stats},
  {path: 'about', element: About},
  {path: 'settings', element: Settings},
  {path: "*", element: PageNotFound},
];

export let publicRoutes = [
  {path: '/', element: Auth},
  {path: 'about', element: About},
  {path: "*", element: Auth},
];