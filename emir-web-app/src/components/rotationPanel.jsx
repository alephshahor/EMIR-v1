import React, {Component} from 'react'

import '../style/rotationPanel.css'

export default class RotationPanel extends Component {

    constructor(props){
        super(props)
        this.state = {
            rotationAngle: 0,
            roiRotationAngle: 0
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.rotate(this.state.rotationAngle)
    }

    handleInputChange = (event) => {
        this.setState({rotationAngle: event.target.value});
    }

    handleSliderChange = (event) => {
        this.setState({rotationAngle: event.target.value});

    }

    handleRoiSubmit = (event) => {
        event.preventDefault();
        this.props.rotateRoi(this.state.roiRotationAngle)
    }

    handleRoiInputChange = (event) => {
        this.setState({roiRotationAngle: event.target.value});
    }

    handleRoiSliderChange = (event) => {
        this.setState({roiRotationAngle: event.target.value});

    }

    render(){
        return (
            <div className="rotation-panel-container">
            <h1>ROTATIONS</h1>
            <hr></hr>

            <div className="container-fluid">
                <div className="row" id="rotation-panel-row">
                    <div className="col-4" id="rotation-panel-col">
                         <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input className="rotation-input" 
                                    type="number" 
                                    value={this.state.rotationAngle}
                                    placeholder="Angle in Degrees"
                                    onChange={(e) => this.handleInputChange(e)}>
                            </input>
                            <br></br>
                            <input type="range" min="0" value={this.state.rotationAngle} onChange={(e) => this.handleSliderChange(e)} max="365" step="1"/> 
                            <button className="okButton" onClick={(e) => this.handleSubmit(e)}>Ok</button>
                        </form>
                    </div>
                    <div classname="col-2" id="rotation-panel-col-2">
                        <form onSubmit={(e) => this.handleRoiSubmit(e)}>
                            <input className="rotation-input" 
                                    type="number" 
                                    value={this.state.roiRotationAngle}
                                    placeholder="Angle in Degrees"
                                    onChange={(e) => this.handleRoiInputChange(e)}>
                            </input>
                            <br></br>
                            <input type="range" min="0" value={this.state.roiRotationAngle} onChange={(e) => this.handleRoiSliderChange(e)} max="365" step="1"/> 
                            <button className="okButton" onClick={(e) => this.handleRoiSubmit(e)}>Ok</button>
                        </form>
                    </div>
               </div>
            </div>

           
            </div>
        )
    }
}
