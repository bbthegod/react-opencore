import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Routers from 'app/routers';
import 'assets/styles/style.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s | React Opencore" defaultTitle="React Opencore">
        <meta name="description" content="React application" />
      </Helmet>
      <Routers />
    </BrowserRouter>
  );
}
