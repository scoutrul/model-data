import React, { Component } from 'react'
import _ from 'lodash'
import getElementClientRect from 'element-client-rect'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as initData from '../../../reducers/initData'
import { Subheader, SelectField } from 'react-md';
import {
	TableRow, TableColumn,
	MenuButtonColumn, ListItem, FontIcon
} from 'react-md';

class AttrRow extends Component {
	
	getLinks = () => {
		let { ownerID, id } = this.props;
		return {
			// TODO подставлять ноды из стейта линков source/target
			source: document.querySelector(`#E${ownerID}_A${id}`),
			target: document.querySelector(`#E${ownerID}_A${id}`)
		}
	};
	DrawModule = (source, target) => {
		
		const pointPosition = (node) => {
			let padding = 10; // отступ стрелки от ноды
			return {
				node: node,
				leftX: getElementClientRect(node).left - padding,
				rightX: getElementClientRect(node).left + node.offsetWidth + padding,
				Y: getElementClientRect(node).top + node.offsetHeight / 2,
				X: getElementClientRect(node).left + node.offsetWidth / 2,
			}
		};
		
		const findSides = (sourcePos, targetPos) => {
			if (sourcePos.X === targetPos.X) {
				return {
					sourcePoint: { X: sourcePos.rightX, Y: sourcePos.Y, direction: 'right' },
					targetPoint: { X: targetPos.rightX, Y: targetPos.Y, direction: 'right' }
				}
			} else if (sourcePos.X > targetPos.X) {
				return {
					sourcePoint: { X: sourcePos.leftX, Y: sourcePos.Y, direction: 'left' },
					targetPoint: { X: targetPos.rightX, Y: targetPos.Y, direction: 'right' }
				}
			} else if (sourcePos.X < targetPos.X) {
				return {
					sourcePoint: { X: sourcePos.rightX, Y: sourcePos.Y, direction: 'right' },
					targetPoint: { X: targetPos.leftX, Y: targetPos.Y, direction: 'left' }
				}
			}
		};
		
		const makePath = (sides) => {
			//TODO поиск сторон для верных отступов Безъе
			let offset = 140;
			// let isEqualSidec = (sides.sourcePoint === sides.targetPoint);
			let sourceBezierOffset = (sides.sourcePoint === 'right') ? offset : -offset;
			let targetBezierOffset = (sides.targetPoint === 'right') ? -offset : offset;
			let M = `M${sides.sourcePoint.X}, ${sides.sourcePoint.Y}`;
			let Bezier = `C${sides.sourcePoint.X + sourceBezierOffset}, ${sides.sourcePoint.Y} ${sides.targetPoint.X + targetBezierOffset }, ${sides.targetPoint.Y}`;
			let T = `${sides.targetPoint.X}, ${sides.targetPoint.Y}`;
			return { path: `${M} ${Bezier} ${T}` }
		};
		
		let result = makePath(findSides(pointPosition(source), pointPosition(target)));
		// console.log(result);
		
		return result
		
	};
	
	componentDidMount() {
		// this.DrawModule(this.getLinks().source, this.getLinks().target)
		// console.log(this.props.data)
	}
	

	
	nameChange = (ownerID, selfID) => {
		// let payload;
		// this.props.action.nameChange(payload)
		console.log('name change hand')
	};
	
	render() {
		let { ownerID, id, name, onDeleteAttr, setNameAttr } = this.props;
		
		const makeItems = () => {
			let initData = this.props.storeAttr;
			
			let fetchAttr = _.toArray(_.mapKeys(initData, 'id'));

			
			let temp = [];
			fetchAttr.map((e, i) => {
					temp.push(<Subheader key={i}
					                     primaryText={e.name}
					                     className="md-divider-border md-divider-border--bottom"/>);
					e.attributes.map((a, ai) => {
						temp.push(a.name)
					})
				}
			);

			return [1,2,3]
		};
		
		return (
			
			<TableRow className="attrRow-child">
				
				<TableColumn className='attr-row'>
					<div className='entity-attrTEMP' id={`E${ownerID}_A${id}`}>
						<input type="text" onChange={(e) => setNameAttr(ownerID, id, e.target.value)} value={name}/>
					</div>
				</TableColumn>
				
				{/*{Список для связей}*/}
				<TableColumn className='attr-row'>
					<SelectField
						id="select-field-with-elements"
						label="Связь"
						placeholder="Список"
						menuItems={makeItems()}
						itemLabel="name"
						itemValue="id"
						className="md-cell md-cell--6"
						sameWidth
						onChange={this.onChange}
					/>
				</TableColumn>
				
				<MenuButtonColumn className="emptyEntity-delete"
				                  icon
				                  centered
				                  menuItems={<ListItem primaryText="Удалить аттрибут"
				                                       onClick={() => onDeleteAttr(ownerID, id)}
				                  />}
				>
					<FontIcon error className="delete-icons">clear</FontIcon>
				</MenuButtonColumn>
			</TableRow>
		
		)
	}
}


function mapStateToProps(state) {
	return {
		storeAttr: state.initData.storeAttr,
		data: state.entities
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
)(AttrRow)