/*
 *
 * NotFoundPage
 *
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from 'hook/useAuth';

interface Props {
  protected: boolean;
  entry: boolean;
  children: any;
}

export default function NotFoundPage(props: Props) {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth && props.entry) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!auth && props.protected) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div>
      {/* <h1>Header</h1> */}
      {/* <h1>Sidebar</h1> */}
      <Outlet />
    </div>
  );
}
