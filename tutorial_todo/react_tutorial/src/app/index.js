var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
require('./css/index.css');

import {Router, Route, browserHistory} from 'react-router';


// module requires
var TodoItem = require('./todoitem');
var AddItem = require('./additem');
var About = require('./about');

var App = createReactClass({
    render: function() {
        return(
            <Router history={browserHistory}>
                <Route path={'/'} component={ToDoComponent}></Route>
                <Route path={'/about'} component={About}></Route>
            </Router>

        );
    }
})


// Create Component
var ToDoComponent = createReactClass({
        getInitialState: function() {
            return {
                todos: ['wash up', 'take a nap', 'eat some cheese']
            }
        },
        render: function(){
            var todos = this.state.todos;
            todos = todos.map(function (item,index){
                return(
                    <TodoItem item ={item} key ={index} onDelete={this.onDelete}/>
                );
            }.bind(this))
        return(
            <div id='todo-list'>
                <p>Busy Bee ToDo List</p>
                <ul>{todos}</ul>
                <AddItem onAdd={this.onAdd}/>
            </div>
        );
    }, //render

    // custom functions
    onDelete: function(item) {
        var updatedTodos = this.state.todos.filter(function(val, index){
            return item !== val;
        });
        this.setState({
            todos: updatedTodos
        });
    },

    onAdd: function(item) {
        var updatedTodos = this.state.todos;
        updatedTodos.push(item);
        this.setState({
            todos: updatedTodos
        })
    },

    // lifecycle functions
    componentWillMount: function(){
        console.log("component will mount");
    },

    componentDidMount: function(){
        console.log("component did mount");
    },

    componentWillUpdate: function(){
        console.log("component will update");
    }
});

// Put Component into HTML page
ReactDOM.render(<App/>, document.getElementById('todo-wrapper'));
