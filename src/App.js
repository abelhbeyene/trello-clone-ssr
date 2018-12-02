import React, { Component } from 'react'
import Loadable from 'react-loadable'
import logo from './logo.svg'
import './App.css'

// const AsyncComponent = Loadable({
//   loader: () => import(/* webpackChunkName: "myNamedChunk" */ './someComponent'),
//   loading: () => <div>loading...</div>,
//   modules: ['myNamedChunk']
// });

class App extends Component {
    state = {
        panels: []
    }

    componentWillMount() {
        // fetch data from API
    }

    panelUpdate = e => {
        console.log('panelUpdate-->', e)

    }
    
    /**
     * Adds new panel
     */
    panelAdd = e => {
        console.log('panelAdd-->', e)

        const payload = {
            panelId: this.state.panels.length,
            panelName: e.target.value
        }
        fetch('/api/addPanel', {
            body: JSON.stringify(payload),
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            this.setState((prevState) => ({
                panels: [
                    ...prevState.panels,
                    payload
                ]
            }))
        })

        e.target.value = ''
        
    }

    render() {
        const {panels} = this.state
        return (
            <div className="App">
                {/* Existing editable Panels */}
                {panels.map((panel) => (
                    <div>
                        <input onBlur={this.panelUpdate} data-panel-id={panel.panelId} value={panel.panelName} placeholder="Add panel name" />
                    </div>
                ))}
                {/* Add new panel? */}
                <div>
                    <input onBlur={this.panelAdd} placeholder="Add panel name" />
                </div>
            </div>
        )
    }
}

export default App
