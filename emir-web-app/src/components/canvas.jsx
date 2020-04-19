import React, {Component} from 'react'
import '../style/canvas.css'

export default class Canvas extends Component {


    componentDidUpdate(){
        this.ctx = this.refs.canvas.getContext("2d")
        this.centerX = this.props.canvasWidth / 2;
        this.centerY = this.props.canvasHeight / 2;
        this.drawCanvas()
    }

    drawCanvas(){
        this.addBackgroundColor()
        this.drawRectangle("#839192", 1, 0, 0, this.refs.canvas.width , this.refs.canvas.height);
        this.drawGrid();
    }

    addBackgroundColor(){
        let radius  = this.props.canvasWidth / 5;
        let gradient = this.ctx.createRadialGradient(this.centerX, this.centerY, radius, this.centerX, this.centerY, radius * 2)
        gradient.addColorStop(0, '#071d31')
        gradient.addColorStop(1, '#061726')
        this.ctx.fillStyle = gradient;
    }

    drawGrid(){
       let gridColor = "#1d3558"
       let lineWidth = 1;
       this.drawLine(gridColor, lineWidth, this.centerX * 2, this.centerY, 0, this.centerY);
       this.drawLine(gridColor, lineWidth, this.centerX, this.centerY * 2, this.centerX, 0);
       this.drawMarks()
    }

    drawMarks(){

        let markOffset = 5;
        let marksPerAxis = 20;
        let marksColor = "#1d3558" 
        let lineWidth = 1;

        for(var i = 0; i < marksPerAxis; i++){
            this.drawLine(marksColor, lineWidth, this.centerX - markOffset, i * (this.props.canvasHeight / marksPerAxis), this.centerX + markOffset, i * (this.props.canvasHeight / marksPerAxis))
        }
        for(var i = 0; i < marksPerAxis; i++){
            this.drawLine(marksColor, lineWidth, i * (this.props.canvasWidth / marksPerAxis), this.centerY - markOffset , i * (this.props.canvasWidth / marksPerAxis), this.centerY + markOffset)
        }
    }

    drawLine(strokeColor, lineWidth, startX, startY, endX, endY){
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
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
