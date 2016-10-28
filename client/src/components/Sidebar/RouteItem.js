import React, { Component } from 'react';

class RouteItem extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}
RouteItem.contextTypes = {
  store: React.PropTypes.object
}
export default RouteItem;
