import React, { Component } from 'react';

class RouteItem extends Component {
  render() {
    return (
        <div className='RouteItem' onClick={() => {this.props.handleClick(this.props.index)}}><h3>{this.props.name}</h3> <button onClick={() => {this.props.handleDelete(this.props.index)}}>X</button></div>

    );
  }
}
RouteItem.contextTypes = {
  store: React.PropTypes.object
}
export default RouteItem;
