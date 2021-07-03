import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import TTCDirection from './TTCDirection.js';

class TTCStop extends Component {
	constructor(props) {
		super();
		this.timerID = 0;
		this.next_update = -1;
		this.state = {
			  route: props.route.id,
				stop: props.route.stop,
				direction: props.route.direction,
				predictions: [],
				messages: ''
		}
	}

	componentDidMount() {
		this.getTimes();
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	decrementUpdateCount() {
		this.next_update = this.next_update - 1;
		if (this.next_update === -1) {
			clearInterval(this.timerID);
			this.getTimes();
		}
	}

	getTimes() {
		var nextbusURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&r=";

		axios
			.get(nextbusURL+this.state.route+'&s='+this.state.stop)
			.then((response) => {
				var parser = new DOMParser();
				var xmldata = parser.parseFromString(response.data, 'text/xml');
				var d = xmldata.getElementsByTagName('direction');
				var results = [];
				var earliest_update = 600;

				if (d.length) {

					for(var i = 0; i < d.length; i++) {

						var t = [];
						var p = d[i].childNodes;

						for(var j = 0; j < p.length; j++) {
								if (p[j].nodeType !== Node.TEXT_NODE) {
									var epochTime = moment(parseInt(p[j].getAttribute('epochTime'),10)).utcOffset("America/Toronto").format('h:mma');
									var seconds = parseInt(p[j].getAttribute('seconds'), 10);
									if (seconds < earliest_update && seconds > 0)
										earliest_update = seconds;
									t.push({'timestamp': epochTime, 'minutes': p[j].getAttribute('minutes')});
								}
						}

						results.push({
							title: d[i].getAttribute('title'),
							times: t
						});

					}
				}

				var m = xmldata.getElementsByTagName('message');
				var m_list = [];

				for(i = 0; i < m.length; i++) {
					m_list.push(m[i].getAttribute('text'));
				}

				this.setState({
					predictions: results,
					messages: m_list.join("\n ")
				});

				if (earliest_update < 90) {
					earliest_update = 90;
				}

				this.next_update = earliest_update;
				//console.log(response.data);
				console.log(this.state.route + ' ' + this.state.direction + ' next bus update in '+earliest_update+'s');

				this.timerID = setInterval( () => this.decrementUpdateCount(), 1000 );

			});
	}

	render() {
		return(
			<div className="ttc_stop">
				<h3 className="route">{this.state.route} - {this.state.direction}</h3>
				{this.state.predictions.map((prediction) =>
						<TTCDirection key={prediction.title} title={prediction.title} times={prediction.times} />
				)}
			</div>
		)
	}
}

export default TTCStop;
