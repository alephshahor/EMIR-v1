import React from 'react'
import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa'

import '../style/zoomPanel.css'

export default function ZoomPanel(props) {
    return (
        <div className="zoom-panel-container">
           <h1>ZOOM</h1>
           <hr></hr>
           <button className="zoomInButton" onClick={() => props.zoomIn()}><FaSearchPlus></FaSearchPlus></button> 
           <button className="zoomOutButton" onClick={() => props.zoomOut()}><FaSearchMinus></FaSearchMinus></button> 
        </div>
    )
}
