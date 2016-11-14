import React, {Component} from 'react';

import request from 'superagent';

import POI from './POI'

class POIBar extends Component {
    constructor() {
        super()
        this.state = {
            POIs: []
        }
    }
    componentWillReceiveProps(nextProps) {
        //Send a foursquare request with nextProps.city
        if (nextProps.location) {
            let params = {
                near: nextProps.location,
                client_id: 'G1YOR4SFYW2FWKSYKWRZ2WSSBHM50KLON2Q5NDFDGNUYVGMT',
                client_secret: 'WYK2E3IWCQPPIXJCQRKUOJSHVA1PNAJ1Y230MROWITCWEBIJ',
                v: '20161106',
                m: 'foursquare',
                section: 'drinks'
            }
            request.get(`https://api.foursquare.com/v2/venues/explore`, params).then((res, err) => {
                if (!err) {
                    this.setState({
                        POIs: res.body.response.groups[0].items.map((place) => {
                            return place.venue
                        })
                    })
                } else {
                    console.log(err)
                }
            })
        } else {
            this.setState({POIs: []})
        }
    }

    render() {
        return (
            <div className="POIBar-container">
                <h3>
                    {this.state.POIs.length
                        ? `Top picks in ${this.props.city}`
                        : 'No city selected yet'}
                </h3>
                {this.state.POIs.length
                    ? this.state.POIs.map((place) => {
                        return <POI key={this.state.POIs.indexOf(place)} number={this.state.POIs.indexOf(place) + 1} toggleFavorite={this.props.toggleFavorite} favorite={() => {return this.props.favoritePlaces.indexOf(place) === -1 ? false : true}} place={place}/>
                    })
                    : null}
            </div>
        );
    }
}
POIBar.contextTypes = {
    store: React.PropTypes.object
}
export default POIBar;
