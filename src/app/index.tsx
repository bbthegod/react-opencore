import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './containers/HomePage';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
