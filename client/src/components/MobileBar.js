import React, { Component } from 'react';

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

class MobileBar extends Component {

  selectSection(string) {
    if (string === 'route') {
      removeClass(document.getElementsByClassName('selected')[0], 'selected')
      addClass(document.getElementsByClassName('Sidebar-container')[0], 'selected')

      removeClass(document.getElementsByClassName('SelectedBarItem')[0], 'SelectedBarItem')
      addClass(document.getElementsByClassName('MobileBarItem')[0], 'SelectedBarItem')
    } else if (string === 'map') {
      removeClass(document.getElementsByClassName('selected')[0], 'selected')
      addClass(document.getElementsByClassName('Map-container')[0], 'selected')

      removeClass(document.getElementsByClassName('SelectedBarItem')[0], 'SelectedBarItem')
      addClass(document.getElementsByClassName('MobileBarItem')[1], 'SelectedBarItem')
    } else {
      removeClass(document.getElementsByClassName('selected')[0], 'selected')
      addClass(document.getElementsByClassName('POIBar-container')[0], 'selected')

      removeClass(document.getElementsByClassName('SelectedBarItem')[0], 'SelectedBarItem')
      addClass(document.getElementsByClassName('MobileBarItem')[2], 'SelectedBarItem')
    }
  }

  render() {
    return (
      <div className='MobileBar'>
        <div className="MobileBarItem SelectedBarItem" onClick={() => {this.selectSection('route')}}>Route</div>
        <div className="MobileBarItem" onClick={() => {this.selectSection('map')}}>Map</div>
        <div className="MobileBarItem" onClick={() => {this.selectSection('pois')}}>POIs</div>
      </div>
    )
  }
}

export default MobileBar
