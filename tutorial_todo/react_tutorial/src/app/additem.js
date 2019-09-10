var React = require('react');
var createReactClass = require('create-react-class');
require('./css/additem.css');

module.exports = createReactClass({
    render: function (){
        return(
            <form id='add-todo' onSubmit={this.handleSubmit}>
                <input type="text" required ref='newItem'/>
                <input type="submit" value='Hit me' required/>
            </form>
    );
},
    // custom functions
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onAdd(this.refs.newItem.value);
    }
});
