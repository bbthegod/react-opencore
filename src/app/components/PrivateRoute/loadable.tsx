/*
 *
 * Asynchronously loads the component for PrivateRoute
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
