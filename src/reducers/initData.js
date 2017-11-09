import { createAction, createReducer } from 'redux-act';

const initialState =
	{
		data: '',
		modelList: '',
		storeAttr: ''
	}
;

export const fetchData = createAction('fetch init data');
export const dataList = createAction('fetch Data Model list');
export const storeAttr = createAction('store attr from data');


export default createReducer({
	[fetchData]: (state, payload) => {
		return {
			...state, data: payload
		}
	},
	[dataList]: (state, payload) => {
		return {
			...state, modelList: payload
			
		}
	},
	[storeAttr]: (state, payload) => {
		return {
			...state, storeAttr: payload
			
		}
	},
	
}, initialState);

export const FETCH_MODEL_LIST = async (url, store) => {
	const response = await fetch(url);
	const json = await response.json();
	store.dispatch(dataList(json))
};
