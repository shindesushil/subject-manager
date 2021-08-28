import {
    ADD_SUBJECT,
    REMOVE_SUBJECT,
    UPDATE_SUBJECT,
    ADD_TOPIC,
    REMOVE_TOPIC,
    UPDATE_TOPIC,
    ADD_NOTE,
    REMOVE_NOTE,
    UPDATE_NOTE,
    FETCHING_DATA,
    FETCHED_DATA,
    FETCH_DATA_ERROR,
    SET_ACTIVE_SUBJECT,
    SET_ACTIVE_TOPIC,
    OPERATION_GOING_ON,
    OPERATION_DONE
} from './action-types'

export const addSubject = subject => ({ // {id: id, name: String}
    type: ADD_SUBJECT,
    payload: subject
})

export const removeSubject = id => ({  // id from firebase
    type: REMOVE_SUBJECT,
    payload: id
})

export const updateSubject = newSubject => ({  // { id: id, name : String }
    type: UPDATE_SUBJECT,
    payload: newSubject
})

export const addTopic = topic => ({  // { subjectID: id, topicName: String }
    type: ADD_TOPIC,
    payload: topic
})

export const removeTopic = topic => ({ // { subjectID: id, topicID: id }
    type: REMOVE_TOPIC,
    payload: topic
})

export const updateTopic = topic => ({  // { subjectID: id, topicID: id, topicName: String }
    type: UPDATE_TOPIC,
    payload: topic
})

export const addNote = note => ({  // { subjectID: id, topicID: id, note: String }
    type: ADD_NOTE,
    payload: note
})

export const removeNote = note => ({ // { subjectID: id, topicID: id, noteID: id }
    type: REMOVE_NOTE,
    payload: note
})

export const updateNote = note => ({ // { subjectID: id, topicID: id, noteID: id, newNote: String }
    type: UPDATE_NOTE,
    payload: note
})

export const fetchingData = () => ({
    type: FETCHING_DATA,
    payload: '',
})

export const fetchedData = data => ({ // array of subject objects
    type: FETCHED_DATA,
    payload: data
})

export const fetchDataError = error => ({  // { message : string }
    type: FETCH_DATA_ERROR,
    payload : error
})


// UI Actions
export const setActiveSubject = subjectID => ({ // id
    type: SET_ACTIVE_SUBJECT,
    payload: subjectID
})

export const setActiveTopic = topicID => ({
    type: SET_ACTIVE_TOPIC,
    payload: topicID
})

export const operationGoingOn = () => ({
    type: OPERATION_GOING_ON,
    payload: ''
})

export const operationDone = () => ({
    type: OPERATION_DONE,
    payload: ''
})