import React, { Component } from 'react'

import {
	Card, DataTable, TableHeader, TableRow, TableColumn, TableBody,
	TextField, MenuButtonColumn, ListItem, FontIcon, Button
} from 'react-md';

export class AttributeRow extends Component {
	
	pointPosition = (node) => {
		let padding = 10; // отступ стрелки от ноды
		return {
			leftX: node.offsetLeft - padding,
			rightX: node.offsetLeft + node.offsetWidth + padding,
			Y: node.offsetTop + node.offsetHeight / 2,
			X: node.offsetLeft + node.offsetWidth / 2
		}
	};
	
	componentDidMount() {
		
		let data = this.pointPosition(document.querySelector('.entity-attr'));
		
		console.log(data)
		
	}
	
	render() {
		let { el, id, i, onDeleteAttr } = this.props;
		return (
			
			
			<TableRow className="attrRow-child">
				
				<TableColumn className='attr-row'>
					<div id={`E${id}_A${i}`} className='entity-attr'>{el.name}</div>
				</TableColumn>
				<TableColumn className='attr-row'>
					связь
				</TableColumn>
				
				<MenuButtonColumn className="emptyEntity-delete"
				                  icon
				                  centered
				                  menuItems={<ListItem primaryText="Удалить аттрибут"
				                                       onClick={() => onDeleteAttr(id, i)}
				                  />}
				>
					<FontIcon error className="delete-icons">clear</FontIcon>
				</MenuButtonColumn>
			</TableRow>
		
		)
	}
}
