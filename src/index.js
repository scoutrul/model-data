import { AppContainer } from 'react-hot-loader'
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './store.js'

import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
	google: {
		families: ['Roboto:300,400,500,700', 'Material Icons'],
	},
});


const store = configureStore();

if (module.hot) {
	// Enable Webpack hot module replacement for reducers
	module.hot.accept('./reducers/index', () => {
		const nextReducer = require('./reducers/index').default;
		store.replaceReducer(nextReducer)
	})
}
render(
	<AppContainer>
		<Provider store={store}>
			<App/>
		</Provider>
	</AppContainer>
	, document.getElementById('root'));
registerServiceWorker();
