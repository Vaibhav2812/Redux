import { createStore, applyMiddleware } from 'https://unpkg.com/redux@4.0.5/es/redux.mjs';

const initialState = {
    buttonClicked: 'no',
    divVisible: 'no'
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "BUTTON_CLICKED":
            return { ...state, buttonClicked: 'yes' }
        case "DIV_VISIBLE":
            return { ...state, divVisible: 'yes' }
        default:
            return state;
    }
}

//NANA
function logger(store) {
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
const middleware = [logger]
const store = createStore(rootReducer, applyMiddleware(...middleware));

const button = document.getElementById('my-btn');

button.addEventListener('click', () => {
    const btnClickedAction = {
        type: 'BUTTON_CLICKED'
    }
    const divVisibleAction = {
        type: 'DIV_VISIBLE'
    }
    store.dispatch(btnClickedAction);
    store.dispatch(divVisibleAction);
})

store.subscribe(() => {
    if (store.getState().divVisible === 'yes') {
        const div = document.getElementById('my-div');
        div.style.display = 'block';
    }
})
