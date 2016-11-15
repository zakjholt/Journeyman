import React, {Component} from 'react';

class RouteItem extends Component {
    render() {
        let movement;
        if (this.props.first) {
            movement = (
                <div>
                    <button className='downButton' onClick={() => {
                        this.props.moveItemDown(this.props.index)
                    }}>&darr;</button>
                </div>
            )
        } else if (this.props.last) {
            movement = (
                <div>
                    <button className='upButton' onClick={() => {
                        this.props.moveItemUp(this.props.index)
                    }}>&uarr;</button>
                </div>

            );
        } else {
            movement = (
                <div>
                    <button className='upButton' onClick={(event) => {
                        event.preventDefault();
                        this.props.moveItemUp(this.props.index)
                    }}>&uarr;</button>
                    <button className='downButton' onClick={(event) => {
                        event.preventDefault();
                        this.props.moveItemDown(this.props.index)
                    }}>&darr;</button>
                </div>
            );
        }
        return (
            <div className='RouteItem'>
                <h3 onClick={() => {
                    this.props.handleClick(this.props.index)
                }}>{this.props.name}</h3>
                <button className='deleteButton' onClick={() => {
                    this.props.handleDelete(this.props.index)
                }}>X</button>
                {movement}

            </div>

        );
    }
}
RouteItem.contextTypes = {
    store: React.PropTypes.object
}
export default RouteItem;
