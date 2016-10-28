import React, { Component } from 'react';

import CitySearch from './CitySearch';
import RouteItem from './RouteItem';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    route: state.route
  }

}

class Sidebar extends Component {

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    let cityName = document.getElementById('cityName').value;
    this.context.store.dispatch({type: 'ADD_CITY', cityName: cityName})
    document.getElementById('addCity').reset();
  }

  render() {
    let state = this.context.store.getState();
    this.context.store.subscribe(() => {
      state = this.context.store.getState();
    })
    return (
      <div className="Sidebar-container">
        <CitySearch handleSubmit={this.handleSubmit}/>
        {state.route.map((item) => {return <RouteItem key={state.route.indexOf(item)} name={item}/>})}
      </div>
    );
  }
}
Sidebar.contextTypes = {
  store: React.PropTypes.object
}
export default connect(mapStateToProps)(Sidebar);
