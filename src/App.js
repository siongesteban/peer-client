import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Layout from './modules/Layout';

import { switchPage } from './modules/Layout/LayoutActions';

class App extends Component {
  componentDidUpdate() {
    this.props.switchPage();
  }

  render() {
    return <Layout />;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  switchPage
}, dispatch);

App = connect(null, mapDispatchToProps)(App);
App = withRouter(App);

export default App;