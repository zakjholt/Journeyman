import React, {Component} from 'react';

var directionsService = new window.google.maps.DirectionsService()
class MapContainer extends Component {

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        // center map on most recently added destination
        if (nextProps.route.length === 1) {
          this.map.panTo(nextProps.center)
          var marker = new window.google.maps.Marker({position: nextProps.route[0].geometry.location, title: nextProps.route[0].name})
          marker.setMap(this.map);
        }

        if (nextProps.route.length > 1) {
          let firstPoint = nextProps.route[0].geometry.location;
          let lastPoint = nextProps.route[nextProps.route.length-1].geometry.location;
          let waypoints = [];
          for (var i = 1; i < nextProps.route.length; i++) {
            waypoints.push({location: nextProps.route[i].formatted_address})
          }
          let request = {
            origin: firstPoint,
            destination: nextProps.circuit ? firstPoint : lastPoint,
            travelMode: 'DRIVING',
            waypoints: waypoints
          };
          directionsService.route(request, (result, status) => {
            if (status === 'OK') {
              this.directionsDisplay.setDirections(result);
              // Result has all of the route details like distance
            }
          })
        }

        this.directionsDisplay.setMap(this.map);




    }

    componentDidMount() {
        this.directionsDisplay = new window.google.maps.DirectionsRenderer();
        this.map = new window.google.maps.Map(this.refs.map, {
            center: this.props.center,
            zoom: 5
        });
    }

    render() {
        return (
            <div className='Map-container'>

                <div id="map" ref="map"></div>

            </div>
        )
    }
}
MapContainer.contextTypes = {
    store: React.PropTypes.object
}
export default MapContainer
