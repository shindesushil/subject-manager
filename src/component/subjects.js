import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'

import store from '../centralState/store'
import { setActiveSubject } from '../action/action'

import { fetchAllSubjects } from '../controller/fetchAllSubjects'

import { insertSubject, deleteSubject, modifySubject } from '../controller/subjectController'

import { useStyles } from '../styles/commonStyles'

import { 
    List,
    ListItem,
    IconButton,
    ButtonGroup,
    AppBar,
    Toolbar,
    FormControl,
    Input,
    Button,
    Fade
 } from '@material-ui/core'
 import { 
     Edit,
     Delete,
     Add,
     Close
} from '@material-ui/icons'




const Subjects = ({subjects, uireducer, fetch, getTopics, addSubject, removeSubject, updateSubject}) => {

    const classes = useStyles()

    const [subjectToAdd, setSubjectToAdd] = useState('')
    const [addForm ,setAddForm] = useState(false)
    const [updateForm ,setUpdateForm] = useState(false)

    let [subjectToModify, setSubjectToModify] = useState('')
    const setSubjectToUpdate = (subID) => {
        setSubjectToModify(subID)
        setUpdateForm(true)
        setSubjectToAdd('')
    }

    useEffect(() => {
        console.log('In use effect');
        fetch()
    }, [])


    return (
            <>
                <AppBar position="static">
                  <Toolbar>
                    <p className={classes.head}>Subjects</p>
                    <IconButton className={classes.button} onClick={() => {setAddForm(true); setSubjectToAdd('')}}>
                      <Add />
                    </IconButton>
                  </Toolbar>
               </AppBar> 

               {
                   uireducer.isOperationGoingOn ? <h1>Please Wait</h1> : ''
               }

                <List>
                    {
                    !subjects.isDataFetching && subjects.data ? subjects.data.map(subject => {
                        return (
                            <ListItem button className={classes.listItem} id={subject.id} key={subject.id} onClick={() => getTopics(subject.id)}>
                                {subject.name}
                                <ButtonGroup className={classes.editDelete}>
                                        <IconButton className={classes.icon} onClick={() => {setSubjectToUpdate(subject.id); setSubjectToAdd(subject.name)}}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton className={classes.icon} onClick={() => removeSubject(subject.id)}>
                                            <Delete />
                                        </IconButton>
                                </ButtonGroup>
                            </ListItem>
                        )
                    }) : <div className={classes.waitMessage}><p>Fetching Subjects</p></div>
                    }
                </List>

                <Fade in={addForm || updateForm}>
                    <div className={classes.formContainer}>
                        <IconButton className={classes.closeBtn} onClick={() => { setAddForm(false); setUpdateForm(false) }}>
                            <Close />
                        </IconButton>
                        <FormControl className={classes.form}>
                            <Input 
                                value={subjectToAdd}
                                onChange={(e) => setSubjectToAdd(e.target.value)}
                                placeholder={addForm ? "Add Subject" : "Update Subject"} 
                                className={classes.inputfield}/>
                            {
                                addForm ? <Button className={classes.addBtn} onClick={() => addSubject(subjectToAdd)}>Add</Button> 
                                : <Button className={classes.addBtn} onClick={() => updateSubject({id: subjectToModify, name: subjectToAdd})}>Update</Button>
                            }
                        </FormControl>
                    </div>
                </Fade>
            </>
    )
}

const mapStateToProps = state => ({
    subjects: state.subjects,
    uireducer : state.uireducer
})

const mapDispatchToProps = dispatch => ({
    fetch: () => dispatch(fetchAllSubjects()),
    getTopics: (subjectID) => dispatch(setActiveSubject(subjectID)),
    addSubject: (subjectName) => dispatch(insertSubject(subjectName)),
    removeSubject: subjectID => dispatch(deleteSubject(subjectID)),
    updateSubject: subject => dispatch(modifySubject(subject))
})

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);