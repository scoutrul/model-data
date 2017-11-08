import React, { Component } from 'react';
import '../ModelMaker.css'
import {
	Grid
} from 'react-md';

import { EntitySection, DataSection, LinkSection, SvgLayer } from './'

export class OpenedDialog extends Component {
	
	state = {
		isDataLoaded: false,
		paths: []
	};
	
	DataLoadHandler = () => {
		this.setState({ isDataLoaded: true })
	};
	
	SVG_PATH = path => {
		let data = this.state.paths;
		data.push(path);
		this.setState({paths: data})
	};
	
	render() {
		
		return (
			<Grid style={{ width: "100%" }}>
				<div id='page'>
					<DataSection SVG_PATH={this.SVG_PATH} DataLoadHandler={this.DataLoadHandler} isDataLoaded={this.state.isDataLoaded}/>
					<EntitySection SVG_PATH={this.SVG_PATH} />
					<LinkSection SVG_PATH={this.SVG_PATH} />
				</div>
				<div id="SvgLayer">
					<SvgLayer paths={this.state.paths}/>
				</div>
			
			</Grid>
		)
	}
}