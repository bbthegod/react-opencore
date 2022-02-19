/*
 *
 * PrivateRoute
 *
 */
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'hook/useAuth';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const [auth] = useAuth();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
