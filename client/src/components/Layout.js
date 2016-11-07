import React, {Component} from 'react';
import {connect} from 'react-redux'

import Sidebar from './Sidebar/Sidebar';
import MapContainer from './MapContainer';
import POIBar from './POIBar';

class Layout extends Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            center: {
                lat: -34,
                lng: 150.6
            },
            circuit: true,
            selectedCity: undefined
        }

    }

    handleSubmit(place) {
        this.context.store.dispatch({type: 'ADD_CITY', cityObject: place});
        this.setState({center: place.geometry.location})

    }

    handleOptionChange(b) {
      this.setState({circuit: b})
    }

    handleClick(index) {
      this.setState({selectedCity: this.props.route[index].name})

    }

    handleDelete(index) {
      this.context.store.dispatch({type: 'DELETE_CITY', index: index});
      this.setState({selectedCity: undefined})
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
                <Sidebar handleClick={this.handleClick} circuit={this.state.circuit} route={this.props.route} handleSubmit={this.handleSubmit} handleOptionChange={this.handleOptionChange} handleDelete={this.handleDelete} />
                <MapContainer circuit={this.state.circuit} route={this.props.route} center={this.state.center}/>
                <POIBar city={this.state.selectedCity} />
            </div>
        );
    }
}
Layout.contextTypes = {
    store: React.PropTypes.object
}

export default connect((state) => {
    return {route: state.route}
})(Layout);
