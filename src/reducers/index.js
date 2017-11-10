import { combineReducers } from 'redux'
import initData from './initData'
import entities from './entities'
import links from './links'

const rootReducer = combineReducers({
	initData,
	entities,
	links
});

export default rootReducer