import React, {Component} from 'react';
import logo from './logo.svg';
import './style/App.css'

import Navbar from './components/navbar'
import Canvas from './components/canvas'

import axios from 'axios';

class App extends Component {

  state = {
    canvasWidth: window.innerWidth * 0.5,
    canvasHeight: window.innerHeight * 0.5,
    stelarPoints: null 
  }

  calculateCanvasSize(){
      this.setState({
        canvasWidth: window.innerWidth * 0.5,
        canvasHeight: window.innerHeight * 0.5
      })
  }

  componentDidMount(){

    const handleResize = () => {
      this.calculateCanvasSize();
    }

    window.addEventListener('resize', handleResize)
    handleResize();

    this.fetchDataFromApi();
   }

   fetchDataFromApi = async () => {

    const response = await fetch("http://localhost:8000/emir/");
    let stelarPoints = await response.json();


    const axisBounds = await this.findAxisBounds(stelarPoints)
    stelarPoints = await this.calculatePointsInCanvas(axisBounds, stelarPoints)

    this.setState({
      stelarPoints: stelarPoints
    })
  
   }

     findAxisBounds(stelarPoints){
        let minimum_ascension = stelarPoints[0]['right_ascension']
        let maximum_ascension = stelarPoints[0]['right_ascension']

        let minimum_declination = stelarPoints[0]['declination']
        let maximum_declination = stelarPoints[0]['declination']

        for (let i = 0; i < stelarPoints.length; i++){
            if(stelarPoints[i]['right_ascension'] < minimum_ascension)
                minimum_ascension = stelarPoints[i]['right_ascension']
            if(stelarPoints[i]['right_ascension'] > maximum_ascension)
                maximum_ascension = stelarPoints[i]['right_ascension']
            if(stelarPoints[i]['declination'] < minimum_declination)
                minimum_declination = stelarPoints[i]['declination']
            if(stelarPoints[i]['declination'] > maximum_declination)
                maximum_declination = stelarPoints[i]['declination']
        }

        return { minimum_ascension, minimum_declination, maximum_ascension, maximum_declination }
    }
  
  
    calculatePointsInCanvas(axisBounds, stelarPoints){
      let stelarPointsInCanvas = []
        for(let i = 0; i < stelarPoints.length; i++){
            let stelarPoint = this.calculatePointInCanvas(axisBounds, stelarPoints[i])
            stelarPointsInCanvas.push(stelarPoint)
        }
        return stelarPointsInCanvas;
    }

    calculatePointInCanvas(axisBounds, stelarPoint){

        let point =  stelarPoint;

        let declination = (stelarPoint['declination'] - axisBounds['minimum_declination']) / (axisBounds['maximum_declination'] - axisBounds['minimum_declination'])
        let ascension = (stelarPoint['right_ascension']- axisBounds['minimum_ascension']) / (axisBounds['maximum_ascension'] - axisBounds['minimum_ascension'])

        
        point['declination'] = declination
        point['right_ascension'] = ascension


        return point;
    } 

  render(){

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6" id="canvas-container">
              <Canvas canvasWidth={this.state.canvasWidth}
                canvasHeight={this.state.canvasWidth}
                stelarPoints={this.state.stelarPoints}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
