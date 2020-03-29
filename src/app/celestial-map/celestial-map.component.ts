import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { Observation } from '../observation.interface';

@Component({
  selector: 'app-celestial-map',
  templateUrl: './celestial-map.component.html',
  styleUrls: ['./celestial-map.component.css']
})


export class CelestialMapComponent implements OnInit {

  targetWidth: number;
  targetHeight: number;
  radius: number;

  constructor() { }

  ngOnInit(): void {
    this.targetWidth = this.getTargetWidth()
    this.targetHeight = this.getTargetHeight() 
    this.radius = this.targetHeight * 0.9;
    this.drawSvg();
   // this.drawSky();
    this.drawRandomPoints()
  }

  getTargetWidth() : number {
    return document.querySelector('#svgcontainer').getBoundingClientRect().width
  }

  getTargetHeight() : number {
    return window.innerHeight * 0.75 ; 
  }

  onResize(event) {
    this.targetWidth = this.getTargetWidth()
    this.targetHeight = this.getTargetHeight()
    this.radius = this.targetHeight * 0.9;
  /*  this.cleanCanvas();
    this.drawSky();
    this.drawRandomPoints();*/
}

  toDegrees(angle: number) : number {
      return angle * (Math.PI / 180);
  }

  drawSvg(){
    d3.select("#celestialmap")
      .attr("viewBox", [0, 0, this.targetWidth, this.targetHeight])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("fill", "currentColor")
      .style("margin", "0 -14px")
      .style("color", "white")
      .style("background", "radial-gradient(#081f2b 0%, #061616 100%)")
      .style("display", "block");
    
    for (var i = 1; i <= 9; i++){
        d3.select("#celestialmap")
          .append("circle")
          .attr("cx", this.targetWidth / 2)
          .attr("cy", this.targetHeight / 2)
          .attr("r", (this.targetHeight / 2) * ( 1 - (i / 10)))
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-opacity", 0.2)
    }

    var radius = (this.targetHeight / 2) * 0.9

    for (var i = 0; i <= 12; i++){
          d3.select("#celestialmap")
            .append("line")
            .attr("x1", this.targetWidth / 2)
            .attr("y1", this.targetHeight / 2)
            .attr("x2", (this.targetWidth / 2 ) + radius * Math.cos(this.toDegrees(i * 15)))
            .attr("y2", (this.targetHeight / 2) + radius * Math.sin(this.toDegrees(i * 15)))
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.2)


            d3.select("#celestialmap")
            .append("line")
            .attr("x1", this.targetWidth / 2)
            .attr("y1", this.targetHeight / 2)
            .attr("x2", (this.targetWidth / 2 ) - radius * Math.cos(this.toDegrees(i * 15)))
            .attr("y2", (this.targetHeight / 2) - radius * Math.sin(this.toDegrees(i * 15)))
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.2)

    }


    /*d3.select("#celestialmap")
      .append("line")
      .attr("x1", this.targetWidth / 2)
      .attr("y1", (this.targetHeight / 2) - radius)
      .attr("x2", this.targetWidth / 2)
      .attr("y2", (this.targetHeight / 2 ) + radius)
      .attr("stroke", "white")
      .attr("stroke-width", 3)*/

    var halfTheDegreeMarkerSize = 5;

    for(var i = 1; i <= 9; i++){
      d3.select("#celestialmap")
        .append("line")
        .attr("x1", (this.targetWidth / 2) + halfTheDegreeMarkerSize)
        .attr("y1", (this.targetHeight / 2) * ( 1 - (i / 10)))
        .attr("x2", (this.targetWidth / 2) - halfTheDegreeMarkerSize)
        .attr("y2", (this.targetHeight / 2) * ( 1 - (i / 10))) 
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 1)

      d3.select("#celestialmap")
        .append("line")
        .attr("x1", (this.targetWidth / 2) + halfTheDegreeMarkerSize)
        .attr("y1", (this.targetHeight / 2) * ( 1 - (i / 10) * (-1)))
        .attr("x2", (this.targetWidth / 2) - halfTheDegreeMarkerSize)
        .attr("y2", (this.targetHeight / 2) * ( 1 - (i / 10) * (-1)))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 1)

      // Offset placed so the text indicating the angle doesn't merge
      // with the lines.
      var angleTextOffset = 3;
    }

    for (var i = 1; i < 9; i++){
      d3.select("#celestialmap")
        .append("text")
        .attr("x", (this.targetWidth / 2))
        .attr("y", (this.targetHeight / 2) * ( 1 - (i / 10)) - angleTextOffset )
        .text(`${(9 - i) * 10}º`)
        .style("font-size", "10px")

      d3.select("#celestialmap")
        .append("text")
        .attr("x", (this.targetWidth / 2))
        .attr("y", (this.targetHeight / 2) * ( 1 - (i / 10) * (-1)) - angleTextOffset )
        .text(`-${(9 - i) * 10}º`)
        .style("font-size", "10px")
    }

      d3.select("#celestialmap")
      .append("text")
      .attr("x", (this.targetWidth / 2))
      .attr("y", (this.targetHeight / 2))
      .text(`${(90)}º`)
      .style("font-size", "10px") 

    for(var i = 1; i < 12; i++){
      d3.select("#celestialmap")
        .append("text")
        .attr("x", (this.targetWidth / 2 )  + (((this.targetHeight / 2) * 0.95) * Math.cos(this.toDegrees(15 * i))))
        .attr("y", (this.targetHeight / 2 ) +  (((this.targetHeight / 2) * 0.95) * Math.sin(this.toDegrees(15 * i))))
        .text(`${i}h`)
        .style("font-size", "10px")
    }

    for(var i = 12; i <= 24; i++){
      d3.select("#celestialmap")
        .append("text")
        .attr("x", (this.targetWidth / 2 )  + (((this.targetHeight / 2) * 0.95) * Math.cos(this.toDegrees(15 * i))))
        .attr("y", (this.targetHeight / 2 ) +  (((this.targetHeight / 2) * 0.95) * Math.sin(this.toDegrees(15 * i))))
        .text(`${i}h`)
        .style("font-size", "10px")
    }

      


  }




  drawSky(){

    var projection = d3.geoProjection((x, y) => d3.geoStereographicRaw(x, -y))
                       .scale(this.targetWidth / 2)
                       .clipExtent([[0, 0], [this.targetWidth / 2, this.targetHeight / 2]])
                       .rotate([0, -90])
                       .translate([this.targetWidth / 2, this.targetHeight / 2])
                       .precision(0.1)

    var graticule = d3.geoGraticule().stepMinor([15, 10])();
    var path = d3.geoPath(projection);

     d3.select("#celestialmap")
        .append("circle")
        .attr("cx", this.targetWidth / 2)
        .attr("cy", this.targetHeight / 2)
        .attr("r", (this.targetHeight / 2) * 0.9)
        .attr("fill", "#0F0438") 
        .append("path")
        .attr("d", path(graticule))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-opacity", 0.2);

  }

  cleanCanvas(){
      var celestialmap = document.querySelector("#celestialmap")
      while(celestialmap.children.length > 0){
        celestialmap.removeChild(celestialmap.lastElementChild);
      }
  }

  
  drawRandomPoints(){
    
    var centerX = this.targetWidth / 2;
    var centerY = this.targetHeight / 2;
    var radius = ((this.targetHeight / 2) * 0.9)


    for( var i = 0; i < 100; i++){
      var r = radius * Math.sqrt(Math.random())
      var theta = Math.random() * 2 * Math.PI;
      var x = Math.cos(theta) * r;
      var y = Math.sin(theta) * r;
      x = centerX + x;
      y = centerY + y;
      d3.select('#celestialmap')
              .append("circle")
              .attr("class", "celestialObservation")
              .attr("cx", x)
              .attr("cy", y)
              .attr("r", Math.random() * 4)
              .attr("fill", "white")
              
    }
  }


}
