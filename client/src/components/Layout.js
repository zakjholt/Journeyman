import React, {Component} from 'react';
import {connect} from 'react-redux';
import request from 'superagent';

import Sidebar from './Sidebar/Sidebar';
import MapContainer from './MapContainer';
import POIBar from './POIBar';
import MyTrips from './MyTrips';

class Layout extends Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOptimize = this.handleOptimize.bind(this);
        this.saveTrip = this.saveTrip.bind(this);
        this.closeTrips = this.closeTrips.bind(this);
        this.selectTrip = this.selectTrip.bind(this);
        this.deleteTrip = this.deleteTrip.bind(this);
        this.moveItemUp = this.moveItemUp.bind(this);
        this.moveItemDown = this.moveItemDown.bind(this);
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.state = {
            center: {
                lat: 40,
                lng: -74
            },
            circuit: true,
            selectedCity: undefined,
            selectedCityLocation: undefined,
            route: this.props.route,
            favoritePlaces: this.props.favoritePlaces,
            optimize: false,
            loggedIn: localStorage.userToken
                ? true
                : false,
            tripsOpen: false,
            userTrips: []
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
        this.setState({selectedCityLocation: this.props.route[index].formatted_address, selectedCity: this.props.route[index].name});

    }

    handleOptimize() {
        console.log('handling optimize')
        this.setState({
            optimize: !this.state.optimize
        })
    }

    handleDelete(index) {
        this.context.store.dispatch({type: 'DELETE_CITY', index: index});
        this.setState({selectedCity: undefined, center: this.props.route[0].geometry.location})
    }

    moveItemUp(index) {
        console.log('moving item up')
        this.context.store.dispatch({type: 'MOVE_ITEM_UP', index: index});
        this.setState({route: this.props.route})
    }

    moveItemDown(index) {
        console.log('moving item down')
        this.context.store.dispatch({type: 'MOVE_ITEM_DOWN', index: index});
        this.setState({route: this.props.route})
    }

    toggleFavorite(place) {
        // figure out how to deal with favorite places
        this.context.store.dispatch({type: 'TOGGLE_FAVORITE', place: place})

    }

    saveTrip() {
        if (this.state.loggedIn) {
            let tripName = prompt('Name for the trip');
            console.log('saving current trip as: ', tripName);
            console.log('clientID is: ', JSON.parse(localStorage.userProfile).clientID);
            //Send superagent post with clientID and current route to url endpoint /trips
            request.post('/trips').send({
                clientID: JSON.parse(localStorage.userProfile).clientID,
                tripName: tripName,
                route: this.state.route,
                favoritePlaces: this.state.favoritePlaces
            }).end((err, res) => {
                if (err) {
                    console.log(err.status, err)
                } else {
                    alert('route saved')
                }
            })
        } else {
            alert('You must be logged in to save routes!');
        }
    }

    openTrips() {
        this.setState({tripsOpen: true})
        if (this.state.loggedIn) {
            console.log('getting trips for user: ' + JSON.parse(localStorage.userProfile).clientID);
            //Send superagnet get request with clientID and pass the trips to the mytrips component
            request.get(`/trips/${JSON.parse(localStorage.userProfile).clientID}`).end((err, res) => {
                if (!err) {
                    console.log(res);
                    this.setState({userTrips: res.body.trips, favoritePlaces: res.body.favoritePlaces})
                }
            })
        }
    }

    closeTrips() {
        this.setState({tripsOpen: false})
    }

    deleteTrip(tripIndex) {
        request.del(`/trips/${JSON.parse(localStorage.userProfile).clientID}/${tripIndex}`).end((err, res) => {
            if (!err) {
                console.log(res);
                this.setState({userTrips: res.body})
            }
        })
    }

    selectTrip(route) {
        this.context.store.dispatch({type: 'SET_TRIP', route: route});
        this.closeTrips();
        this.forceUpdate();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({route: nextProps.route, favoritePlaces: nextProps.favoritePlaces})
    }

    componentDidMount() {
        // User uthentication code gets added after layout is rendered
        var lock = new window.Auth0Lock('ThjYqC5StmU4rZvTugoJDl8Z2vgTNl8j', 'zakholt.auth0.com');
        let self = this;

        if (localStorage.userToken) {
            document.getElementById('logged-out').style.display = 'none';
            document.getElementById('logged-in').style.display = 'inline';
        } else {
            document.getElementById('logged-out').style.display = 'inline';
            document.getElementById('logged-in').style.display = 'none';
        }
        document.getElementById('login').addEventListener('click', function() {
            lock.show(function(err, profile, token) {
                if (err) {
                    // Error callback
                    console.error("Something went wrong: ", err);
                } else {
                    // Success calback

                    // Save the JWT token.
                    localStorage.setItem('userToken', token);
                    // Save the profile
                    localStorage.setItem('userProfile', JSON.stringify(profile));

                    //and to state
                    self.setState({loggedIn: true});

                    //change the menu
                    document.getElementById('logged-in').style.display = 'inline'
                    document.getElementById('logged-out').style.display = 'none';
                }
            });
        });
        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userProfile');
            self.context.store.dispatch({type: 'LOGOUT'})
            self.setState({loggedIn: false})
            window.location.href = '/'
            document.getElementById('logged-out').style.display = 'inline';
            document.getElementById('logged-in').style.display = 'none';
        })
    }

    render() {
        return (
            <div className="Layout-container">
                <div className="Layout-header">
                    <h1>Journeyman</h1>
                    <ul>

                        <span id="logged-out">
                            <li id='login'>Login</li>
                        </span>

                        <span id='logged-in'>
                            <li onClick={() => this.openTrips()}>My trips</li>
                            <li id='logout'>Logout</li>
                        </span>

                    </ul>
                </div>
                <Sidebar handleClick={this.handleClick} circuit={this.state.circuit} route={this.state.route} handleSubmit={this.handleSubmit} handleOptionChange={this.handleOptionChange} moveItemUp={this.moveItemUp} moveItemDown={this.moveItemDown} handleDelete={this.handleDelete} handleOptimize={this.handleOptimize} optimize={this.state.optimize} saveTrip={this.saveTrip}/>
                <MapContainer circuit={this.state.circuit} route={this.state.route} center={this.state.center} optimize={this.state.optimize}/>
                <POIBar city={this.state.selectedCity} location={this.state.selectedCityLocation} favoritePlaces={this.state.favoritePlaces} toggleFavorite={this.toggleFavorite}/>
                <MyTrips isOpen={this.state.tripsOpen} closeTrips={this.closeTrips} trips={this.state.userTrips} selectTrip={this.selectTrip} deleteTrip={this.deleteTrip}/>
            </div>
        );

    }
}
Layout.contextTypes = {
    store: React.PropTypes.object
}

export default connect((state) => {
    return {route: state.route, favoritePlaces: state.favoritePlaces}
})(Layout);
