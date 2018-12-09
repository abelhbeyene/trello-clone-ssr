import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

window.onload = () => {
    Loadable.preloadReady().then(() => {
        const _preLoadedState = window.__PRELOADED_STATE !== undefined ? window.__PRELOADED_STATE : {}
        ReactDOM.hydrate(<App {..._preLoadedState} />, document.getElementById('root'))
        // delete the global var passed down from server. Only needed for initial mount
        delete window.__PRELOADED_STATE
    })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
