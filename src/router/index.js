import Workouts from "../pages/Workouts";
import About from "../pages/About";
import View from "../pages/View";
import Add from "../pages/Add";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login";
import SettingsPage from "../pages/Settings.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Stats from "../pages/Stats";

export let privateRoutes = [
  {index: 'true', element: Dashboard, },
  {path: 'add', element: Add},
  {path: 'workouts', element: Workouts},
  {path: 'workouts/:id', element: View},
  {path: 'stats', element: Stats},
  {path: 'about', element: About},
  {path: 'settings', element: SettingsPage},
  {path: '/login', navigate: true,},
  {path: "*", element: PageNotFound},
];

export let publicRoutes = [
  {path: '/', element: Login},
  {path: '/login', element: Login},
  {path: '/about', element: About},
  {path: "*", element: Login},
];