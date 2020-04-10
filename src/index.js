import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

const buttonClicked = createAction('BUTTON_CLICKED');
const divVisible = createAction('DIV_VISIBLE');
const initialState = {
	buttonClicked: 'no',
	divVisible: 'no'
}

const rootReducer = createReducer(initialState, {
	[buttonClicked]: (state, action) => {
		console.log(action.payload);
		state.buttonClicked = 'yes';
		return state;
	},
	[divVisible]: (state, action) => {
		console.log(action);
		state.divVisible = 'yes';
		return state;
	}
})

const store = configureStore({
	reducer: rootReducer
});

const button = window.document.getElementById('my-btn');

button.addEventListener('click', (event) => {
	store.dispatch(buttonClicked('this is payload'));
	store.dispatch(divVisible());
})

store.subscribe(() => {
	if (store.getState().divVisible === 'yes') {
		const div = document.getElementById('my-div');
		div.style.display = 'block';
	}
})
