import React, { Component } from 'react'
import '../style/roiCanvas.css'

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

    drawEmirVisionField(x,y){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#2be828"
        this.ctx.globalAlpha = 0.75;
        this.ctx.rect(x,y, (this.props.canvasWidth * this.props.emirVisionFieldDimension) / this.props.catalogDimensionInDegrees, 
                           (this.props.canvasHeight * this.props.emirVisionFieldDimension) / this.props.catalogDimensionInDegrees)
        this.ctx.fill()
        this.ctx.globalAlpha = 1;
    }

    onMouseClickDown(event){
        this.clearCanvas()
        this.roiDisplayed = true
        this.dragging = true
        let { leftBottomRoiCornerX , leftBottomRoiCornerY } = this.calculateRoiBottomCorner(event)
        this.drawEmirVisionField(leftBottomRoiCornerX,leftBottomRoiCornerY)
        this.calculatePointsInsideRoi()
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
       let {topLeftCorner, topRightCorner, bottomLeftCorner, bottomRighCorner} = this.calculateFixedCorners()
       let stelarObjects = this.props.stelarPoints
       let objectsInsideRoi = []
       for(var i = 0; i < stelarObjects.length; i++){
           if(stelarObjects[i].fixed_right_ascension < topRightCorner[0] && stelarObjects[i].fixed_right_ascension > topLeftCorner[0]
           && stelarObjects[i].fixed_declination < topRightCorner[1] && stelarObjects[i].fixed_declination > bottomRighCorner[1]){
                objectsInsideRoi.push(stelarObjects[i])
           }
       }
       console.log(objectsInsideRoi)
    }

    // TODO: Simplify this, no need to calculate corners.
    calculateFixedCorners(){
        let {roiWidth, roiHeight} = this.calculateRoiDimension()
        let centerX = this.xCenter + (roiWidth / 2)
        let centerY = this.yCenter + (roiHeight / 2)

        console.log(centerX, centerY)
        console.log(centerX / this.props.canvasWidth, centerY / this.props.canvasHeight)
        
        let topLeftCorner = [(centerX - (roiWidth/2)) / this.props.canvasWidth, (centerY + (roiHeight/2)) / this.props.canvasHeight]
        let topRightCorner = [(centerX + (roiWidth/2)) / this.props.canvasWidth, (centerY + (roiHeight/2)) / this.props.canvasHeight]
        let bottomLeftCorner = [(centerX - (roiWidth/2)) / this.props.canvasWidth, (centerY - (roiHeight/2)) / this.props.canvasHeight]
        let bottomRighCorner = [(centerX + (roiWidth/2)) / this.props.canvasWidth , (centerY - (roiHeight/2)) / this.props.canvasHeight]
        
        return {topLeftCorner, topRightCorner, bottomLeftCorner, bottomRighCorner}
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

