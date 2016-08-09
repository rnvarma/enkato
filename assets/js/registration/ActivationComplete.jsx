var React = require('react')
var ReactDOM = require('react-dom')

var NavBar = require('js/globals/NavBar');

var ActivationComplete = React.createClass({
    componentDidMount: function(){
        this.timer = setInterval(this.tick, 3000);
    },
    componentWillUnmount: function(){
        clearInterval(this.timer);
    },
    tick: function(){
        window.location.href = "/login";
    },
    render: function() {
        return (
            <div>
                <NavBar active="activationComplete"/>
                <div className = "popup">Your account is now active</div>
            </div>
        )
    }
})

ReactDOM.render(<ActivationComplete/>, document.getElementById('page-anchor'))