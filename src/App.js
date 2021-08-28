import React from 'react'

import Main from './component/main'

// redux
import { Provider } from 'react-redux'
import store from './centralState/store'


const App = () => {

  return(
      <Provider store={store}>
        <Main />
      </Provider>
  )

}

export default App;