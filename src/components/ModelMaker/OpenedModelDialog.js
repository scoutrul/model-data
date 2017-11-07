import React, { Component } from 'react';

import {
	Grid
} from 'react-md';

import { EntitySection, DataSection, LinkSection } from './blocks/'

export class OpenedModelDialog extends Component {
	
	state = {
		isDataLoaded: false
	};
	
	DataLoadHandler = () => {
		this.setState({ isDataLoaded: true })
	};
	
	render() {
		
		return (
			<Grid style={{ width: "100%" }}>
				
				<DataSection DataLoadHandler={this.DataLoadHandler} isDataLoaded={this.state.isDataLoaded}/>
				{
					this.state.isDataLoaded &&
					[<EntitySection key={1}/>,
						<LinkSection key={2}/>]
				}
			
			</Grid>
		)
	}
}