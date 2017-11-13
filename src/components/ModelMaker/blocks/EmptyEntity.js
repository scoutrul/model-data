import React, { Component } from 'react'

import {
	Card, DataTable, TableHeader, TableRow, TableColumn, TableBody,
	TextField, MenuButtonColumn, ListItem, FontIcon, Button
} from 'react-md';

import { AttrRow } from './'

export class EmptyEntity extends Component {
	
	render() {
		
		let {
			isDictionary, onAddEntityAttr, name,
			attr, id, onDeleteEntity,
			isLink, linkType,
			setEntityAttrName,
			onDeleteEntityAttr,
			setEntityName,
		} = this.props;
		
		const typeOfEntity = () => {
			if (isLink) {
				return linkType
			}
			else {
				return isDictionary ? 'Словарь' : 'Простая сущность'
			}
		};

		const apiAttr = {
			setNameAttr: setEntityAttrName,
			onDeleteAttr: onDeleteEntityAttr,
			ownerID: id
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
										className="md-cell md-cell--bottom entity-header"
										onChange={(e) => setEntityName(e, id)}
									/>
								</TableColumn>
								<TableColumn className="emptyEntity-header">
									{null}
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
							{attr && Object.values(attr).map(el =>
								<AttrRow key={el.id}
								         id={el.id}
								         name={el.name}
								         disabled={el.disabled}
								         startTimeAttr={el.startTime}
								         endTimeAttr={el.endTime}
								         {...apiAttr}/>
							)
							}
						</TableBody>
					</DataTable>
					
					<div
						className="md-divider-border md-divider-border--top md-divider-border--bottom add-attr-container">
						<Button icon primary className='entity-add-button'
						        onClick={() => onAddEntityAttr(id)}>add_circle </Button>
					</div>
				
				</Card>
			</div>
		
		
		)
	}
}
