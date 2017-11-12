import getElementClientRect from 'element-client-rect'

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