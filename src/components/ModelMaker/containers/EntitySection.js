import React, { Component } from 'react';
import { Cell, MenuButton, ListItem } from 'react-md';

import { EmptyEntity } from '../blocks/index'

export class EntitySection extends Component {
	state = {
		entityCount: 0,
		attrCount: 0,
		entities: [{
			name: 'new entity',
			isDictionary: false,
			attr: [{ name: 'пусто' },]
		},{
			name: 'new entity',
			isDictionary: false,
			attr: [{ name: 'пусто' },]
		},{
			name: 'new entity',
			isDictionary: false,
			attr: [{ name: 'пусто' },]
		},{
			name: 'new entity',
			isDictionary: false,
			attr: [{ name: 'пусто' },]
		}],
		attrDOM: []
	};
	onAddEntity = (isDict = false) => {
		let data = this.state.entities.slice();
		data.push({
			name: 'new entity',
			isDictionary: isDict,
			attr: [{ name: 'пусто' },]
		});
		this.setState({ entities: data })
	};
	
	onDeleteEntity = id => {
		let data = this.state.entities.slice();
		delete data[id];
		this.setState({ entities: data })
	};
	
	onAddAttr = ownerID => {
		let data = this.state.entities.slice();
		let attrDOM = this.storeAttrToOwner();
		data[ownerID].attr.push({
			name: 'new attr',
			dom: attrDOM
		});
		this.setState({ entities: data })
	};
	
	onDeleteAttr = (ownerID, selfID) => {
		let data = this.state.entities.slice();
		delete data[ownerID].attr[selfID];
		this.setState({ entities: data })
	};
	
	componentDidMount() {
		// console.log(this)
		this.onAddEntity();
		this.onAddEntity();
		this.onAddAttr(1);
		this.onAddAttr(2);
		this.onAddAttr(3);
	}
	
	componentDidUpdate() {
		// console.log(this)
	}
	
	storeAttrToOwner = (attrDOM, ownerEntityID) => {
		// console.log(attrDOM, ownerEntityID)
		// let data = this.state.attrDOM.slice();
		// data.push({
		// 	attrDOM,
		// 	ownerEntityID
		// });
		// this.setState({ attrDOM: data })
	};
	render() {
		
		return (
			<Cell size={4} className="ModelMaker-section">
				<h3 className="section-header">Сущности:</h3>
				
				<MenuButton
					id="addEntityButton"
					raised
					primary
					menuItems={[
						<ListItem key={1} primaryText="Простая сущность" onClick={() => this.onAddEntity()}/>,
						<ListItem key={2} primaryText="Словарь" onClick={() => this.onAddEntity({ isDict: true })}/>
					]}
					iconChildren="chat"
				>
					Добавить
				</MenuButton>
				{
					this.state.entities.map((e, i) =>
						<EmptyEntity key={i} id={i} name={e.name} attr={e.attr} onAddAttr={this.onAddAttr}
						             isDictionary={e.isDictionary} onDeleteEntity={this.onDeleteEntity}
						             onDeleteAttr={this.onDeleteAttr}
						             SVG_PATH={this.props.SVG_PATH}
						             />
					)
				}
			</Cell>
		
		)
	}
}
