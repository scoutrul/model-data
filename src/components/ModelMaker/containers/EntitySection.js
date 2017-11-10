import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as entityActions from '../../../reducers/entities';
import { Cell, MenuButton, ListItem } from 'react-md';

import { EmptyEntity } from '../blocks/index'

class EntitySection extends Component {
	
	emptyEntity = (id = 0, isDict = false) => {
		return {
			id: id,
			name: 'Новая вершина',
			isDictionary: isDict,
			attr: {
				0: {
					id: 0,
					name: 'start time',
					startTime: ''
				},
				1: {
					id: 1,
					name: 'end time',
					endTime: ''
				},
				2: {
					id: 2,
					name: 'Аттрибут',
				},
			}
		}
	};
	
	onAddEntity = (isDict) => {
		//find maximum id and ++ it for new id
		let entities = this.props.entities;
		let counter = _.max(Object.keys(entities), o => entities[o]);
		(counter) ? counter++ : 0;
		let newEntity = this.emptyEntity(counter, isDict);
		this.props.actions.onAddEntity(newEntity)
	};
	
	onDeleteEntity = id => {
		let data = _.omit(this.props.entities, [id]);
		this.props.actions.onDeleteEntity(data)
	};
	
	onAddEntityAttr = (ownerID, name = '') => {
		//find maximum id and ++ it for new id
		let entities = this.props.entities[ownerID].attr;
		let selfID = _.max(Object.keys(entities), o => entities[o]);
		(selfID) ? selfID++ : 0;
		let payload = { ownerID, selfID, name };
		this.props.actions.onAddEntityAttr(payload)
	};
	
	onDeleteEntityAttr = (ownerID, selfID) => {
		let data = _.omit(this.props.entities[ownerID].attr, [selfID]);
		let payload = { data, ownerID };
		this.props.actions.onDeleteEntityAttr(payload)
	};
	
	setEntityName = (name, id) => {
		let payload = { name, id };
		this.props.actions.setEntityName(payload)
	};
	
	setEntityAttrName = (ownerID, selfID, name) => {
		let payload = { ownerID, selfID, name };
		this.props.actions.setEntityAttrName(payload)
	};
	
	componentDidMount() {
		this.props.actions.onAddEntity(this.emptyEntity())
	}
	
	render() {
		let entities = this.props.entities;
		return (
			<Cell size={4} className="ModelMaker-section">
				<h3 className="section-header">Вершины:</h3>
				
				<MenuButton
					id="addEntityButton"
					raised
					primary
					menuItems={[
						<ListItem key={1} primaryText="Простая сущность" onClick={() => this.onAddEntity()}/>,
						<ListItem key={2} primaryText="Словарь" onClick={() => this.onAddEntity(true)}/>
					]}
					iconChildren="chat"
				>
					Добавить
				</MenuButton>
				{
					Object.values(entities).map((e, i) => {
							return (
								<EmptyEntity key={i} id={e.id} name={e.name} attr={e.attr}
								             isDictionary={e.isDictionary}
								             onAddEntityAttr={this.onAddEntityAttr}
								             onDeleteEntity={this.onDeleteEntity}
								             onDeleteEntityAttr={this.onDeleteEntityAttr}
								             setEntityName={this.setEntityName}
								             setEntityAttrName={this.setEntityAttrName}
								
								/>
							)
						}
					)
				}
			
			</Cell>
		
		)
	}
}

function mapStateToProps(state) {
	return {
		entities: state.entities
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(entityActions, dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EntitySection)