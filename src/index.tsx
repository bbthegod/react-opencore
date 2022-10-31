import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import App from 'app';
import { configureAppStore } from 'store/configureStore';

const store = configureAppStore();
const root = createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HelmetProvider>
  </Provider>,
);
