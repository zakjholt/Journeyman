import React, {Component} from 'react';
import {connect} from 'react-redux'

import Sidebar from './Sidebar/Sidebar';
import MapContainer from './MapContainer'

class Layout extends Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            center: {
                lat: -34,
                lng: 150.6
            }
        }

    }

    handleSubmit(place) {
        this.context.store.dispatch({type: 'ADD_CITY', cityObject: place});
        this.setState({center: place.geometry.location})

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
                <Sidebar handleSubmit={this.handleSubmit}/>
                <MapContainer route={this.props.route} center={this.state.center}/>
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
