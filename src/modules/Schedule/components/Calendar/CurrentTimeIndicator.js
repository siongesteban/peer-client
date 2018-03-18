import React, { Component } from 'react';

import { toTimeString } from './helpers';

class CurrentTimeIndicator extends Component {
	state = {
		now: new Date
	};
  
  componentDidMount() {
  	const seconds = this.state.now.getSeconds();
    
    this.timeout = setTimeout(() => {
    	this.updateDate();
      this.interval = setInterval(this.updateDate, 60 * 1000);
    }, (60 - seconds) * 1000);
  }
  
  componentWillUnmount() {
  	clearTimeout(this.timeout);
  	clearInterval(this.interval);
  }
  
  updateDate = () => {
  	this.setState({
      now: new Date
    });
  };
  
  getPercentage = () => {
  	const { now } = this.state;
  	const minutesPassed = now.getHours() * 60 + now.getMinutes();
    
  	return (minutesPassed * 100 / 1440);
  };
  
  render() {
  	const { now } = this.state; 
  	const style = {
      top: this.getPercentage() + '%'
    };
  
    return (
      <div className="calendar__current-time" style={style}>
        <div className="calendar__current-time__text">
          {toTimeString(now.getHours(), now.getMinutes())}
        </div>
      </div>
    );
  }
};

export default CurrentTimeIndicator;