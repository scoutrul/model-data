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
					name: 'Аттрибут',
					links: { 0: { to: 0 } }
				}
			},
			start: '00-00-00',
			end: '00-00-00'
		}
	};
	
	onAddEntity = (isDict) => {
		let entities = this.props.entities;
		let counter = _.max(Object.keys(entities), function (o) {
			return entities[o];
		});
		counter++;
		console.log(counter)
		
		let newEntity = this.emptyEntity(counter, isDict);
		this.props.actions.onAddEntity(newEntity)
	};
	
	onDeleteEntity = id => {
		console.log(this.props.entities)
		let data = _.omit(this.props.entities, [id]);

		console.log(data);
		this.props.actions.onDeleteEntity(data)
	};
	
	onAddAttr = ownerID => {
		console.log(ownerID)
		let data = {
			name: `new ${ownerID}`
		};
		
		this.props.actions.onAddAttr(ownerID, data)
	};
	
	onDeleteAttr = (ownerID, selfID) => {
		// let data = this.props.entities.slice();
		// delete data[ownerID].attr[selfID];
		// this.props.actions.onDeleteAttr(data)
		
	};
	storeAttrToOwner = (attrDOM, ownerEntityID) => {
		// console.log(attrDOM, ownerEntityID)
		// let data = this.state.attrDOM.slice();
		// data.push({
		// 	attrDOM,
		// 	ownerEntityID
		// });
		// this.setState({ attrDOM: data })
	};
	
	setNameEntity = (name, id) => {
		let payload = { name, id };
		this.props.actions.onChangeEntityName(payload)
	};
	
	setNameAttr = (ownerID, selfID, name) => {
		let payload = { ownerID, selfID, name };
		this.props.actions.onChangeAttrName(payload)
	};
	
	componentDidMount() {
		this.props.actions.onAddEntity(this.emptyEntity(0))
	}
	
	componentDidUpdate() {
		// console.log(this)
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
					Object.values(entities).map(e => {
							return (
								
								<EmptyEntity key={e.id} id={e.id} name={e.name} attr={e.attr}
								             onAddAttr={this.onAddAttr}
								             isDictionary={e.isDictionary} onDeleteEntity={this.onDeleteEntity}
								             onDeleteAttr={this.onDeleteAttr}
								             setNameEntity={this.setNameEntity}
								             setNameAttr={this.setNameAttr}
								
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