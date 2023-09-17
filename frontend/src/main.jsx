import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Routing from './config/routing.config'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { Provider} from "react-redux"
import store from './config/store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
        <Routing/>
    </Provider>
  </React.StrictMode>,
)
