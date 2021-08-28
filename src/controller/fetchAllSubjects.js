import {
    fetchingData,
    fetchedData,
    fetchDataError
} from '../action/action'

import firebase from '../firebase/firebase'


export const fetchAllSubjects = () => {
    console.log('IN fetch all subjects');
    return (dispatch) => {
        console.log('in thunk');
        dispatch(fetchingData())

        let allSubjects = []
        const db1 = firebase.firestore()
        return db1.collection('subjects')
            .get()
            .then(snapshot => {
                snapshot.forEach((subject) => {
                    
                    let subjectID = subject.id
                    let subjectName = subject.data().name

                    // Fetch topics now---------------------------------------------------------
                    let allTopics = []
                    db1.collection('subjects')
                        .doc(subjectID)
                        .collection('Topics')
                        .get()
                        .then(topicsSnapshot => {
                            topicsSnapshot.forEach(topic => {
                                let topicID = topic.id
                                let topicName = topic.data().name

                                // Fetch Notes Now------------------------------------------------
                                let allNotes = []
                                db1.collection('subjects')
                                    .doc(subjectID)
                                    .collection('Topics')
                                    .doc(topicID)
                                    .collection('Notes')
                                    .get()
                                    .then(notesSnapshot => {
                                        notesSnapshot.forEach(note => {
                                            let currentNote = {
                                                id: note.id,
                                                noteData: note.data().note
                                            }
                                            allNotes.push(currentNote)
                                        })
                                    })
                                    .catch(error => {
                                        console.log('Error in notes : ', error);
                                    })

                                let currentTopic = {
                                    id: topicID,
                                    name: topicName,
                                    notes: allNotes
                                }
                                allTopics.push(currentTopic)
                            })
                        })
                        .catch(error => {
                            console.log('Error in topics : ', error);
                        })

                        let currentSubject = {
                            id: subjectID,
                            name: subjectName,
                            topics: allTopics
                        }
                        allSubjects.push(currentSubject)
                })
                console.log(allSubjects);
                dispatch(fetchedData(allSubjects))
            })
            .catch(error => {
                console.log('Error in subjects : ',error);
                dispatch(fetchDataError(error))
            })
    }
}

