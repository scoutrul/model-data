import HotModuleInit from "react-hot-loader/patch";
import React from 'react';
import { AppContainer } from 'react-hot-loader';
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

render(
	<AppContainer>
		<Provider store={store}>
			<App/>
		</Provider>
	</AppContainer>
	, document.getElementById('root'));
registerServiceWorker();
