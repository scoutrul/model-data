import React, { Component } from 'react';
import '../ModelMaker.css'
import {
	Grid
} from 'react-md';

import { SvgLayer } from './'
import { EntitySection, LinkSection, DataSection} from '../containers/'

export class OpenedDialog extends Component {
	
	render() {
		return (
			<Grid className='page-layout'>
				<div id='page'>
					<DataSection />
					<EntitySection />
					<LinkSection />
				</div>
				<div id="SvgLayer">
					<SvgLayer />
				</div>
			
			</Grid>
		)
	}
}