import React, { Component } from 'react';

class TTCDirection extends Component {

	render() {
		var title = this.props.title;
		var times = this.props.times;

		return(
			<div className="ttc_direction">
				<div className="route_name">{title}</div>
				<ul className="times">
					{times.map((prediction_time, index) =>
							<li key={index}><span className="clock_time">{prediction_time.timestamp}</span> <span className="time_in_min">{prediction_time.minutes}min</span></li>
					)}
				</ul>
			</div>
		)
	}
}

export default TTCDirection;
