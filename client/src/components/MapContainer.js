import React, {Component} from 'react';


var labels = 'ABCDEFGH'

class MapContainer extends Component {

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.map.panTo(nextProps.center)
    this.props.route.map((place) => {
      var marker = new window.google.maps.Marker({
        position: place.geometry.location,
        title: place.name,
        label: labels[this.props.route.indexOf(place)]
      })
      marker.setMap(this.map);
    })

  }

  componentDidMount() {
    this.map = new window.google.maps.Map(this.refs.map, {
      center: this.props.center,
      zoom: 8
    });
  }

    render() {
        return (
            <div className='Map-container'>

                <div id="map" ref="map">

                </div>

            </div>
        )
    }
}
MapContainer.contextTypes = {
    store: React.PropTypes.object
}
export default MapContainer
