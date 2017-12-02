import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchSearchData } from './fetch-data';
import { App, Search, About, Carrier } from './pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Search} fetchData={fetchSearchData} />
      <Route path="about" component={About} />
      <Route path="carrier/:name" component={Carrier} />
    </Route>
  );
};
