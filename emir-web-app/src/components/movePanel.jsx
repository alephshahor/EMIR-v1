import React from 'react'
import '../style/movePanel.css'

import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export default function MovePanel(props) {
    return (
        <div className="move-panel-container">
            <h1>MOVE</h1>
            <hr></hr>
            <div className="row-1">
                <button className="arrow-up-button" onClick={() => props.moveUp()}><FaArrowUp></FaArrowUp></button> 
            </div>
            <div className="row-2">
                <button className="arrow-left-button" onClick={() => props.moveLeft()}><FaArrowLeft></FaArrowLeft></button>
                <button className="center-button" onClick={() => props.center()}>CENTER</button>
                <button className="arrow-right-button" onClick={() => props.moveRight()}><FaArrowRight></FaArrowRight></button>
            </div>
            <div className="row-3">
                <button className="arrow-down-button" onClick={() => props.moveDown()}><FaArrowDown></FaArrowDown></button>
            </div>
        </div>
    )
}
