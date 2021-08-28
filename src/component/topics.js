import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'

import { setActiveTopic } from '../action/action'

import { insertTopic, deleteTopic, modifyTopic } from '../controller/topicsController'

import store from '../centralState/store'

import { useStyles } from '../styles/commonStyles'

import { 
    AppBar,
    Toolbar,
    List,
    ListItem,
    IconButton,
    ButtonGroup,
    Fade,
    FormControl,
    Button,
    Input
 } from '@material-ui/core'
 import { 
     Edit,
     Delete,
     Add,
     Close
} from '@material-ui/icons'




const Topics = ({uireducer, data, getNotes, addTopic, removeTopic, updateTopic}) => {

    const classes = useStyles()
    
    const [addForm, setAddForm] = useState(false)
    const [updateForm, setUpdateForm] = useState(false)
    const [topicToAdd, setTopicToAdd] = useState('')
    const [topics, setTopics] = useState([])

    useEffect(() => {
        setTopics([])
        console.log('Active Subject : ', uireducer.activeSubject);
        if(uireducer.activeSubject){
            console.log('Data : ', data.filter(subject => (subject.id === uireducer.activeSubject))[0].topics);
            setTopics(data.filter(subject => (subject.id === uireducer.activeSubject))[0].topics)
        }
        console.log('State in topics : ', store.getState());
    }, [uireducer.activeSubject, data])

    return (
            <>
                <AppBar position="static">
                  <Toolbar>
                    <p className={classes.head}>Topics</p>
                    <IconButton className={classes.button} onClick={() => {setAddForm(true); setTopicToAdd('')}}>
                      <Add />
                    </IconButton>
                  </Toolbar>
               </AppBar>

               {
                   uireducer.isOperationGoingOn ? 'Please wait' : uireducer.isOperationGoingOn
               }

                <List>
                    {
                    topics.length > 0 ? topics.map(topic => {
                        return (
                            <ListItem button className={classes.listItem} key={topic.id} onClick={() => getNotes(topic.id)}>
                                {topic.name}
                                <ButtonGroup className={classes.editDelete}>
                                        <IconButton className={classes.icon} onClick={() => {setUpdateForm(true); setTopicToAdd(topic.name); setAddForm(false); setAddForm(false)}}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton className={classes.icon} onClick={() => removeTopic(uireducer.activeSubject, topic.id)}>
                                            <Delete />
                                        </IconButton>
                                </ButtonGroup>
                            </ListItem>
                        )
                    }) : uireducer.activeSubject ? <div className={classes.waitMessage}><p>No topics yet</p></div> 
                        : <div className={classes.waitMessage}><p>Select subject to see topics</p></div>
                    }
                </List>

                <Fade in={addForm || updateForm}>
                    <div className={classes.formContainer}>
                        <IconButton className={classes.closeBtn} onClick={() => { setAddForm(false); setUpdateForm(false) }}>
                            <Close />
                        </IconButton>
                        <FormControl className={classes.form}>
                            <Input 
                                placeholder= {addForm ? "Add Topic" : "Update Topic"} 
                                className={classes.inputfield}
                                value={topicToAdd}
                                onChange={(e) => setTopicToAdd(e.target.value)}
                            />
                            {
                                addForm ? <Button className={classes.addBtn} onClick={() => addTopic(uireducer.activeSubject, topicToAdd)}>Add</Button>
                                    : <Button className={classes.addBtn} onClick={() => updateTopic(uireducer.activeSubject, uireducer.activeTopic,topicToAdd)}>Update</Button>
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
    getNotes: (topicID) => dispatch(setActiveTopic(topicID)),
    addTopic: (subjectID, topicName) => dispatch(insertTopic(subjectID, topicName)),
    removeTopic: (subjectID, topicID) => dispatch(deleteTopic(subjectID, topicID)),
    updateTopic: (subID, tID, tName) => dispatch(modifyTopic({subjectID: subID, topicID: tID, topicName: tName}))
})

export default connect(mapStateToProps, mapDispatchToProps)(Topics);  