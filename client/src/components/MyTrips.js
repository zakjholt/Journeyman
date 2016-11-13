import React, { Component } from 'react';

class MyTrips extends Component {

  render() {
    if (this.props.isOpen === false)
      return null
    let boxStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#fff'
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    }

    return (
      <div>
        <div style={boxStyle}>
          <ul className='savedTrips'>
          {this.props.trips.map((trip) => {
            return <li><h3 className='savedTrip' onClick={() => {this.props.selectTrip(trip.route)}}>{trip.tripName}</h3></li>
          })}
          </ul>

        </div>
        <div style={backdropStyle} onClick={(e) => this.close(e)}/>}
      </div>
    )
  }
  close(e) {
    e.preventDefault()

    if (this.props.closeTrips) {
      this.props.closeTrips()
    }
  }
}

export default MyTrips
