import React from 'react'

import { CircularProgress } from '@material-ui/core'

import { loadingStyles } from '../styles/commonStyles'

export const Loading = () => {

    const loadingClasses = loadingStyles()

    return(
        <div className={loadingClasses.container}>
            <CircularProgress color="primary" />
            <h2>Please Wait</h2>
        </div>
    )
}