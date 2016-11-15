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
                {/* <button className='upButton' onClick={() => {
                    this.props.moveItemUp(this.props.index)
                }}>&uarr;</button>
                <button className='downButton' onClick={() => {
                    this.props.moveItemDown(this.props.index)
                }}>&darr;</button> */}
            </div>

        );
    }
}
RouteItem.contextTypes = {
    store: React.PropTypes.object
}
export default RouteItem;
