import React from 'react'

import {
	Card, DataTable, TableRow, TableColumn, TableBody, CardTitle, FontIcon,
	MenuButtonColumn, List, ListItem, Subheader, Divider
} from 'react-md';

export const DataEntity = props =>
	<Card className="entity data-section" tableCard={true}>
		<CardTitle
			title={props.name}
			subtitle={props.description}
			className="dataEntityHeader"
			avatar={<FontIcon className={"dataHeaderIcon"}>folder_shared</FontIcon>}
			
		/>
		<DataTable plain id={props.name}>
			<TableBody>
				{
					props.attr.map(e =>
						<TableRow key={e.id}>
							<TableColumn className="dataModelCell">
								{e.name}
							</TableColumn>
							<MenuButtonColumn className="emptyEntity-delete"
							                  icon
							                  centered
							                  menuItems={
								                  <List >
									                  <Subheader primaryText="Вершина 1" />
									                  <ListItem primaryText="Поле 1"/>
									                  <ListItem primaryText="Поле 2"/>
									                  <Divider />
									                  <Subheader primaryText="Вершина 2" />
									                  <ListItem primaryText="Поле 1"/>
									                  <ListItem primaryText="Поле 2"/>
									                  <Divider />
									                  <Subheader primaryText="Вершина 3" />
									                  <ListItem primaryText="Поле 1"/>
									                  <ListItem primaryText="Поле 2"/>
									                  <Divider />
								                  </List>
							                  }
							>
								<FontIcon>share</FontIcon>
							</MenuButtonColumn>
						</TableRow>
					)
				}
			</TableBody>
		</DataTable>
	
	</Card>;