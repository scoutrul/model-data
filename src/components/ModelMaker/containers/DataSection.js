import React, { Component } from 'react';
import { css } from '../styles'
import {
	Cell, SelectField, MenuButton
} from 'react-md';

import { DataEntity } from '../blocks/index'

export class DataSection extends Component {
	
	state = {
		ImportModels: {
			model: {
				entities: []
			}
		},
		DataModelList: []
	};
	GET_MODELS = async (url, stateField) => {
		const response = await fetch(url);
		const json = await response.json();
		this.setState({ [stateField]: json.values })
	};
	GetImportData = async (id) => {
		
		const STORE_DATA_ATTR = storeField => {
			let data = [];
			storeField.ImportModels.model.entities.map((e, i) => {
				return data[i] = {
					ownerId: e.id,
					attr: e.attributes
				}
			});
			this.setState({ DataModelAttr: data, ImportModels: storeField.ImportModels })
		};
		
		const GET_DATA = async (url, stateField) => {
			const response = await fetch(url);
			const json = await response.json();
			STORE_DATA_ATTR({ [stateField]: json })
		};
		
		await GET_DATA(`http://192.168.50.115:8080/import-service/api/data/${id}`, 'ImportModels');
		
		this.props.DataLoadHandler(); // is Data models select
	};
	
	componentWillMount() {
		this.GET_MODELS('http://192.168.50.115:8080/import-service/api/data', 'DataModelList')
	}
	
	render() {
		return (
			<Cell className="dataSection-cell">
				<h3 className="section-header">{this.props.isDataLoaded && `Данные:`}</h3>
				{this.props.isDataLoaded &&
				<MenuButton
					id="disabledHeader"
					raised
					primary
					disabled
					menuItems={[]}
					iconChildren="folder"
					style={{ color: '#6f6f6f', wontWeight: 'bold' }}>
					{this.state.ImportModels.model.name}
				</MenuButton>
				}
				{!this.props.isDataLoaded &&
				<SelectField
					id="select-data-model"
					placeholder="Выбор модели"
					menuItems={this.state.DataModelList}
					itemLabel="name"
					itemValue="id"
					deleteKeys={['connection', 'schemaName']}
					required
					position={SelectField.Positions.BELOW}
					sameWidth
					onChange={(e) => this.GetImportData(e)}
				/>}
				{
					this.state.ImportModels.model.entities.map(e =>
						<DataEntity
							key={e.id}
							name={e.name}
							description={e.description}
							attr={e.attributes}
							style={css.flexEntity.item}/>)
				}
			</Cell>
		
		)
	}
}
