import {
    addTopic,
    removeTopic,
    updateTopic,
    operationGoingOn,
    operationDone
} from '../action/action'

import firebase from '../firebase/firebase'

export const insertTopic = (subID, tName) => {
    return dispatch => {
        dispatch(operationGoingOn())
        const db = firebase.firestore()
        return db.collection('subjects')
                .doc(subID)
                .collection('Topics')
                .add({
                    name: tName
                })
                .then((docRef) => {
                    dispatch(addTopic({subjectID: subID, topicName: tName}))
                    dispatch(operationDone())
                })
                .catch(error => {
                    console.log('Error ocured while inserting topic: ', error);
                    dispatch(operationDone())
                })
    }
}

export const deleteTopic = (subID, tID) => {
    return dispatch => {
        dispatch(operationGoingOn())
        const db = firebase.firestore()
        return db.collection('subjects')
                .doc(subID)
                .collection('Topics')
                .doc(tID)
                .delete()
                .then((docRef) => {
                    dispatch(removeTopic({subjectID: subID, topicID: tID}))
                    dispatch({type: 'RESET_UI', payload:''})
                    dispatch(operationDone())
                })
                .catch(error => {
                    console.log('Error ocured while deleting topic: ', error);
                    dispatch({type: 'RESET_UI', payload:''})
                    dispatch(operationDone())
                })
    }
}


export const modifyTopic = (updateDetails) => {  // {subjectID: id, topicID: id, topicName: name}
    return dispatch => {
        dispatch(operationGoingOn())
        const db = firebase.firestore()
        return db.collection('subjects')
                .doc(updateDetails.subjectID)
                .collection('Topics')
                .doc(updateDetails.topicID)
                .set({
                    name: updateDetails.topicName
                })
                .then((docRef) => {
                    dispatch(updateTopic({subjectID: updateDetails.subjectID, topicID: updateDetails.topicID, topicName: updateDetails.topicName}))
                    dispatch(operationDone())
                })
                .catch(error => {
                    console.log('Error ocured while updating topic: ', error);
                    dispatch(operationDone())
                })
    }
}