import React, {Component} from 'react'
import '../style/canvas.css'

export default class Canvas extends Component {


    componentDidUpdate(){
        this.ctx = this.refs.canvas.getContext("2d")
        this.drawCanvas()
    }

    drawCanvas(){
        this.addBackgroundColor()
        this.drawRectangle("#839192", 5, 0, 0, this.refs.canvas.width , this.refs.canvas.height);
    }

    addBackgroundColor(){
        let centerX = this.props.canvasWidth / 2;
        let centerY = this.props.canvasHeight / 2;
        let radius  = this.props.canvasWidth / 5;
        let gradient = this.ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius * 2)
        gradient.addColorStop(0, '#071d31')
        gradient.addColorStop(1, '#061726')
        this.ctx.fillStyle = gradient;
    }

    drawRectangle(strokeColor, lineWidth, startX, startY, endX, endY){
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = lineWidth;
        this.ctx.fillRect(startX, startY, endX, endY); 
    }

    render(){
        return (
            <canvas ref="canvas" width={this.props.canvasWidth} height={this.props.canvasHeight} />
        )
    }
}
