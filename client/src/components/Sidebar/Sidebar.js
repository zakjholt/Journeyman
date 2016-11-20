import React, {Component} from 'react';

import Autocomplete from 'react-google-autocomplete';

import RouteItem from './RouteItem';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let gasUsed = Math.round((this.props.totalDistance / event.target.value))
        // this.setState({gasUsed: gasUsed})
        document.getElementById('gasUsed').innerText = `Estimated ${gasUsed} gallons of gas`
    }

    render() {
        return (
            <div className="Sidebar-container selected">
                <Autocomplete style={{
                    width: '90%'
                }} onPlaceSelected={(place) => {
                    if (place.hasOwnProperty('geometry')) {
                        this.props.handleSubmit(place);
                    }
                }}/>

                <form>
                    <div className="radio">
                        <label>
                            <input type="radio" value='circuitous' checked={this.props.circuit} onChange={() => {
                                this.props.handleOptionChange(true)
                            }}/>
                            Round-trip
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value='linear' checked={!(this.props.circuit)} onChange={() => {
                                this.props.handleOptionChange(false)
                            }}/>
                            One-way
                        </label>
                    </div>
                </form>
                <div className='route'>
                  {this.props.route
                      ? this.props.route.map((place) => {
                          return <RouteItem key={this.props.route.indexOf(place)} handleDelete={this.props.handleDelete} handleClick={this.props.handleClick} moveItemUp={this.props.moveItemUp} moveItemDown={this.props.moveItemDown} index={this.props.route.indexOf(place)} first={this.props.route.indexOf(place) === 0
                              ? true
                              : false} last={this.props.route.indexOf(place) === this.props.route.length - 1
                              ? true
                              : false} name={place.name}/>
                      })
                      : null}
                </div>
                <div>
                    <p>Total Distance: {Math.round(this.props.totalDistance)} miles</p>
                    <input type="number" placeholder="Estimated mpg" onChange={this.handleChange} />
                    <p id="gasUsed"></p>
                    <button className="saveTripButton btn" onClick={() => this.props.saveTrip()}>Save Trip</button>
                </div>
                
            </div>
        );
    }
}
Sidebar.contextTypes = {
    store: React.PropTypes.object
}
export default Sidebar;
