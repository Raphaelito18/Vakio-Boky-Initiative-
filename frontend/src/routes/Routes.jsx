import Explore from '@/pages/Explore/Explore';
import Home from '@/pages/Home/Home';
import Marketplace from '@/pages/Marketplace/Marketplace';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/explore' component={Explore} />
        <Route path='/marketplace' component={Marketplace} />
      </Switch>
    </Router>
  );
}
