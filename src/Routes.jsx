import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Results from "./Results";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/:search">
        <Results />
      </Route>
      <Route path="/">
        <Results />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
