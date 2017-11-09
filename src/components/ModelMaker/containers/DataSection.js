import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { css } from '../styles'
import {
	Cell, SelectField, MenuButton
} from 'react-md';
import * as initData from '../../../reducers/initData';
import { DataEntity } from '../blocks/';

class DataSection extends Component {
	// выгрузка данныхз из выбранной модели
	// срабатывает при выборе из списка
	GET_IMPORTED_DATA = async (id) => {
		let data = {};
		const GET_DATA = async (url) => {
			const response = await fetch(url);
			const json = await response.json();
			data = json;
			this.props.actions.fetchData(data)
		};
		await GET_DATA(`http://192.168.50.115:8080/import-service/api/data/${id}`);
		await this.props.actions.storeAttr(data.model.entities)
	};
	
	
	componentWillMount() {

	}
	
	componentDidUpdate() {
		// console.log(this);
	}
	
	render() {
		return (
			<Cell className="ModelMaker-section">
				<h3 className="section-header">{this.props.data.model && `Данные:`}</h3>
				{this.props.data.model &&
					<MenuButton
						id="disabledHeader"
						raised
						primary
						disabled
						menuItems={[]}
						iconChildren="folder"
						style={{ color: '#6f6f6f', wontWeight: 'bold' }}>
						{this.props.data.model.name}
					</MenuButton>
				}
				{!this.props.data.model &&
					<SelectField
						id="select-data-model"
						placeholder="Выбор модели"
						menuItems={this.props.modelList.values}
						itemLabel="name"
						itemValue="id"
						deleteKeys={['connection', 'schemaName']}
						required
						position={SelectField.Positions.BELOW}
						sameWidth
						onChange={(e) => this.GET_IMPORTED_DATA(e)}
					/>
				}
				{this.props.data.model && this.props.data.model.entities.map(e =>
					<DataEntity
						key={e.id}
						name={e.name}
						description={e.description}
						attr={e.attributes}
						style={css.flexEntity.item}
					/>
				)
				}
			</Cell>
		
		)
	}
}


function mapStateToProps(state) {
	return {
		data: state.initData.data,
		modelList: state.initData.modelList,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(initData, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DataSection)