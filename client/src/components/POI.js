import React, {Component} from 'react';

class POI extends Component {

    render() {
        return (
            <div className="POI">
              <h4>{this.props.number}. {this.props.place.name}</h4>
            </div>
        );
    }
}
POI.contextTypes = {
    store: React.PropTypes.object
}
export default POI;
