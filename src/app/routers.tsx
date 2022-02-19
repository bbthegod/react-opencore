import { useRoutes } from 'react-router-dom';
import PrivateRoute from 'app/components/PrivateRoute/loadable';
import NotFoundPage from 'app/components/NotFoundPage/loadable';
import HomePage from 'app/containers/HomePage/loadable';

const routers = [
  //Router for authentication
  {
    path: '/',
    element: <PrivateRoute />,
    children: [{ path: '/', element: <HomePage /> }],
  },
  //Router for public
  {
    authentication: false,
    element: <NotFoundPage />,
    path: '*',
  },
];

export default function Routers() {
  return useRoutes(routers);
}
