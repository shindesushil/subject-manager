import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import {reducer}  from '../reducer/reducer'
import { uireducer } from '../reducer/uireducer'

import { composeWithDevTools } from 'redux-devtools-extension'

console.log(reducer);

const composeEnhancers = composeWithDevTools({})


const rootReducer = combineReducers({
    subjects: reducer,
    uireducer
})

console.log('Reducer in store : ', reducer);


const store = createStore(
    rootReducer, 
    // applyMiddleware(thunk)
    composeEnhancers(applyMiddleware(thunk))
    )

export default store