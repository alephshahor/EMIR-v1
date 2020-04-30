import React, {Component} from 'react'
import '../style/canvas.css'

export default class Canvas extends Component {

    constructor(props){
        super(props);
        this.onMouseClickDown = this.onMouseClickDown.bind(this)
        this.onMouseClickUp = this.onMouseClickUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.state = {
            dragging: false
        }
    }

    componentDidUpdate(prevProps){

        // TODO: context.clearRect(0, 0, canvas.width, canvas.height);
        console.log(this.props.metadata)
        this.ctx = this.refs.canvas.getContext("2d")
        this.centerX = this.props.canvasWidth / 2;
        this.centerY = this.props.canvasHeight / 2;
        this.drawCanvas();
        this.drawEmirVisionField(); 
    }


    redrawCanvas(){
        this.clearCanvas();
        this.drawCanvas();
        this.drawEmirVisionField();
    }
        
    clearCanvas(){
        this.ctx.clearRect(0,0, this.props.canvasWidth, this.props.canvasHeight);
    }

    drawPoints(){
        for(let i = 0; i < this.props.stelarPoints.length; i++){
            this.drawPoint(this.props.stelarPoints[i].right_ascension * this.props.canvasWidth,
                          this.props.stelarPoints[i].declination * this.props.canvasHeight)
        }
        
    }

    drawPoint(xPos, yPos){

        let pointThickness = 2;
        let pointColor = "#FFF"

        this.ctx.strokeStyle = pointColor;
        this.ctx.lineWidth = pointThickness;
        this.ctx.beginPath();
        this.ctx.arc(xPos, yPos, 2, 0, 2 * Math.PI, true);
        this.ctx.stroke();
    }

    drawCanvas(){
        this.addBackgroundColor()
        this.drawRectangle("#839192", 1, 0, 0, this.refs.canvas.width , this.refs.canvas.height);
        this.drawGrid();
        if(this.props.stelarPoints != null){
            this.drawPoints();
        }
    }

    drawEmirVisionField(x,y){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#F7937E"
        this.ctx.globalAlpha = 0.75;
        this.ctx.rect(x,y, (this.props.canvasWidth * this.props.emirVisionFieldDimension) / this.props.catalogDimensionInDegrees, 
                           (this.props.canvasHeight * this.props.emirVisionFieldDimension) / this.props.catalogDimensionInDegrees)
        this.ctx.fill()
        this.ctx.globalAlpha = 1;
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

    onMouseClickDown(event){
        this.redrawCanvas();
        this.dragging = true
        console.log("Position: ", event.clientX, event.clientY)
        let { x,y } = this.calculateEmirFieldCenter(event)
        this.drawEmirVisionField(x,y)
    }

    calculateEmirFieldCenter(event){
        let offsetX = document.getElementById("canvas").getBoundingClientRect().left
        let offsetY = document.getElementById("canvas").getBoundingClientRect().top
        let x = (event.clientX - offsetX) - ((this.props.canvasWidth * 0.1) / 2)
        let y = (event.clientY - offsetY) - ((this.props.canvasWidth * 0.1) / 2)
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
            <canvas id="canvas" ref="canvas" width={this.props.canvasWidth} height={this.props.canvasHeight}
                    onMouseDown={(e) => this.onMouseClickDown(e)} onMouseUp={(e) => this.onMouseClickUp(e)}
                    onMouseMove={(e) => this.onMouseMove(e)}/>
        )
    }
}
