import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/index'

import { dataList, FETCH_MODEL_LIST } from './reducers/initData'


export default function configureStore(initialState) {
	
	const loggerMiddleware = createLogger();
	
	const store = createStore(
		rootReducer,
		initialState,
		composeWithDevTools(
			applyMiddleware(loggerMiddleware, thunkMiddleware),
		));
	

	// при старте загружаем список моделей данных
	FETCH_MODEL_LIST('http://192.168.50.115:8080/import-service/api/data', store, dataList)
	
	return store
	
}

