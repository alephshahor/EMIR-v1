import React, {Component} from 'react'

import '../style/rotationPanel.css'

export default class RotationPanel extends Component {

    constructor(props){
        super(props)
        this.state = {
            rotationAngle: 0
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

    render(){
        return (
            <div className="rotation-panel-container">
            <h1>ROTATIONS</h1>
            <hr></hr>
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
        )
    }
}
