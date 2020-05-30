import React, { Component } from 'react'
import '../style/roiCanvas.css'

// TODO: Change naming "xCenter" and "yCenter" for "roiCenterX" and "roiCenterY"
// TODO: Change naming "drawEmirVisionField" for "drawEmirRoi"

export default class RoiCanvas extends Component {
 constructor(props){
        super(props);
        this.roiDisplayed = false
        this.xCenter = 0
        this.yCenter = 0
        this.dragging = false
        this.onMouseClickDown = this.onMouseClickDown.bind(this)
        this.onMouseClickUp = this.onMouseClickUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
    }

    componentDidUpdate(prevProps){
        console.log("Component did update!")
        this.ctx = this.refs.canvas.getContext("2d")
        this.redrawCanvas();
    }


    redrawCanvas(){
        this.clearCanvas();
        if(this.roiDisplayed){
            let {roiWidth, roiHeight} = this.calculateRoiDimension()
            let leftBottomRoiCornerX = this.xCenter - (roiWidth  / 2)
            let leftBottomRoiCornerY = this.yCenter - (roiHeight / 2)
            this.drawEmirVisionField(leftBottomRoiCornerX, leftBottomRoiCornerY)
        }
    }
        
    clearCanvas(){
        this.ctx.clearRect(0,0, this.props.canvasWidth, this.props.canvasHeight);
    }

    sinDegrees(angleDegrees) {
      return Math.sin(angleDegrees*Math.PI/180);
    };

    cosDegrees(angleDegrees) {
      return Math.cos(angleDegrees*Math.PI/180);
    };

    applyRotation(rotation, x, y){
      let x_ = (x * this.cosDegrees(rotation)) - (y * this.sinDegrees(rotation))
      let y_ = (y * this.cosDegrees(rotation)) + (x * this.sinDegrees(rotation))
      return {x_ , y_}
    }


    drawEmirVisionField(x,y){
        this.ctx.fillStyle = "#2be828"
        this.ctx.globalAlpha = 0.75;
        let width = (this.props.canvasWidth * this.props.emirVisionFieldDimension) / this.props.catalogDimensionInDegrees
        let height =  (this.props.canvasHeight * this.props.emirVisionFieldDimension) / this.props.catalogDimensionInDegrees
        let {roiWidth, roiHeight} = this.calculateRoiDimension()
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.translate( x + roiWidth/2, y + roiHeight/2 );
        this.ctx.rotate(this.props.rotation * Math.PI / 180)
        this.ctx.fillRect( -roiWidth / 2, -roiHeight / 2, width, height)
        this.ctx.globalAlpha = 1;
        this.ctx.restore()
    }

    onMouseClickDown(event){
        this.clearCanvas()
        this.roiDisplayed = true
        this.dragging = true
        let { leftBottomRoiCornerX , leftBottomRoiCornerY } = this.calculateRoiBottomCorner(event)
        this.drawEmirVisionField(leftBottomRoiCornerX,leftBottomRoiCornerY)
        let pointsInsideRoi = this.calculatePointsInsideRoi()
        this.props.displayRoiPoints(pointsInsideRoi)
    }

    calculateRoiBottomCorner(event){
        let { xCenter, yCenter } = this.calculateRoiCenter(event) 
        let { roiWidth, roiHeight } = this.calculateRoiDimension()
        let leftBottomRoiCornerX = xCenter - (roiWidth  / 2)
        let leftBottomRoiCornerY = yCenter - (roiHeight / 2)
        return { leftBottomRoiCornerX, leftBottomRoiCornerY}
    }

    calculateRoiCenter(event){
        let offsetX = document.getElementById("roi-canvas").getBoundingClientRect().left
        let offsetY = document.getElementById("roi-canvas").getBoundingClientRect().top
        let xCenter = (event.clientX - offsetX) 
        let yCenter = (event.clientY - offsetY) 
        this.xCenter = xCenter
        this.yCenter = yCenter
        return {xCenter, yCenter}
    }

    calculateRoiDimension(){
        let roiWidth = (this.props.canvasWidth * this.props.emirVisionFieldDimension) / this.props.catalogDimensionInDegrees
        let roiHeight = (this.props.canvasHeight * this.props.emirVisionFieldDimension) / this.props.catalogDimensionInDegrees
        return {roiWidth, roiHeight}
    }

    // TODO: Simplify this!
    calculatePointsInsideRoi(){
       let {leftLimit, righLimit, topLimit, bottomLimit} = this.calculateRoiLimits()
       
       leftLimit /= this.props.canvasWidth
       righLimit /= this.props.canvasWidth
       topLimit  /= this.props.canvasHeight
       bottomLimit /= this.props.canvasHeight

       let stelarObjects = this.props.stelarPoints
       let objectsInsideRoi = []
       for(var i = 0; i < stelarObjects.length; i++){
           if(stelarObjects[i].fixed_right_ascension < righLimit && stelarObjects[i].fixed_right_ascension > leftLimit
           && stelarObjects[i].fixed_declination < topLimit && stelarObjects[i].fixed_declination > bottomLimit){
                objectsInsideRoi.push(stelarObjects[i])
           }
       }

       return objectsInsideRoi
    }

    calculateRoiLimits = () => {
        let xCenter = this.xCenter
        let yCenter = this.yCenter
        let { roiWidth, roiHeight } = this.calculateRoiDimension()

        let leftLimit = xCenter - (roiWidth / 2)
        let righLimit = xCenter + (roiWidth / 2)
        let topLimit = yCenter + (roiHeight / 2)
        let bottomLimit = yCenter - (roiHeight / 2)

        return {leftLimit, righLimit, topLimit, bottomLimit}
    }

    onMouseClickUp(event){
        this.dragging = false
        console.log("Released")
    }

    onMouseMove(event){
        if(this.dragging){
            this.clearCanvas()
            let { leftBottomRoiCornerX , leftBottomRoiCornerY } = this.calculateRoiBottomCorner(event)
            this.drawEmirVisionField(leftBottomRoiCornerX , leftBottomRoiCornerY)
            let pointsInsideRoi = this.calculatePointsInsideRoi()
            this.props.displayRoiPoints(pointsInsideRoi)
        }
    }

    render(){
        return (
            <canvas id="roi-canvas" ref="canvas" width={this.props.canvasWidth} height={this.props.canvasHeight}
                    onMouseDown={(e) => this.onMouseClickDown(e)} onMouseUp={(e) => this.onMouseClickUp(e)}
                    onMouseMove={(e) => this.onMouseMove(e)}/>
        )
    }
}

