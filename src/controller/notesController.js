import {
    addNote,
    removeNote,
    updateNote,
    operationGoingOn,
    operationDone
} from '../action/action'

import firebase from '../firebase/firebase'

export const insertNote = (noteDetails) => {  // {subjectID : id, topicID: id, noteData: String}
    return dispatch => {
        dispatch(operationGoingOn())
        const db = firebase.firestore()
        return db.collection('subjects')
            .doc(noteDetails.subjectID)
            .collection('Topics')
            .doc(noteDetails.topicID)
            .collection('Notes')
            .add({
                note: noteDetails.noteData
            })
            .then((docRef) => {
                dispatch(addNote({ id: docRef.id, subjectID: noteDetails.subjectID, topicID: noteDetails.topicID, noteData: noteDetails.noteData}))
                dispatch(operationDone())
            })
            .catch(error => {
                console.log('Error occured while inserting note : ', error);
                dispatch(operationDone())
            })
    }
}


export const deleteNote = (noteDetails) => {  // {subjectID : id, topicID: id, noteID: id}
    return dispatch => {
        dispatch(operationGoingOn())
        const db = firebase.firestore()
        return db.collection('subjects')
            .doc(noteDetails.subjectID)
            .collection('Topics')
            .doc(noteDetails.topicID)
            .collection('Notes')
            .doc(noteDetails.noteID)
            .delete()
            .then((docRef) => {
                dispatch(removeNote({ subjectID: noteDetails.subjectID, topicID: noteDetails.topicID, noteID: noteDetails.noteID}))
                dispatch({type: 'RESET_NOTES', payload:''})
                dispatch(operationDone())
            })
            .catch(error => {
                console.log('Error occured while deleting note : ', error);
                dispatch({type: 'RESET_UI', payload:''})
                dispatch(operationDone())
            })
    }
}


export const modifyNote = (noteDetails) => {  // {subjectID : id, topicID: id, noteID: id, noteData: String}
    return dispatch => {
        dispatch(operationGoingOn())
        const db = firebase.firestore()
        return db.collection('subjects')
            .doc(noteDetails.subjectID)
            .collection('Topics')
            .doc(noteDetails.topicID)
            .collection('Notes')
            .doc(noteDetails.noteID)
            .set({
                note: noteDetails.noteData
            })
            .then((docRef) => {
                dispatch(updateNote({ subjectID: noteDetails.subjectID, topicID: noteDetails.topicID, noteID: noteDetails.noteID, noteData: noteDetails.noteData}))
                dispatch(operationDone())
            })
            .catch(error => {
                console.log('Error occured while updating note : ', error);
                dispatch(operationDone())
            })
    }
}