import { combineReducers } from 'redux'
import initData from './initData'
import entities from './entities'

const rootReducer = combineReducers({
	initData,
	entities
});

export default rootReducer