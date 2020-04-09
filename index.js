import { createStore } from 'https://unpkg.com/redux@4.0.5/es/redux.mjs';

// named actions
const BUTTON_CLICKED = 'BUTTON_CLICKED';
const DIV_VISIBLE = 'DIV_VISIBLE';

// action creation
 function buttonClicked(payload) {
	return {
		type: BUTTON_CLICKED,
		payload
	}
}

 function divVisible() {
	return {
		type: DIV_VISIBLE
	}
}

const initialState = {
	buttonClicked: 'no',
	divVisible: 'no'
}

function rootReducer(state=initialState, action) {
	switch (action.type) {
		case "BUTTON_CLICKED":
			console.log('payload=> ', action.payload);
			return {...state, buttonClicked: 'yes'}	
		case "DIV_VISIBLE":
			return {...state, divVisible: 'yes'}		
		default:
			return state;
	}
}

const store = createStore(rootReducer);

const button = document.getElementById('my-btn');

button.addEventListener('click', (event)=> {
	store.dispatch(buttonClicked(event));
	store.dispatch(divVisible());
})

store.subscribe(() => {
  if(store.getState().divVisible === 'yes') {
   const div = document.getElementById('my-div');
   div.style.display = 'block';
  }
})
