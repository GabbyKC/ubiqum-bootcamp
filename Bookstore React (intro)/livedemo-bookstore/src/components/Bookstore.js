import React, { Component } from 'react'


export default class Bookstore extends Component {
    state = {
        books: []
    }
    componentDidMount(){
        fetch('https://api.myjson.com/bins/zyv02').then(function(res){
            return res.json()
        }).then(data => {
            this.setState({books : data.books})
        })
    }
   render() {
       console.log(this.state);
       return (
           <div>

           {this.state.books.map((book, index) => {
               return (
                   <img key={index} src={book.cover}/>
               )
           })}

           </div>
       )
   }
}
