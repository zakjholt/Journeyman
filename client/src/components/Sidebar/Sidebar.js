import React, {Component} from 'react';

import Autocomplete from 'react-google-autocomplete';

import RouteItem from './RouteItem';

class Sidebar extends Component {
    render() {
        return (
            <div className="Sidebar-container">
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

                {this.props.route ? this.props.route.map((place) => {
                    return <RouteItem key={this.props.route.indexOf(place)} handleDelete={this.props.handleDelete} handleClick={this.props.handleClick} index={this.props.route.indexOf(place)} name={place.name}/>
                }) : null}
                <button className="saveTripButton" onClick={() => this.props.saveTrip()}>Save Trip</button>
                <button className='toggleButton' onClick={() => {
                    this.props.handleOptimize()
                }}>{this.props.optimize
                        ? 'Unoptimize stops'
                        : 'Optimize stops'}</button>
            </div>
        );
    }
}
Sidebar.contextTypes = {
    store: React.PropTypes.object
}
export default Sidebar;
