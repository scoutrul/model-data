import React, { Component } from 'react';
import {
	FontIcon,
	Button,
	Grid,
	Cell,
	DialogContainer,
	TextField,
	Toolbar,
} from 'react-md';

import  { OpenedDialog } from './blocks/index';

export class ModelDialog extends Component {
	
	state = {
		JSON: false,
		newGraphModal: false,
		graphModel: {}
	};
	
	NewGraphModal = () => this.setState({ newGraphModal: true });
	HideNewGraphModal = () => this.setState({ newGraphModal: false });
	setNewGraphName = name => {
		this.setState({ graphModel: { name } });
	};
	
	render() {
		return (
			<div className="ModelMaker ModelMaker-main">
				{/*{ кнопка открывает диалог создания нового графа }*/}
				<Button primary raised onClick={this.NewGraphModal}>Добавить модель графа</Button>
				{/*{ диалог для вывода JSON а импорт TODO }*/}
				<DialogContainer
					id="JSON-VIEWVER"
					visible={this.state.JSON}
					aria-labelledby="json-viewer"
					style={{ 'zIndex': 100 }}
					width="70%"
					onHide={() => this.setState({ JSON: !this.state.JSON })}
				>
					<Cell>
						<TextField id="jsonchik"/>
						
						<pre>{JSON.stringify(this.state, null, '\t')}</pre>
					
					</Cell>
				</DialogContainer>
				
				{/*{ Диалог нового графа }*/}
				<DialogContainer
					id="enter-name"
					visible={true || this.state.newGraphModal}
					aria-labelledby="simple-full-page-dialog-title"
					onHide={this.HideNewGraphModal}
					closeOnEsc
					width="100%"
					height="100%"
				>
					<Toolbar
						fixed
						colored
						title="Создание нового графа"
						titleId="simple-full-page-dialog-title"
						nav={<Button icon onClick={this.HideNewGraphModal}>close</Button>}
						actions={[<Button flat onClick={() => this.setState({ JSON: !this.state.JSON })}>JSON</Button>,
							<Button flat onClick={() => alert('save')}>Сохранить</Button>]}
					/>
					<Grid className="ModelMaker-grid">
						<Cell size={12}>
							<TextField
								id="new-graph-name"
								placeholder="Введите название нового графа"
								leftIcon={<FontIcon>label_outline</FontIcon>}
								required
								onChange={(e) => this.setNewGraphName(e)}
							/>
						</Cell>
						<OpenedDialog/>
					
					</Grid>
				</DialogContainer>
			</div>
		)
	}
}
