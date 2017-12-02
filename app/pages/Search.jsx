import React, { Component } from 'react';
import Page from '../pages/Page';
import SearchContainer from '../containers/Search';

class Search extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Search | reactGo';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Truck Chain' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <SearchContainer {...this.props} />
      </Page>
    );
  }
}

export default Search;

