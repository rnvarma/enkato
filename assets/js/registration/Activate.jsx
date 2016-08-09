var React = require('react')
var ReactDOM = require('react-dom')

var NavBar = require('js/globals/NavBar');

var Activate = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar active="activate"/>
                <div className = "popup">Activation failed or the account is already active</div>
            </div>
        )
    }
})

ReactDOM.render(<Activate/>, document.getElementById('page-anchor'))