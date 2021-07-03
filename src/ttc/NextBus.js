import React, { Component } from 'react';
import TTCStop from './TTCStop.js';
import './sass/ttc.scss';

class NextBus extends Component {
	constructor(props) {
		super();
		this.state = {
			  routelist: props.routelist
		}
	}

	render() {
		return(
			<div>
				<div className="ttc_times">
					<h2>TTC Route</h2>
					{this.state.routelist.map((route) =>
							<TTCStop key={(route.id + '-' + route.stop)} route={route} />
					)}
				</div>
			</div>
		)
	}
}

export default NextBus;
