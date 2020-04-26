/*
   async function inside action creator
*/

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const FETCH_ARTICLES = 'FETCH_ARTICLES'
const articleState = {
    fetching: '',
    error: '',
    articles: []
}

function fetchArticles(payload) {
    return function (dispatch) {
        return fetch('https://jsonplaceholder.typicode.com/todos/').then((response) => {
            dispatch({ type: 'IS_FETCHING' });
            if (!response.ok) {
                dispatch({ type: 'ERRORR_WHILE_FETCHING', payload: response.status });
            }
            return response.json()
        }).then((json) => {
            dispatch({ type: 'HAS_FETCHIED', payload: json });
        })
    }
}

function articleReducer(state = articleState, action) {
    switch (action.type) {
        case 'IS_FETCHING':
            return { ...state, fetching: 'in_progress' };
        case 'ERRORR_WHILE_FETCHING':
            return { ...state, fetching: 'completed', error: action.payload };
        case 'HAS_FETCHIED':
            return { ...state, fetching: 'completed', articles: action.payload };
        default:
            return state;
    }
}

function loggerMiddleware() {
    return function (next) {
        return function (action) {
            console.log(action);
            return next(action);
        }
    }
}
const middleware = [thunk, loggerMiddleware];

const rootReducer = combineReducers({
    articles: articleReducer
})
const store = createStore(rootReducer, applyMiddleware(...middleware));
const button = document.getElementById('my-btn');
button.addEventListener('click', (ev) => {
    store.dispatch(fetchArticles());
})

store.subscribe(() => {
    console.log('====>', store.getState().articles);
})