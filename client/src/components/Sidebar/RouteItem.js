import React, {Component} from 'react';

class RouteItem extends Component {
    render() {
        return (
            <div className='RouteItem'>
                <h3 onClick={() => {
                    this.props.handleClick(this.props.index)
                }}>{this.props.name}</h3>
                <button className='deleteButton' onClick={() => {
                    this.props.handleDelete(this.props.index)
                }}>X</button>
            </div>

        );
    }
}
RouteItem.contextTypes = {
    store: React.PropTypes.object
}
export default RouteItem;
