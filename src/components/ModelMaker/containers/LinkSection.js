import React, { Component } from 'react';
import {
	Cell, MenuButton, ListItem,
} from 'react-md';

import { EmptyEntity } from '../blocks/index'

export class LinkSection extends Component {
	state = {
		entities: []
	};
	
	onAddEntity = linkType => {
		let data = this.state.entities.slice();
		data.push({
			name: 'new link',
			linkType,
			attr: [{ name: 'нет связей' },]
		});
		this.setState({ entities: data })
	};
	
	onAddAttr = ownerID => {
		let data = this.state.entities.slice();
		data[ownerID].attr.push({
			name: 'new attr',
		});
		this.setState({ entities: data })
	};
	
	onDeleteAttr = (ownerID, selfID) => {
		let data = this.state.entities.slice();
		delete data[ownerID].attr[selfID];
		this.setState({ entities: data })
	};
	
	onDeleteEntity = id => {
		let data = this.state.entities.slice();
		delete data[id];
		this.setState({ entities: data })
	};
	
	componentDidMount() {
	
	}
	
	render() {
		
		return (
			<Cell size={4} className="ModelMaker-section">
				<h3 className="section-header">Связи:</h3>
				
				<MenuButton
					id="addEntityButton"
					raised
					primary
					menuItems={[
						<ListItem key={1} primaryText="Родитель-потомок"
						          onClick={() => this.onAddEntity("Родитель-Потомок")}/>,
						<ListItem key={2} primaryText="Транзит"
						          onClick={() => this.onAddEntity("Транзит")}/>,
						<ListItem key={3} primaryText="Словарь"
						          onClick={() => this.onAddEntity("Словарь")}/>
					]}
					iconChildren="share"
				>
					Добавить
				</MenuButton>
				
				{
					this.state.entities.map((e, i) =>
						<EmptyEntity key={i} id={i} name={e.name} attr={e.attr} onAddAttr={this.onAddAttr}
						             isLink={true} linkType={e.linkType} onDeleteEntity={this.onDeleteEntity}
						             onDeleteAttr={this.onDeleteAttr}
						             SVG_PATH={this.props.SVG_PATH}/>
					)
				}
			
			</Cell>
		)
	}
}
