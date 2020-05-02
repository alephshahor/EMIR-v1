import React from 'react'
import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa'

import '../style/zoomPanel.css'

export default function ZoomPanel() {
    return (
        <div className="zoom-panel-container">
           <h1>ZOOM</h1>
           <hr></hr>
           <button className="zoomInButton"><FaSearchPlus></FaSearchPlus></button> 
           <button className="zoomOutButton"><FaSearchMinus></FaSearchMinus></button> 
        </div>
    )
}
