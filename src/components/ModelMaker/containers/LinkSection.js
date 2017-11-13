import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as linksActions from '../../../reducers/links';

import {
	Cell, MenuButton, ListItem,
} from 'react-md';

import { EmptyLink } from '../blocks/index'

class LinkSection extends Component {
	
	emptyLink = (id = 0) => {
		return {
			id: id,
			name: 'Новая связь',
			attr: {
				0: {
					id: 0,
					name: 'Parent',
					from: '',
					disabled: true
				},
				1: {
					id: 1,
					name: 'Child',
					to: '',
					disabled: true
				},
				2: {
					id: 2,
					name: 'start time',
					startTime: 'true'
				},
				3: {
					id: 3,
					name: 'end time',
					endTime: 'true'
				}
			}
		}
	};
	
	
	onAddLink = (isDict) => {
		//find maximum id and ++ it for new id
		let entities = this.props.links;
		let counter = _.max(Object.keys(entities), o => entities[o]);
		(counter) ? counter++ : counter = 0;
		let newEntity = this.emptyLink(counter, isDict);
		this.props.actions.onAddLink(newEntity)
	};
	
	onDeleteLink = id => {
		let data = _.omit(this.props.links, [id]);
		this.props.actions.onDeleteLink(data)
	};
	
	onAddLinkAttr = (ownerID, name = '') => {
		//find maximum id and ++ it for new id
		let entities = this.props.links[ownerID].attr;
		let selfID = _.max(Object.keys(entities), o => entities[o]);
		(selfID) ? selfID++ : selfID = 0;
		let payload = { ownerID, selfID, name };
		this.props.actions.onAddLinkAttr(payload)
	};
	
	onDeleteLinkAttr = (ownerID, selfID) => {
		let data = _.omit(this.props.links[ownerID].attr, [selfID]);
		let payload = { data, ownerID };
		this.props.actions.onDeleteLinkAttr(payload)
	};
	
	setLinkName = (name, id) => {
		let payload = { name, id };
		this.props.actions.setLinkName(payload)
	};
	
	setLinkAttrName = (ownerID, selfID, name) => {
		let payload = { ownerID, selfID, name };
		this.props.actions.setLinkAttrName(payload)
	};
	
	componentDidMount() {
		this.props.actions.onAddLink(this.emptyLink())
	}
	
	render() {
		let links = this.props.links;
		return (
			<Cell size={4} className="ModelMaker-section">
				<h3 className="section-header">Связи:</h3>
				
				<MenuButton
					id="addEntityButton"
					raised
					primary
					menuItems={[
						<ListItem key={1} primaryText="Родитель-потомок"
						          onClick={() => this.onAddLink("Родитель-Потомок")}/>,
						<ListItem key={2} primaryText="Транзит"
						          onClick={() => this.onAddLink("Транзит")}/>,
						<ListItem key={3} primaryText="Словарь"
						          onClick={() => this.onAddLink("Словарь")}/>
					]}
					iconChildren="share"
				>
					Добавить
				</MenuButton>
				<ReactCSSTransitionGroup
					transitionAppearTimeout={150}
					transitionEnterTimeout={150}
					transitionLeaveTimeout={150}
					transitionAppear={true}
					transitionName="fade"
				>
					{
						Object.values(links).map(e => {
								return (
									<EmptyLink key={e.id} id={e.id} name={e.name} attr={e.attr} onAddLinkAttr={this.onAddLinkAttr}
									           isLink={true} linkType={e.linkType} onDeleteLink={this.onDeleteLink}
									           onDeleteLinkAttr={this.onDeleteLinkAttr}
									           setLinkName={this.setLinkName}
									           setLinkAttrName={this.setLinkAttrName}
									/>
								)
							}
						)
					}
				</ReactCSSTransitionGroup>
			
			</Cell>
		)
	}
}


function mapStateToProps(state) {
	return {
		links: state.links
	}
}


function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(linksActions, dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LinkSection)