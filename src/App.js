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
        show: false,
    }

    onClick = e => {
        e.preventDefault()
        this.setState({
            show: 1,
        })
    }

    render() {
        return (
            <div className="App">
                {/*
          
        
        */}
                Hey ! I said a!asdasd
            </div>
        )
    }
}

export default App
