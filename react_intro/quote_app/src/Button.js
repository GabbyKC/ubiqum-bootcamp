import React, { Component } from 'react';
import './Button.css'

class Button extends Component {
    render() {
        return (
            <div className = 'button-container'>
                <button className="button" onClick={() => window.location.reload()}>Want More?</button>
            </div>
        )
    }
}

export default Button;
