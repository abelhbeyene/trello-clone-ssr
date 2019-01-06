import React, { Component } from 'react'
import Loadable from 'react-loadable'
import logo from './logo.svg'
import './App.css'
import apiUtil from './api-utils'
import PropTypes from 'prop-types'
// import {ssrRenderingComplete} from './server/middleware/renderer'

// const AsyncComponent = Loadable({
//   loader: () => import(/* webpackChunkName: "myNamedChunk" */ './someComponent'),
//   loading: () => <div>loading...</div>,
//   modules: ['myNamedChunk']
// });

class App extends Component {
    static propTypes = {
        panels: PropTypes.array,
        activePanelValue: PropTypes.object,
        isServerSide: PropTypes.bool
    }

    // on SSR we pass the values as props
    state = {
        panels: this.props.panels ? this.props.panels : [],
        activePanelValue: this.props.activePanelValue ? this.props.activePanelValue : {}
    }

    static fetchAction = () => {
        return apiUtil.get('/api/panelList')
            .then(jsonResponse => {
                return {
                    panels: jsonResponse
                }
            })
    }

    componentWillMount() {
        if (this.props.isServerSide) return
        App.fetchAction()
            .then((res) => {
                this.setState({...res})
            })
    }

    componentDidMount() {
        console.log('componentDidMount-->', this.props, this.state);
    }

    /**
     * Sets this.state.activePanelValue so input can update as user types
     */
    setActivePanel = ({panelId, panelName}) => {
        this.setState({
            activePanelValue: {
                [panelId]: panelName
            }
        })
    }

    /**
     * Updates this.state.activePanelValue so input can update as user types
     */
    panelChange = (e, panel) => {
        this.setState({
            activePanelValue: {
                [panel.panelId]: e.target.value
            }
        })
    }

    /**
     * Update the value in DB
     */
    panelUpdate = (e, {panelId, panelName}) => {
        console.log('panelUpdate-->', panelId, panelName)
        const newPanelName = this.state.activePanelValue[panelId]
        const payload = {
            panelId: panelId,
            panelName: newPanelName
        }

        // same? don't update
        if (newPanelName === panelName) {
            return
        }

        apiUtil.put('/api/updatePanel', payload)
            .then((jsonResponse) => {
                const _panels = [...this.state.panels]
                _panels[panelId] = jsonResponse.pop()
                this.setState((prevState) => ({
                    panels: _panels
                }))
            })
    }
    
    /**
     * Adds new panel
     */
    panelAdd = e => {
        if (!e.target.value) {
            return
        }

        const payload = {
            panelId: this.state.panels.length,
            panelName: e.target.value
        }

        apiUtil.post('/api/addPanel', payload)
            .then((jsonResponse) => {
                this.setState((prevState) => ({
                    panels: [
                        ...prevState.panels,
                        jsonResponse
                    ]
                }))
            })
        
        // reset input
        e.target.value = ''
        
    }

    render() {
        const {panels, activePanelValue} = this.state
        return (
            <div className="App">
                {/* Existing editable Panels */}
                {panels.map((panel) => (
                    <div>
                        <input
                            onFocus={() => {this.setActivePanel(panel)}}
                            onBlur={(e) => {this.panelUpdate(e, panel)}}
                            onChange={(e) => {this.panelChange(e, panel)}}
                            value={activePanelValue[panel.panelId] || panel.panelName}
                            // placeholder="Add panel name"
                        />
                    </div>
                ))}
                {/* Add new panel? */}
                <div>
                    <input onBlur={(e) => this.panelAdd(e)} placeholder="Add panel name" />
                </div>
            </div>
        )
    }
}

export default App
