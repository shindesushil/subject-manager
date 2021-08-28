import {
    ADD_NOTE,
    ADD_SUBJECT,
    ADD_TOPIC,
    REMOVE_NOTE,
    REMOVE_SUBJECT,
    REMOVE_TOPIC,
    UPDATE_NOTE,
    UPDATE_SUBJECT,
    UPDATE_TOPIC,
    FETCHING_DATA,
    FETCHED_DATA,
    FETCH_DATA_ERROR
} from '../action/action-types'

const initialState = {
    isDataFetching : false,
    error: '',
    data: [],
}

const makeState = (dataFetching, stateError, stateData) => {
    return {
        isDataFetching: dataFetching,
        error: stateError,
        data: stateData,
        isOperationGoingOn: false
    }
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCHING_DATA:
            return makeState(true,'',[])

        case FETCHED_DATA:
            return makeState(false,'',action.payload)

        case FETCH_DATA_ERROR:
            return makeState(false,action.payload,[])

        case ADD_SUBJECT:
            let data = state
            data.data.push({
                id: action.payload.id,
                name: action.payload.name,
                topics:[]
            })
            return data;

        case REMOVE_SUBJECT:
            let temp = state;
            temp.data = temp.data.filter(subject => subject.id !== action.payload)
            return temp

        case UPDATE_SUBJECT:
            let tempState = state
            let subToUpdate = tempState.data.filter(sub => sub.id === action.payload.id)
            tempState.data = tempState.data.filter(sub => sub.id !== action.payload.id)  // delete subject from state
            subToUpdate.name = action.payload.name
            tempState.data.push(subToUpdate)  // add updated subject to state
            return tempState

        case ADD_TOPIC:
            let addTopicData = state
            let targetSubject = addTopicData.data.filter(subject => subject.id === action.payload.subjectID)  // shuffled required subject
            console.log('Target Subject : ', targetSubject);
            targetSubject[0].topics.push({id: action.payload.topicID, name: action.payload.topicName, notes: []})  // added topic to that subject's topics array
            let newData = addTopicData
            newData.data = addTopicData.data.map(subject => {  
                if(subject.id === action.payload.subjectID)        // replaced previous subject object with new one
                    return targetSubject[0]
                return subject
            })
            return newData

        case REMOVE_TOPIC:
            let addTopicData1 = state
            
            let targetSubject1 = addTopicData1.data.filter(subject => subject.id === action.payload.subjectID)  // shuffled targeted subject
            addTopicData1.data = addTopicData1.data.filter(subject => subject.id !== action.payload.subjectID)  // deleting that subject from state
            
            targetSubject1[0].topics = targetSubject1[0].topics.filter(topic =>  topic.id !== action.payload.topicID)  // deleting that topic from target subject's topics array
            console.log('Target Subject : ', targetSubject1);
            
            let newData1 = addTopicData1                // whole state is in newData1
            newData1.data.push(targetSubject1[0])       // adding updated subject to state
            
            return newData1

        case UPDATE_TOPIC:
            let addTopicData2 = state

            let targetSubject2 = addTopicData2.data.filter(subject => subject.id === action.payload.subjectID)  // picking targeted subject from state
            addTopicData2.data = addTopicData2.data.filter(subject => subject.id !== action.payload.subjectID)  // deleting that subject from state
            
            let topicToUpdate = targetSubject2[0].topics.filter(topic =>  topic.id === action.payload.topicID)[0]  // picking topic to update from subject
            targetSubject2[0].topics = targetSubject2[0].topics.filter(topic =>  topic.id !== action.payload.topicID)  // deleting that topic from target subject's topics array
            topicToUpdate.name = action.payload.topicName  // updating that topic
            targetSubject2[0].topics.push(topicToUpdate)   // putting that topic back in subject
            
            console.log('Target Subject : ', targetSubject2);
            let newData2 = addTopicData2                // whole state is in newData1
            newData2.data.push(targetSubject2[0])       // adding updated subject to state
            return newData2

        case ADD_NOTE:
            let addNoteData = state

            let addNoteSubject = addNoteData.data.filter(subject => subject.id === action.payload.subjectID)[0]     // Pick target subject from state
            addNoteData.data = addNoteData.data.filter(subject => subject.id !== action.payload.subjectID)               // Delete target subject from state

            let addNoteTopic = addNoteSubject.topics.filter(topic => topic.id === action.payload.topicID)[0]        // Pick target topic from subject
            addNoteSubject.topics = addNoteSubject.topics.filter(topic => topic.id !== action.payload.topicID)             // Delete target topic from subject

            let noteToAdd = {
                id : action.payload.id,
                noteData: action.payload.noteData
            }

            addNoteTopic.notes.push(noteToAdd)              // Add new note to topic
            addNoteSubject.topics.push(addNoteTopic)        // topic to subject
            addNoteData.data.push(addNoteSubject)           // subject to state

            return addNoteData;

        case REMOVE_NOTE:
            let deleteNoteData = state

            let deleteNoteSubject = deleteNoteData.data.filter(subject => subject.id === action.payload.subjectID)[0]       // Pick target subject from state
            deleteNoteData.data = deleteNoteData.data.filter(subject => subject.id !== action.payload.subjectID)                 // Delete target subject from state

            let deleteNoteTopic = deleteNoteSubject.topics.filter(topic => topic.id === action.payload.topicID)[0]         // Pick target topic from subject
            deleteNoteSubject.topics = deleteNoteSubject.topics.filter(topic => topic.id !== action.payload.topicID)              // Delete target topic from subject

            deleteNoteTopic.notes = deleteNoteTopic.notes.filter(note => note.id !== action.payload.noteID)             // delete target note from topic

            console.log('Delete note subject : ', deleteNoteSubject);
            deleteNoteSubject.topics.push(deleteNoteTopic)      // Add topic to to subject
            deleteNoteData.data.push(deleteNoteSubject)         // Add subject to state

            return deleteNoteData;

        case UPDATE_NOTE:
            let updateNoteData = state

            let updateNoteSubject = updateNoteData.data.filter(subject => subject.id === action.payload.subjectID)[0]       // Pick target subject from state
            updateNoteData.data = updateNoteData.data.filter(subject => subject.id !== action.payload.subjectID)                 // Delete target subject from state

            let updateNoteTopic = updateNoteSubject.topics.filter(topic => topic.id === action.payload.topicID)[0]         // Pick target topic from subject
            updateNoteSubject.topics = updateNoteSubject.topics.filter(topic => topic.id !== action.payload.topicID)              // Delete target topic from subject

            updateNoteTopic.notes = updateNoteTopic.notes.filter(note => note.id !== action.payload.noteID)             // delete target note from topic
            let newNote = {
                id: action.payload.noteID,
                noteData: action.payload.noteData
            }
            updateNoteTopic.notes.push(newNote)

            console.log('Delete note subject : ', updateNoteSubject);
            updateNoteSubject.topics.push(updateNoteTopic)      // Add topic to to subject
            updateNoteData.data.push(updateNoteSubject)         // Add subject to state

            return updateNoteData;


        default:
            return state
    }
}


// export default reducer