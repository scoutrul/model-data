import { createAction, createReducer } from 'redux-act';

const initialState = {};

export const onAddEntity = createAction('add entity');
export const onDeleteEntity = createAction('del entity');
export const onAddEntityAttr = createAction('add attr');
export const onDeleteEntityAttr = createAction('del attr');
export const setEntityName = createAction('change entity name');
export const setEntityAttrName = createAction('change attr name');

export default createReducer({
	[onAddEntity]: (state, payload) => {
		return {
			...state,
			[payload.id]: payload
		}
	},
	[onDeleteEntity]: (state, payload) => {
		return {
			...payload
		}
	},
	[onAddEntityAttr]: (state, payload) => {
		return {
			...state,
			[payload.ownerID]: {
				...state[payload.ownerID],
				attr: {
					...state[payload.ownerID].attr,
					[payload.selfID]: {
						name: payload.name,
						id: payload.selfID,
					}
				}
			}
		};
	},
	[onDeleteEntityAttr]: (state, payload) => {
		return {
			...state,
			[payload.ownerID]: {
				...state[payload.ownerID],
				attr: payload.data
			}
		}
	},
	[setEntityName]: (state, payload) => {
		return {
			...state,
			[payload.id]: { ...state[payload.id], name: payload.name }
		}
	},
	[setEntityAttrName]: (state, payload) => {
		return {
			...state,
			[payload.ownerID]: {
				...state[payload.ownerID],
				attr: {
					...state[payload.ownerID].attr,
					[payload.selfID]: {
						...state[payload.ownerID].attr[payload.selfID],
						name: payload.name,
						ownerID: payload.ownerID
					}
				}
				
			}
		}
	},
	
}, initialState);