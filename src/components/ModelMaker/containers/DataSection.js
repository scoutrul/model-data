import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
		const GET_DATA = async (url) => {
			const response = await fetch(url);
			const json = await response.json();
			this.props.actions.fetchData(json)
		};
		await GET_DATA(`http://192.168.50.115:8080/import-service/api/data/${id}`);
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
				<ReactCSSTransitionGroup
					transitionAppearTimeout={150}
					transitionEnterTimeout={150}
					transitionLeaveTimeout={150}
					transitionAppear={true}
					transitionName="fade"
				>
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
				</ReactCSSTransitionGroup>
			</Cell>
		
		)
	}
}


function mapStateToProps(state) {
	// let entitiesAttr = [];
	// Object.values(state.entities).map((e, i) => (e.disabled) ? entitiesAttr[i] = (e.attr) : null);
	// console.log(entitiesAttr);
	
	let some = _.forEach(state.entities, (val, key) =>
		_.filter(val.attr, { id: false })
	);
	// console.log(some);
	
	let other = _.mapValues(state.entities, o => _.mapValues(o.attr, b =>  console.log(b)))
	;
	
	return {
		data: state.initData.data,
		modelList: state.initData.modelList,
		attributes: state.entities
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