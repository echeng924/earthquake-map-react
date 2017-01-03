import React, { Component } from 'react';
// import TableRow from './tableRow.jsx';

const propTypes = {
	earthquakeData: React.PropTypes.array,
}

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sorted: false,
		}
		this.sortColumn = this.sortColumn.bind(this);
	}


	sortColumn(column) {
		console.log(column)
		this.props.earthquakeData.sort(function(a,b) {
			let A = a.properties[column];
			let B = b.properties[column];
			if (typeof A == 'string') {
				A = A.toUpperCase();
				B = B.toUpperCase();
			}
			if (A > B) {
				return 1;
			} if (A < B) {
				return -1;
			} else {
				return 0;
			}
		})
		this.setState({
			sorted: true,
		})
	}


	render() {
		const tableElements = this.props.earthquakeData.map((earthquake, id) => {
			return (		
					<tr key={id}>
						<td>{earthquake.properties.title}</td>
				        <td>{earthquake.properties.mag}</td>
				        <td>{earthquake.properties.tsunami}</td>
					</tr>
			)
		})
		return (
			<table>
				<tbody>
					<tr>
						<th><a onClick={() => this.sortColumn('title')}>Title</a></th>
						<th><a onClick={() => this.sortColumn('mag')}>Magnitude</a></th>
						<th><a onClick={() => this.sortColumn('tsunami')}>Tsunami</a></th>
					</tr>
					{ tableElements }
				</tbody>
			</table>
		)
	}
}


export default Table;