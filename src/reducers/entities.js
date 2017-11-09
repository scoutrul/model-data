import { createAction, createReducer } from 'redux-act';

const initialState = {};

export const onAddEntity = createAction('add entity');
export const onDeleteEntity = createAction('del entity');
export const onAddAttr = createAction('add attr');
export const onDeleteAttr = createAction('del attr');
export const onChangeEntityName = createAction('change entity name');
export const onChangeAttrName = createAction('change attr name');

export default createReducer({
	[onAddEntity]: (state, payload) => {
		return {
			...state,
			[payload.id]: payload
		}
	},
	[onChangeEntityName]: (state, payload) => {
		return {
			...state,
			[payload.id]: {...state[payload.id], name: payload.name}
		}
	},
	[onDeleteEntity]: (state, payload) => {
		return {
			...state, entities: payload
		}
	},
	[onAddAttr]: (state, payload) => {
		let ownerID = payload.ownerID;
		return {
			...state,
			entities: {
				...state.entities,
				[ownerID]: payload.data
			}
		};
	},
	[onDeleteAttr]: (state, payload) => {
		return {
			...state, entities: payload
		}
	},
	
	[onChangeAttrName]: (state, payload) => {
		return {
			...state,
			[payload.ownerID]: {
				...state[payload.ownerID],
				attr: {
					...state[payload.ownerID].attr[payload.selfID], name: payload.name, ownerID: payload.ownerID
				}
			}
		}
	},
	
}, initialState);