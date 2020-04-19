import React, {Component} from 'react'
import '../style/canvas.css'

export default class Canvas extends Component {


    componentDidUpdate(){
        this.ctx = this.refs.canvas.getContext("2d")
        this.drawCanvas()
    }

    drawCanvas(){
        this.drawRectangle("#839192", 5, 0, 0, this.refs.canvas.width , this.refs.canvas.height);
    }

    drawRectangle(strokeColor, lineWidth, startX, startY, endX, endY){
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeRect(startX, startY, endX, endY); 
    }

    render(){
        return (
            <canvas ref="canvas" width={this.props.canvasWidth} height={this.props.canvasHeight} />
        )
    }
}
