import React, {Component} from 'react';

var hasClass, addClass, removeClass;

if ('classList' in document.documentElement) {
  hasClass = function (el, className) { return el.classList.contains(className); };
  addClass = function (el, className) { el.classList.add(className); };
  removeClass = function (el, className) { el.classList.remove(className); };
} else {
  hasClass = function (el, className) {
      return new RegExp('\\b'+ className+'\\b').test(el.className);
  };
  addClass = function (el, className) {
      if (!hasClass(el, className)) { el.className += ' ' + className; }
  };
  removeClass = function (el, className) {
      el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
  };
}


class RouteItem extends Component {
  goToPOIs() {
    removeClass(document.getElementsByClassName('selected')[0], 'selected')
    addClass(document.getElementsByClassName('POIBar-container')[0], 'selected')

    removeClass(document.getElementsByClassName('SelectedBarItem')[0], 'SelectedBarItem')
    addClass(document.getElementsByClassName('MobileBarItem')[2], 'SelectedBarItem')
  }
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
                    this.props.handleClick(this.props.index);
                    this.goToPOIs();
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
