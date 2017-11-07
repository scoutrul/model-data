import React from 'react'

import {
	Card, DataTable, TableRow, TableColumn, TableBody, CardTitle, FontIcon
} from 'react-md';

export const DataEntity = props =>
	<Card className="entity" tableCard={true}>
		<CardTitle
			title={props.name}
			subtitle={props.description}
			className="dataEntityHeader"
			avatar={<FontIcon className={"dataHeaderIcon"}>folder_shared</FontIcon>}/>
		<DataTable plain id={props.name}>
			
			<TableBody>
				{
					props.attr.map(e =>
						<TableRow key={e.id}>
							<TableColumn className="dataModelCell">
								{e.name}
							</TableColumn>
						</TableRow>
					)
				}
			</TableBody>
		</DataTable>
	
	</Card>;