import React, {Component} from 'react';
import {connect} from 'react-redux'

import Sidebar from './Sidebar/Sidebar';
import MapContainer from './MapContainer';
import POIBar from './POIBar';

class Layout extends Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOptimize = this.handleOptimize.bind(this);
        this.state = {
            center: {
                lat: 40,
                lng: -74
            },
            circuit: true,
            selectedCity: undefined,
            selectedCityLocation: undefined,
            route: this.props.route,
            optimize: false
        }

    }

    handleSubmit(place) {
        this.context.store.dispatch({type: 'ADD_CITY', cityObject: place});
        this.setState({center: place.geometry.location})
        document.getElementsByTagName('input')[0].value = ''

    }

    handleOptionChange(b) {
        this.setState({circuit: b})
    }

    handleClick(index) {
        this.setState({
            selectedCityLocation: `${this.props.route[index].geometry.location.lat()}, ${this.props.route[index].geometry.location.lng()}`,
            selectedCity: this.props.route[index].name
        });

    }

    handleOptimize() {
        console.log('handling optimize')
        this.setState({optimize: !this.state.optimize})
    }

    handleDelete(index) {
        this.context.store.dispatch({type: 'DELETE_CITY', index: index});
        this.setState({selectedCity: undefined, center: this.props.route[0].geometry.location})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({route: nextProps.route})
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
                <Sidebar
                    handleClick={this.handleClick}
                    circuit={this.state.circuit}
                    route={this.state.route}
                    handleSubmit={this.handleSubmit}
                    handleOptionChange={this.handleOptionChange}
                    handleDelete={this.handleDelete}
                    handleOptimize={this.handleOptimize}
                    optimize={this.state.optimize} />
                <MapContainer
                    circuit={this.state.circuit}
                    route={this.state.route}
                    center={this.state.center}
                    optimize={this.state.optimize} />
                <POIBar city={this.state.selectedCity} location={this.state.selectedCityLocation}/>
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
