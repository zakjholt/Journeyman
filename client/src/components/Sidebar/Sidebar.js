import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';

import RouteItem from './RouteItem';

class Sidebar extends Component {

  render() {
    let state = this.context.store.getState();
    this.context.store.subscribe(() => {
      state = this.context.store.getState();
    })
    return (
      <div className="Sidebar-container">
        <Autocomplete style={{width: '80%'}} onPlaceSelected={(place) => {
          this.props.handleSubmit(place);
        }}/>
        {state.route.map((item) => {return <RouteItem key={state.route.indexOf(item)} name={item.name}/>})}
      </div>
    );
  }
}
Sidebar.contextTypes = {
  store: React.PropTypes.object
}
export default Sidebar;
