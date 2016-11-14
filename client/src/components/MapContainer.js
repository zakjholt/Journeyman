import React, {Component} from 'react';

var directionsService = new window.google.maps.DirectionsService()
class MapContainer extends Component {

    renderDirections(nextProps) {
        if (nextProps.route) {
          let firstPoint = nextProps.route[0].geometry.location;
          let lastPoint = nextProps.route[nextProps.route.length - 1].geometry.location;
          let waypoints = [];
          for (var i = 1; i < nextProps.route.length; i++) {
              waypoints.push({location: nextProps.route[i].formatted_address})
          }
          let request = {
              origin: firstPoint,
              destination: nextProps.circuit
                  ? firstPoint
                  : lastPoint,
              travelMode: 'DRIVING',
              waypoints: waypoints,
              optimizeWaypoints: nextProps.optimize
          };
          directionsService.route(request, (result, status) => {
              if (status === 'OK') {
                  this.directionsDisplay.setDirections(result);
                  // Result has all of the route details like distance
                  // console.log(result)
              }
          })
          this.directionsDisplay.setMap(this.map);
        }

    }

    componentWillReceiveProps(nextProps) {
        // workaround for directions bug if you delete points before there are enough
        if (nextProps.route) {
          if (nextProps.route.length < 2 && this.props.route.length > nextProps.route.length) {
            window.location.href = '/';
          }

          if (nextProps.route.length === 1) {
              this.map.panTo(nextProps.center)
              this.firstMarker = new window.google.maps.Marker({position: nextProps.route[0].geometry.location, title: nextProps.route[0].name})
              this.firstMarker.setMap(this.map);
          }

          if (nextProps.route.length > 1 || nextProps.route.length < this.props.route.length) {
              this.renderDirections(nextProps);
          }

          this.directionsDisplay.setMap(this.map);
        }
    }


    componentDidMount() {
        this.directionsDisplay = new window.google.maps.DirectionsRenderer();
        this.map = new window.google.maps.Map(this.refs.map, {
            center: this.props.center,
            zoom: 5
        });
        if (this.props.route.length > 0) {
            this.renderDirections(this.props)
        }
    }


    shouldComponentUpdate() {
      return false;
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
