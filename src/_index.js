import { configureStore, createAction, createReducer, getDefaultMiddleware } from '@reduxjs/toolkit';

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


//NANA
function loggerMiddleware(store) {
    // store.dispatch
    // store.getState
    return (next) => {
        // next is function
        return (action) => {
            console.log(action);
            return next(action);
        }
    }
}

// Add n middleware
const store = configureStore({
	reducer: rootReducer,
	middleware: [...getDefaultMiddleware(), loggerMiddleware]
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
