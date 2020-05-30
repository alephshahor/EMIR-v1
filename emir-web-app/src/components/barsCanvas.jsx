import React, {Component} from 'react'
import '../style/barsCanvas.css'

export default class BarsCanvas extends Component {

    constructor(props){
        super(props);

        this.state = {
            dragging: false
        }

        this.configuration = [
            {id: 1, x: 0.10},
            {id: 2, x: 0.20},
            {id: 3, x: 0.30},
            {id: 4, x: 0.40},
            {id: 5, x: 0.50},
            {id: 6, x: 0.60},
            {id: 7, x: 0.70},
            {id: 8, x: 0.80},
            {id: 9, x: 0.90},
            {id: 10, x: 1},
            {id: 11, x: 1},
            {id: 12, x: 0.90},
            {id: 13, x: 0.80},
            {id: 14, x: 0.70},
            {id: 15, x: 0.60},
            {id: 16, x: 0.50},
            {id: 17, x: 0.40},
            {id: 18, x: 0.30},
            {id: 19, x: 0.20},
            {id: 20, x: 0.10},
            {id: 21, x: 0.10},
            {id: 22, x: 0.20},
            {id: 23, x: 0.30},
            {id: 24, x: 0.40},
            {id: 25, x: 0.50},
            {id: 26, x: 0.60},
            {id: 27, x: 0.70},
            {id: 28, x: 0.80},
            {id: 29, x: 0.90},
            {id: 30, x: 1},
            {id: 31, x: 1},
            {id: 32, x: 0.90},
            {id: 33, x: 0.80},
            {id: 34, x: 0.70},
            {id: 35, x: 0.60},
            {id: 36, x: 0.50},
            {id: 37, x: 0.40},
            {id: 38, x: 0.30},
            {id: 39, x: 0.20},
            {id: 40, x: 0.10},
            {id: 41, x: 0.10},
            {id: 42, x: 0.20},
            {id: 43, x: 0.30},
            {id: 44, x: 0.40},
            {id: 45, x: 0.50},
            {id: 46, x: 0.60},
            {id: 47, x: 0.70},
            {id: 48, x: 0.80},
            {id: 49, x: 0.90},
            {id: 50, x: 1},
            {id: 51, x: 1},
            {id: 52, x: 0.90},
            {id: 53, x: 0.80},
            {id: 54, x: 0.70},
            {id: 55, x: 0.60},
        ]

    }

    componentDidUpdate(prevProps){
        this.ctx = this.refs.canvas.getContext("2d")
        this.centerX = this.props.canvasWidth / 2;
        this.centerY = this.props.canvasHeight / 2;
        this.redrawCanvas();
    }


    redrawCanvas(){
        this.clearCanvas();
        this.drawCanvas();
    }
        
    clearCanvas(){
        this.ctx.clearRect(0,0, this.props.canvasWidth, this.props.canvasHeight);
    }

    drawCanvas(){
        this.drawBars()
    }

    drawBars(){
        for(let i = 0; i < this.configuration.length; i++){
            let bar = this.configuration[i]
            let leftBarInitialX = 0
            let leftBarInitialY = (this.props.canvasHeight / 55) * i 
            let leftBarWidth = this.props.canvasWidth * (bar.x - 0.1)
            let leftBarHeight = (this.props.canvasHeight / 55) * 0.98

            let rightBarInitialX = this.props.canvasWidth * (bar.x + 0.1)
            let rightBarInitialY = (this.props.canvasHeight / 55) * i 
            let rightBarWidth = this.props.canvasWidth
            let rightBarHeight = (this.props.canvasHeight / 55) * 0.98

            this.drawRectangle("#e6b335", 2, leftBarInitialX, leftBarInitialY, leftBarWidth, leftBarHeight)
            this.drawRectangle("#e6b335", 2, rightBarInitialX, rightBarInitialY, rightBarWidth, rightBarHeight)
        }
    }

    drawRectangle(fillColor, lineWidth, startX, startY, endX, endY){
        this.ctx.beginPath();
        this.ctx.fillStyle = fillColor
        this.ctx.lineWidth = lineWidth;
        this.ctx.fillRect(startX, startY, endX, endY); 
        this.ctx.closePath();
    }

    render(){
        return (
            <canvas id="bars-canvas" ref="canvas" width={this.props.canvasWidth} height={this.props.canvasHeight}/>
        )
    }
}
