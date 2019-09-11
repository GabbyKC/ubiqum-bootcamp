import React, { Component } from 'react';
import './Quote.css';

class Quote extends Component {
    state = {
        quote: {},
    }

    componentDidMount() {
        fetch('https://api.quotable.io/random')
        .then(results => {
            return results.json();
        }).then(data => {
            this.setState({
                quote: {
                    id: data._id,
                    content: data.content,
                    author: data.author
                }
            })
        })
    }

    render() {
        return (
            <div className = 'quote-container'>
                <div>
                    <div className = 'content-container'>
                        <p className ='first-p'>{ this.state.quote.content }</p>
                    </div>
                    <div>
                        <p className = 'second-p'> - { this.state.quote.author }</p>
                    </div>
                </div>
            </div>
        );
    }


}

export default Quote;
