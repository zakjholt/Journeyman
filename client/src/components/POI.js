import React, {Component} from 'react';

class POI extends Component {
    constructor(props) {
      super(props)
      this.state = {
        favorite: this.props.favorite()
      }
    }
    render() {
        return (
            <div className="POI">
                <h4>{this.props.number}. {this.props.place.name}</h4>
                <p>
                    <em>{this.props.place.categories[0].name}</em>
                </p>
                <i className={`fa ${this.state.favorite ? 'fa-star' : 'fa-star-o'}`} onClick={() => {this.setState({favorite: !this.state.favorite}); this.props.toggleFavorite(this.props.place)}} aria-hidden='true'></i>
            </div>
        );
    }
}
POI.contextTypes = {
    store: React.PropTypes.object
}
export default POI;
