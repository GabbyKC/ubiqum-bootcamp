import React, { Component } from 'react';
import './Quote.css';


class Quote extends Component {
    state = {
        quote: {},
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch('https://api.quotable.io/random')
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {
            this.setState({
                quote: {
                    id: data._id,
                    content: data.content,
                    author: data.author
                }
            })
        })
        .catch((error) => {
            console.log(error, "well.. that didn't work")
        })
    }

    render() {
        return (
            <div className = 'container'>
                <div>
                    <div className = 'content-text'>
                        <div>
                            <div className ='first-p'> { this.state.quote.content }</div>
                        </div>
                        <div>
                            <div className = 'second-p'> - { this.state.quote.author }</div>
                        </div>
                    </div>

                    <div className = 'button-container'>
                        <button className="button" onClick={this.fetchData}>Want More?</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default Quote;
