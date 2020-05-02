import React from 'react'
import '../style/movePanel.css'

import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export default function MovePanel() {
    return (
        <div className="move-panel-container">
            <h1>MOVE</h1>
            <hr></hr>
            <div className="row-1">
                <button className="arrow-up-button"><FaArrowUp></FaArrowUp></button> 
            </div>
            <div className="row-2">
                <button className="arrow-left-button"><FaArrowLeft></FaArrowLeft></button>
                <button className="center-button">CENTER</button>
                <button className="arrow-right-button"><FaArrowRight></FaArrowRight></button>
            </div>
            <div className="row-3">
                <button className="arrow-down-button"><FaArrowDown></FaArrowDown></button>
            </div>
        </div>
    )
}
