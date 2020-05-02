import React from 'react'
// Icons made by <a href="https://www.flaticon.com/authors/those-icons" 
// title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" 
// title="Flaticon"> www.flaticon.com</a>

import '../style/toolbarButton.css'

export default function ToolbarButton(props) {

    return (
            <button className="toolbarButton" onClick={() => props.setToolPanel(props.buttonType)}>{props.icon}</button>
    )
}
