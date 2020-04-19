import React, {Component} from 'react';
import logo from './logo.svg';
import './style/App.css'

import Navbar from './components/navbar'
import Canvas from './components/canvas'

class App extends Component {

  state = {
    canvasWidth: window.innerWidth * 0.5,
    canvasHeight: window.innerHeight * 0.5
  }

  componentDidMount(){
    const handleResize = () => {
      this.setState({
        canvasWidth: window.innerWidth * 0.5,
        canvasHeight: window.innerHeight * 0.5
      })
    }
    window.addEventListener('resize', handleResize)
   }

  render(){

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6" id="canvas-container">
              <Canvas canvasWidth={this.state.canvasWidth}
                canvasHeight={this.state.canvasHeight}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
