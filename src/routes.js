import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/Dash/:id" component={Dashboard} />
    </BrowserRouter>
  );
}