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
                console.log('-->', 'API CALL');
                const _activePanelValue = {}
                jsonResponse.forEach(({panelId, panelName}) => {
                    _activePanelValue[panelId] = panelName
                })
                return {
                    panels: jsonResponse,
                    activePanelValue: _activePanelValue
                }
            })
    }

    componentWillMount() {
        if (this.props.isServerSide) return
        App.fetchAction()
            .then((res) => {
                this.setState(...res)
            })
    }

    componentDidMount() {
        console.log('componentDidMount-->', this.props, this.state);
    }

    panelChange = (panel) => {
        this.setState({
            activePanelValue: panel.panelName
        })
    }

    panelUpdate = (panel) => {
        console.log('panelUpdate-->', panel)
        

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
                        <input onBlur={() => this.panelUpdate(panel)} onChange={this.panelChange} value={activePanelValue[panel.panelId]} placeholder="Add panel name" />
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
