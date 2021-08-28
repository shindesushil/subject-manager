import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'


import { insertNote, deleteNote, modifyNote } from '../controller/notesController'

import { useStyles } from '../styles/commonStyles'

import { 
    List,
    ListItem,
    IconButton,
    ButtonGroup,
    AppBar,
    Toolbar,
    Input,
    Button,
    FormControl,
    Fade
 } from '@material-ui/core'
 import { 
     Edit,
     Delete,
     Add,
     Close
} from '@material-ui/icons'





const Notes = ({uireducer, data, addNote, removeNote, updateNote}) => {

    const classes = useStyles()

    const [notes, setNotes] = useState([])
    const [addNoteForm, setAddNoteForm] = useState(false)
    const [updateNoteForm, setUpdateNoteForm] = useState(false)
    const [noteToUpdate, setNoteToUpdate] = useState('')
    const [noteToAdd, setNoteToAdd] = useState('')

    useEffect(() => {
        setNotes([])
        setNoteToUpdate('')
        if(uireducer.activeTopic){
            setNotes(data.filter(subject => (subject.id === uireducer.activeSubject))[0].topics.filter(topic => topic.id === uireducer.activeTopic)[0].notes)
        }
    }, [uireducer.activeTopic, data])

    return (
            <>
                <AppBar position="static">
                  <Toolbar>
                    <p className={classes.head}>Notes</p>
                    <IconButton className={classes.button} onClick={() => {setAddNoteForm(true); setNoteToAdd('')}}>
                      <Add />
                    </IconButton>
                  </Toolbar>
                </AppBar>

                <List>
                    {
                    notes.length > 0 ? notes.map(note => {
                        return (
                            <ListItem button className={classes.listItem} id={note.id} key={note.id}>
                                {note.noteData}
                                <ButtonGroup className={classes.editDelete}>
                                        <IconButton className={classes.icon} onClick={() => {setUpdateNoteForm(true); setNoteToUpdate(note.id); setNoteToAdd(note.noteData); setAddNoteForm(false)}}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton className={classes.icon} onClick={() => removeNote(uireducer.activeSubject, uireducer.activeTopic, note.id)}>
                                            <Delete />
                                        </IconButton>
                                </ButtonGroup>
                            </ListItem>
                        )
                    }) : uireducer.activeTopic ? <div className={classes.waitMessage}><p>No notes Yet</p></div> 
                        : <div className={classes.waitMessage}><p>Select topic to see notes</p></div> 
                    }
                </List>

                <Fade in={addNoteForm || updateNoteForm}>
                    <div className={classes.formContainer}>
                        <IconButton className={classes.closeBtn} onClick={() => {setAddNoteForm(false); setUpdateNoteForm(false)}}>
                            <Close />
                        </IconButton>
                        <FormControl className={classes.form}>
                            <Input 
                                placeholder= {addNoteForm ? "Add Note" : "Update Note" } 
                                className={classes.inputfield}
                                value={noteToAdd}
                                onChange={e => setNoteToAdd(e.target.value)}
                            />
                            {
                                addNoteForm ? <Button className={classes.addBtn} onClick={() => addNote(uireducer.activeSubject, uireducer.activeTopic, noteToAdd)}>Add</Button>
                                    : <Button className={classes.addBtn} onClick={() => updateNote(uireducer.activeSubject, uireducer.activeTopic, noteToUpdate, noteToAdd)}>Update</Button>
                            }
                        </FormControl>
                    </div>
                </Fade>

            </>
    )
}

const mapStateToProps = state => ({
    uireducer: state.uireducer,
    data: state.subjects.data
})

const mapDispatchToProps = dispatch => ({
    addNote: (subID, tID, data) => dispatch(insertNote({subjectID: subID, topicID: tID, noteData: data})),
    removeNote: (subID, tID, nID) => dispatch(deleteNote({subjectID: subID, topicID: tID, noteID: nID})),
    updateNote: (subID, tID, nID, data) => dispatch(modifyNote({subjectID: subID, topicID: tID, noteID: nID, noteData: data}))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes);  