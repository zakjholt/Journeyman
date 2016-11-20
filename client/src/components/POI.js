import React, {Component} from 'react';

class POI extends Component {
   
    render() {
        return (
            <div className="POI">
                <h4>{this.props.number}. <a target='_blank' href={`http://foursquare.com/venue/${this.props.place.id}`}>{this.props.place.name}</a></h4>
                <p>
                    <em>{this.props.place.categories[0].name}</em>
                </p>
                <i className={`fa ${this.props.favorite ? 'fa-star' : 'fa-star-o'}`} onClick={() => {this.props.toggleFavorite(this.props.place)}} aria-hidden='true'></i>
            </div>
        );
    }
}
POI.contextTypes = {
    store: React.PropTypes.object
}
export default POI;
