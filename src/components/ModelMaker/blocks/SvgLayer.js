import React, { Component } from 'react';

export class SvgLayer extends Component {
	state = {};
	
	render() {
		let links = this.props.paths;
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className='svg'>
				<defs>
					<marker id="arrowhead" viewBox="0 0 10 10" refX="3" refY="5"
					        markerWidth="6" markerHeight="6" orient="auto">
						<path d="M 0 0 L 10 5 L 0 10 z"/>
					</marker>
				</defs>
				<g fill="none" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)">
					{links && links.map((link,i) => <path key={i} d={link.path}/>)}
				</g>
			</svg>
		
		)
	}
}
