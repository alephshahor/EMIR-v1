import React, {Component} from 'react';
import logo from './logo.svg';
import './style/App.css'

import Navbar from './components/navbar'
import Canvas from './components/canvas'
import ToolbarButton from './components/toolbarButton'
import ZoomPanel from './components/zoomPanel'
import RotationPanel from './components/rotationPanel'
import MovePanel from './components/movePanel'

import { FaSearchPlus, FaSync, FaArrowsAlt, FaBorderNone } from 'react-icons/fa';

import axios from 'axios';

class App extends Component {

  state = {
    canvasWidth: window.innerWidth * 0.33,
    canvasHeight: window.innerWidth * 0.33, 
    originalStelarPoints: null,
    stelarPoints: null,
    catalogDimensionInDegrees: null,
    emirVisionFieldDimension: 0.11,
    currentPanel: 'Zoom',
    catalogDimensionInDegrees: 0.35 
  }

  calculateCanvasSize(){
      this.setState({
        canvasWidth: window.innerWidth * 0.33,
        canvasHeight: window.innerWidth * 0.33
      })
  }

  async componentDidMount(){

    const handleResize = () => {
      this.calculateCanvasSize();
    }

    window.addEventListener('resize', handleResize)
    handleResize();

    console.log("Hi")

    let response = await fetch("http://localhost:8000/emir/")
    let stelarPoints = await response.json()
    let stateSetted = await this.setState({originalStelarPoints: stelarPoints})
    let log = await console.log("Hi fucking javascript", stelarPoints)
    let treatPoints = await this.treatPoints(this.state.originalStelarPoints)

    /*fetch("http://localhost:8000/emir/").then(
      (response) => response.json()
    ).then(
      (stelarPoints) => this.setState({originalStelarPoints: stelarPoints})
    ).then(
      () => console.log("Hi 1", this.state.originalStelarPoints)
    ).then(
      () => this.treatPoints(this.state.originalStelarPoints)
    )*/

  //  let data = this.fetchDataFromApi().then(() => this.treatPoints(this.state.originalStelarPoints));

   }

   /* fetchDataFromApi = async () => {

    const response = await fetch("http://localhost:8000/emir/");
    let stelarPoints = await response.json();
    let trythis = await this.setState({originalStelarPoints: stelarPoints})
    console.log("Cucu: " , this.state.originalStelarPoints)
    return true;
   } */

   treatPoints(StelarPoints){

    let originalStelarPoints = StelarPoints;

    let axisBounds = this.findAxisBounds(originalStelarPoints)

    let catalogAscensionDim = axisBounds.maximum_ascension - axisBounds.minimum_ascension
    let catalogDeclinationDim = axisBounds.maximum_declination - axisBounds.minimum_declination

    let ascensionCenter = axisBounds.minimum_ascension + (catalogAscensionDim / 2)
    let declinationCenter = axisBounds.minimum_declination + (catalogDeclinationDim / 2)

    let ascensionMinBound = ascensionCenter - this.state.catalogDimensionInDegrees / 2;
    let ascensionMaxBound = ascensionCenter + this.state.catalogDimensionInDegrees / 2;

    let declinationMinBound = declinationCenter - this.state.catalogDimensionInDegrees / 2;
    let declinationMaxBound = declinationCenter + this.state.catalogDimensionInDegrees / 2;

     axisBounds = { 
      minimum_ascension: ascensionMinBound,
      maximum_ascension: ascensionMaxBound,
      minimum_declination: declinationMinBound,
      maximum_declination: declinationMaxBound
    }

    let stelarPoints_ = this.calculatePointsInCanvas(axisBounds, originalStelarPoints)
    console.log(stelarPoints_)

    this.setState({
      stelarPoints: stelarPoints_
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
                let stelarPointCopy = this.calculatePointInCanvas(axisBounds, stelarPoint)
                stelarPointsInCanvas.push(stelarPointCopy)
            }
        }
        return stelarPointsInCanvas;
    }

    calculatePointInCanvas(axisBounds, stelarPoint){

        let {pk, declination, right_ascension, prioriy} =  stelarPoint;

        declination = (declination - axisBounds['minimum_declination']) / (axisBounds['maximum_declination'] - axisBounds['minimum_declination'])
        right_ascension = (right_ascension - axisBounds['minimum_ascension']) / (axisBounds['maximum_ascension'] - axisBounds['minimum_ascension'])

        return {pk, declination, right_ascension, prioriy}
    } 

    displayToolPanel(type){
      switch(type){
        case 'Zoom':
          return (<ZoomPanel zoomIn={this.zoomIn} zoomOut={this.zoomOut}></ZoomPanel>)
          break;
        case 'Rotation':
          return (<RotationPanel></RotationPanel>)
          break;
        case 'Move':
          return (<MovePanel></MovePanel>)
          break;
      }
    }

    setToolPanel(panel){
      this.setState({
        currentPanel: panel
      })
    }

    zoomIn = async () => {
      const catalogDimensionInDegrees_ = this.state.catalogDimensionInDegrees;
      let changeState = await this.setState({
        catalogDimensionInDegrees: catalogDimensionInDegrees_ - 0.1
      })
      this.treatPoints(this.state.originalStelarPoints);
    }

    zoomOut = async () => {
      const catalogDimensionInDegrees_ = this.state.catalogDimensionInDegrees;
      let changeState = await this.setState({
        catalogDimensionInDegrees: catalogDimensionInDegrees_ + 0.1
      })
      this.treatPoints(this.state.originalStelarPoints);
    }

  render(){

    return (
      <div className="App">
            <Navbar></Navbar>
        <div className="container-fluid">
          <div className="row" id="buttons-container-row">
            <div className="col-4" id="buttons-container-col">
              <ToolbarButton icon={<FaSearchPlus/>} setToolPanel={this.setToolPanel.bind(this)} buttonType={'Zoom'}></ToolbarButton>
              <ToolbarButton icon={<FaSync/>} setToolPanel={this.setToolPanel.bind(this)} buttonType={'Rotation'}></ToolbarButton>
              <ToolbarButton icon={<FaArrowsAlt/>} setToolPanel={this.setToolPanel.bind(this)} buttonType={'Move'}></ToolbarButton>
              <ToolbarButton icon={<FaBorderNone/>} setToolPanel={this.setToolPanel.bind(this)}></ToolbarButton>
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
              {this.displayToolPanel(this.state.currentPanel)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
