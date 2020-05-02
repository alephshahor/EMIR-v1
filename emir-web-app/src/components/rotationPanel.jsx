import React from 'react'

import '../style/rotationPanel.css'

export default function RotationPanel() {
    return (
        <div className="rotation-panel-container">
           <h1>ROTATIONS</h1>
           <hr></hr>
           <form>
               <input className="rotation-input" type="text" placeholder="Angle in Degrees">
               </input>
               <br></br>
               <input type="range" min="0" max="365" step="1"/> 
           </form>
        </div>
    )
}
