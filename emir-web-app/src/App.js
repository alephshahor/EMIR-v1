import React, {Component} from 'react';
import logo from './logo.svg';
import './style/App.css'

import Navbar from './components/navbar'
import Canvas from './components/canvas'
import ToolbarButton from './components/toolbarButton'
import ZoomPanel from './components/zoomPanel'

import { FaSearchPlus, FaSync, FaArrowsAlt, FaBorderNone } from 'react-icons/fa';

import axios from 'axios';

class App extends Component {

  state = {
    canvasWidth: window.innerWidth * 0.33,
    canvasHeight: window.innerWidth * 0.33, 
    stelarPoints: null,
    catalogDimensionInDegrees: null,
    emirVisionFieldDimension: 0.11
  }

  calculateCanvasSize(){
      this.setState({
        canvasWidth: window.innerWidth * 0.33,
        canvasHeight: window.innerWidth * 0.33
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

    let axisBounds = await this.findAxisBounds(stelarPoints)

    let catalogAscensionDim = axisBounds.maximum_ascension - axisBounds.minimum_ascension
    let catalogDeclinationDim = axisBounds.maximum_declination - axisBounds.minimum_declination

    console.log(catalogAscensionDim)
    console.log(catalogDeclinationDim)

    const catalogDimensionInDegrees = 0.35;


    let ascensionCenter = axisBounds.minimum_ascension + (catalogAscensionDim / 2)
    let declinationCenter = axisBounds.minimum_declination + (catalogDeclinationDim / 2)

    let ascensionMinBound = ascensionCenter - catalogDimensionInDegrees / 2;
    let ascensionMaxBound = ascensionCenter + catalogDimensionInDegrees / 2;

    let declinationMinBound = declinationCenter - catalogDimensionInDegrees / 2;
    let declinationMaxBound = declinationCenter + catalogDimensionInDegrees / 2;

    console.log(axisBounds)

     axisBounds = { 
      minimum_ascension: ascensionMinBound,
      maximum_ascension: ascensionMaxBound,
      minimum_declination: declinationMinBound,
      maximum_declination: declinationMaxBound
    }

    console.log(axisBounds)

    stelarPoints = await this.calculatePointsInCanvas(axisBounds, stelarPoints)

    this.setState({
      stelarPoints: stelarPoints,
      catalogDimensionInDegrees: catalogDimensionInDegrees
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
          let stelarPoint = stelarPoints[i]
          if(stelarPoint.declination > axisBounds.minimum_declination && stelarPoint.declination < axisBounds.maximum_declination &&
             stelarPoint.right_ascension > axisBounds.minimum_ascension && stelarPoint.right_ascension < axisBounds.maximum_ascension){
                stelarPoint = this.calculatePointInCanvas(axisBounds, stelarPoints[i])
                stelarPointsInCanvas.push(stelarPoint)
            }
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
            <Navbar></Navbar>
        <div className="container-fluid">
          <div className="row" id="buttons-container-row">
            <div className="col-4" id="buttons-container-col">
              <ToolbarButton icon={<FaSearchPlus/>}></ToolbarButton>
              <ToolbarButton icon={<FaSync/>}></ToolbarButton>
              <ToolbarButton icon={<FaArrowsAlt/>}></ToolbarButton>
              <ToolbarButton icon={<FaBorderNone/>}></ToolbarButton>
            </div>
          </div>
          <div className="row" id="canvas-container-row">
           <div className="col-4" id="canvas-container-col">
            <Canvas canvasWidth={this.state.canvasWidth}
              canvasHeight={this.state.canvasWidth}
              stelarPoints={this.state.stelarPoints}
              catalogDimensionInDegrees={this.state.catalogDimensionInDegrees} 
              emirVisionFieldDimension={this.state.emirVisionFieldDimension}
            />
          </div>
          </div>
          <div className="row" id="tool-panel-container-row">
            <div className="col-4" id="tool-panel-container-col">
             <ZoomPanel></ZoomPanel> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
