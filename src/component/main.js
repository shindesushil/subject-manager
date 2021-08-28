import React, {useState} from 'react'
import { connect } from 'react-redux'



import {Loading} from './loading'


import '../App.css'
import Subjects from './subjects'
import Topics from './topics'
import Notes from './notes'


const Main = ({uireducer}) => {

   

  return(
         <>
          {uireducer.isOperationGoingOn ? <div><Loading /></div> : ''}
               <div className="container">
                  <div className="section">
                     <Subjects />
                  </div>
                  <div className="section">
                     <Topics />
                  </div>
                  <div className="section">
                     <Notes/>
                  </div>
               </div>
         </>
  )

}

const mapStateToProps = state => ({
    uireducer: state.uireducer
})

const mapDispatchToProps = dispatch => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(Main);