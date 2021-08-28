import store from '../centralState/store'

import {
    addSubject,
    removeSubject,
    updateSubject,
    operationDone,
    operationGoingOn
} from '../action/action'

import firebase from '../firebase/firebase'

export const insertSubject = (subjectName) => {
    console.log('In subject controller : ', subjectName);
    return (dispatch) => {
        dispatch(operationGoingOn())
        console.log('in subject thunk');
        const db = firebase.firestore()

        return db.collection('subjects')
                    .add({
                        name: subjectName
                    }).then(docRef => {
                        console.log('DOC Ref : ',docRef);
                        dispatch(addSubject({id: docRef.id, name: subjectName}))
                        console.log('dispatch in then');
                        dispatch(operationDone())
                    }).catch(error => {
                        console.log('Error: ', error);
                        console.log('dispatch in catch');
                        dispatch(operationDone())
                    })

    }
}

export const deleteSubject = subjectID => {
    return dispatch => {
        dispatch(operationGoingOn())
        const db = firebase.firestore()
        return db.collection('subjects')
            .doc(subjectID)
            .delete()
            .then((docRef) => {
                dispatch(removeSubject(subjectID))
                dispatch({type: 'RESET_UI', payload:''})
                dispatch(operationDone())
            })
            .catch((error) => {
                console.log('Error while deleting subject : ', error);
                dispatch({type: 'RESET_UI', payload:''})
                dispatch(operationDone())
            })
    }
}

export const modifySubject = subject => {
    console.log('state in modify 1 : ', store.getState());
    return async dispatch => {
        dispatch(operationGoingOn())
        const db = firebase.firestore()
        db.collection('subjects')
            .doc(subject.id)
            .set({
                name: subject.name
            })
            .then((docRef => {
                dispatch(updateSubject({id: subject.id, name: subject.name}))
                dispatch(operationDone())
            }))
            .catch((error) => {
                console.log('Error while updating subject : ', error);
                dispatch(operationDone())
            })
    }
}