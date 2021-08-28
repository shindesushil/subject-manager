import {
    SET_ACTIVE_SUBJECT,
    SET_ACTIVE_TOPIC
} from '../action/action-types'

const initialState = {
    activeSubject: '',
    activeTopic: '',
    isOperationGoingOn: false
}

const makeState = (stateActiveSubject, stateActiveTopic, op) => {
    return {
        activeSubject: stateActiveSubject,
        activeTopic: stateActiveTopic,
        isOperationGoingOn: op
    }
}


export const uireducer = (state = initialState, action) => { 
    switch(action.type){
        case SET_ACTIVE_SUBJECT:
            // this statement is printing new state in console, but not triggering re-render
            return makeState(action.payload,'', state.isOperationGoingOn);
        case SET_ACTIVE_TOPIC:
            return makeState(state.activeSubject, action.payload, state.isOperationGoingOn)
        case 'RESET_UI':
            return makeState('', '', state.isOperationGoingOn)
        case 'RESET_NOTES':
            return makeState(state.activeSubject, '', state.isOperationGoingOn)
        case 'OPERATION_GOING_ON':
            console.log('State i operation goin on :', state);
            return {
                activeSubject: state.activeSubject,
                activeTopic: state.activeTopic,
                isOperationGoingOn: true
            }
        case 'OPERATION_DONE':
            console.log('State in operation done : ', state);
            return {
                activeSubject: state.activeSubject,
                activeTopic: state.activeTopic,
                isOperationGoingOn: false
            }
        default:
            return state
    }
}

