import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux'
import {
	TableRow, TableColumn,
	MenuButtonColumn, ListItem, FontIcon, Button, DatePicker
} from 'react-md';

class AttrRow extends Component {
	
	
	render() {
		let { ownerID, id, name, onDeleteAttr, setNameAttr, startTimeAttr, endTimeAttr, disabled } = this.props;
		
		return (
			
			<TableRow className="attrRow-child">
				
				<TableColumn className='attr-row'>
					<ReactCSSTransitionGroup
						transitionAppearTimeout={150}
						transitionEnterTimeout={150}
						transitionLeaveTimeout={150}
						transitionAppear={true}
						transitionName="fade"
					>
						<div className='entity-attr' id={`E${ownerID}_A${id}`}>
							{(startTimeAttr || endTimeAttr ) ?
								<DatePicker
									id={`date-picker-E${ownerID}_A${id}`}
									inline
									displayMode="portrait"
									fullWidth={true}
									label={endTimeAttr ? 'дата конца' : 'дата начала'}
									autoOk
								/>
								:
								<input type="text" onChange={e => setNameAttr(ownerID, id, e.target.value)} defaultValue={name}
								       placeholder='Введите название' disabled={disabled}/>
							}
						</div>
					</ReactCSSTransitionGroup>
				</TableColumn>
				
				<TableColumn className='attr-row'>
					<Button icon>share</Button>
				</TableColumn>
				{
					(startTimeAttr || endTimeAttr || disabled ) ? null :
						<MenuButtonColumn className="emptyEntity-delete"
						                  icon
						                  centered
						                  menuItems={
							                  <ListItem primaryText="Удалить аттрибут"
							                            onClick={() => onDeleteAttr(ownerID, id)}
							                  />}
						>
							<FontIcon error className="delete-icons">clear</FontIcon>
						
						</MenuButtonColumn>
				}
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


export default connect(
	mapStateToProps
)(AttrRow)