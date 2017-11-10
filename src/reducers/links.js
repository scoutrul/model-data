import { createAction, createReducer } from 'redux-act';

const initialState = {};

export const onAddLink = createAction('add link');
export const onDeleteLink = createAction('del link');
export const onAddLinkAttr = createAction('add link attr');
export const onDeleteLinkAttr = createAction('del link attr');
export const setLinkName = createAction('change link name');
export const setLinkAttrName = createAction('change link attr name');

export default createReducer({
	[onAddLink]: (state, payload) => {
		return {
			...state,
			[payload.id]: payload
		}
	},
	[onDeleteLink]: (state, payload) => {
		return {
			...payload
		}
	},
	[onAddLinkAttr]: (state, payload) => {
		return {
			...state,
			[payload.ownerID]: {
				...state[payload.ownerID],
				attr: {
					...state[payload.ownerID].attr,
					[payload.selfID]: {
						name: payload.name,
						id: payload.selfID
					}
				}
			}
		};
	},
	[onDeleteLinkAttr]: (state, payload) => {
		return {
			...state,
			[payload.ownerID]: {
				...state[payload.ownerID],
				attr: payload.data
			}
		}
	},
	[setLinkName]: (state, payload) => {
		return {
			...state,
			[payload.id]: { ...state[payload.id], name: payload.name }
		}
	},

	[setLinkAttrName]: (state, payload) => {
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