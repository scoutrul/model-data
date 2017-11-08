import React, { Component } from 'react'

import {
	Card, DataTable, TableHeader, TableRow, TableColumn, TableBody,
	TextField, MenuButtonColumn, ListItem, FontIcon, Button
} from 'react-md';

import { AttrRow } from './AttrRow'

export class EmptyEntity extends Component {
	
	
	render() {
		let {
			isDictionary, onAddAttr, name,
			attr, id, onDeleteEntity, onDeleteAttr,
			isLink, linkType
		} = this.props;
		
		const typeOfEntity = () => {
			if (isLink) {
				return linkType
			}
			else {
				return isDictionary ? 'Словарь' : 'Простая сущность'
			}
		};
		
		return (
			<div>
				<div className="entity-type">
					{typeOfEntity()}
				</div>
				
				<Card className="entity">
					<DataTable plain id="empty-entity">
						<TableHeader>
							<TableRow>
								<TableColumn grow className="emptyEntity-header">
									<TextField
										id="empty-entity-id"
										lineDirection="center"
										placeholder="Название"
										defaultValue={name}
										className="md-cell md-cell--bottom"
										style={{ width: '100%' }}
									/>
								</TableColumn>
								<TableColumn grow className="emptyEntity-header">
									Связь
								</TableColumn>
								<MenuButtonColumn className="emptyEntity-delete"
								                  icon
								                  centered
								                  menuItems={<ListItem primaryText="Удалить сущность"
								                                       onClick={() => onDeleteEntity(id)}/>}
								>
									<FontIcon error className="delete-icons">delete</FontIcon>
								</MenuButtonColumn>
							</TableRow>
						</TableHeader>
						
						<TableBody id='attrRow'>
							{attr && attr.map((el, i) =>
								<AttrRow SVG_PATH={this.props.SVG_PATH} el={el} id={i} ownerID={id} key={i} onDeleteAttr={onDeleteAttr}/>
							)
							}
						</TableBody>
					</DataTable>
					
					<div
						className="md-divider-border md-divider-border--top md-divider-border--bottom add-attr-container">
						<Button icon primary className='entity-add-button'
						        onClick={() => onAddAttr(id)}>add_circle</Button>
					</div>
				
				</Card>
			</div>
		)
	}
}
