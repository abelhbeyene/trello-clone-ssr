import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

window.onload = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(<App />, document.getElementById('root'))
    })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
