import React, { Component } from 'react'
import '../style/roiCanvas.css'

export default class RoiCanvas extends Component {
 constructor(props){
        super(props);
        this.onMouseClickDown = this.onMouseClickDown.bind(this)
        this.onMouseClickUp = this.onMouseClickUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.state = {
            dragging: false,
            xCenter: 0,
            yCenter: 0
        }
    }

    componentDidUpdate(prevProps){
        console.log("Component did update!")
        this.ctx = this.refs.canvas.getContext("2d")
        this.centerX = this.props.canvasWidth / 2;
        this.centerY = this.props.canvasHeight / 2;
        this.redrawCanvas();
    }


    redrawCanvas(){
        this.clearCanvas();
        this.drawEmirVisionField(this.state.xCenter,this.state.yCenter)
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
        this.redrawCanvas();
        this.dragging = true
        console.log("Position: ", event.clientX, event.clientY)
        let { x,y } = this.calculateEmirFieldCenter(event)
        this.drawEmirVisionField(x,y)
    }

    calculateEmirFieldCenter(event){
        let offsetX = document.getElementById("roi-canvas").getBoundingClientRect().left
        let offsetY = document.getElementById("roi-canvas").getBoundingClientRect().top
        let x = (event.clientX - offsetX) - ((this.props.canvasWidth * 0.1) / 2)
        let y = (event.clientY - offsetY) - ((this.props.canvasWidth * 0.1) / 2)
        this.setState({
            xCenter: x,
            yCenter: y
        })
        return { x, y }
    }

    onMouseClickUp(event){
        this.dragging = false
        console.log("Released")
    }

    onMouseMove(event){
        if(this.dragging){
            this.redrawCanvas()
            let { x,y } = this.calculateEmirFieldCenter(event)
            this.drawEmirVisionField(x,y)
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

