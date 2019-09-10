import React, { Component } from 'react';

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
            <p>{ this.state.quote.content }</p>
        );
    }


}

export default Quote;
