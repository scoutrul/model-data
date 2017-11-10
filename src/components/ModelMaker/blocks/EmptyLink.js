import React, { Component } from 'react'

import {
	Card, DataTable, TableHeader, TableRow, TableColumn, TableBody,
	TextField, MenuButtonColumn, ListItem, FontIcon, Button
} from 'react-md';

import { AttrRow } from './'

export class EmptyLink extends Component {
	
	render() {
		let {
			name,
			attr, id,
			isLink, linkType,
			setNameLink,
			onDeleteLinkAttr,
			setLinkAttrName,
			onDeleteLink,
			onAddLinkAttr
		} = this.props;
		
		const apiAttr = {
			onDeleteLinkAttr,
			onDeleteLink,
			onAddLinkAttr,
			setNameAttr: setLinkAttrName,
			onDeleteAttr: onDeleteLinkAttr
		};
		
		return (
			<div>
				<div className="entity-type">
					Тип ссылки
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
										onChange={(e) => setNameLink(e, id)}
									/>
								</TableColumn>
								<TableColumn grow className="emptyEntity-header">
									{null}
								</TableColumn>
								<MenuButtonColumn className="emptyEntity-delete"
								                  icon
								                  centered
								                  menuItems={<ListItem primaryText="Удалить сущность"
								                                       onClick={() => onDeleteLink(id)}/>}
								>
									<FontIcon error className="delete-icons">delete</FontIcon>
								</MenuButtonColumn>
							</TableRow>
						</TableHeader>
						
						<TableBody id='attrRow'>
							{attr && Object.values(attr).map(el =>
								<AttrRow key={el.id} id={el.id} name={el.name} ownerID={id}  {...apiAttr}/>
							)
							}
						</TableBody>
					</DataTable>
					
					<div
						className="md-divider-border md-divider-border--top md-divider-border--bottom add-attr-container">
						<Button icon primary className='entity-add-button'
						        onClick={() => onAddLinkAttr(id)}>add_circle</Button>
					</div>
				
				</Card>
			</div>
		)
	}
}
