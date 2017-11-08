import React, { Component } from 'react'
import offset from 'document-offset'

import {
	TableRow, TableColumn,
	MenuButtonColumn, ListItem, FontIcon
} from 'react-md';

export class AttrRow extends Component {
	
	getLinks = () => {
		let { ownerID, id } = this.props;
		return {
			// TODO подставлять ноды из стейта линков source/target
			source: document.querySelector(`#E2_A${id}`),
			target: document.querySelector(`#E${ownerID}_A${id}`)
		}
	};
	
	componentDidMount() {
		this.DrawModule(this.getLinks().source, this.getLinks().target)
	}
	
	DrawModule = (source, target) => {
		
		const pointPosition = (node) => {
			let padding = 10; // отступ стрелки от ноды
			return {
				node: node,
				leftX: offset(node).left - padding,
				rightX: offset(node).left + node.offsetWidth + padding,
				Y: offset(node).top + node.offsetHeight / 2,
				X: offset(node).left + node.offsetWidth / 2,
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
			let isEqualSidec = (sides.sourcePoint === sides.targetPoint);
			let sourceBezierOffset = (sides.sourcePoint === 'right') ? offset : -offset;
			let targetBezierOffset = (sides.targetPoint === 'right') ? -offset : offset;
			let M = `M${sides.sourcePoint.X}, ${sides.sourcePoint.Y}`;
			let Bezier = `C${sides.sourcePoint.X + sourceBezierOffset}, ${sides.sourcePoint.Y} ${sides.targetPoint.X + targetBezierOffset }, ${sides.targetPoint.Y}`;
			let T = `${sides.targetPoint.X}, ${sides.targetPoint.Y}`;
			return {path: `${M} ${Bezier} ${T}`}
		};
		
		let result = makePath(findSides(pointPosition(source), pointPosition(target)));
		console.log(result)
		return this.props.SVG_PATH(result)
		
	};
	
	render() {
		let { el, ownerID, id, onDeleteAttr } = this.props;
		return (
			
			
			<TableRow className="attrRow-child">
				
				<TableColumn className='attr-row'>
					<div className='entity-attr' id={`E${ownerID}_A${id}`}>{el.name}</div>
				</TableColumn>
				<TableColumn className='attr-row'>
					связь
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
