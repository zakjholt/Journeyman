import React, { Component } from 'react';
import Sidebar from './Sidebar/Sidebar';

class Layout extends Component {
  componentDidMount() {
    this.state = this.context.store.getState();
  }
  render() {
    return (
      <div className="Layout-container">
        <div className="Layout-header">
          <h1>Journeyman</h1>
          <ul>
            <li>My trips</li>
            <li>Login</li>
            <li>Sign-up</li>
          </ul>
        </div>
        <Sidebar />
      </div>
    );
  }
}
Layout.contextTypes = {
  store: React.PropTypes.object
}
export default Layout;
