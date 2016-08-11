let React = require('react');
const ReactDOM = require('react-dom');

let NavBar = require('js/globals/NavBar');

let ActivationComplete = React.es6({
    componentDidMount() {
        this.timer = setInterval(this.tick, 3000);
    },
    componentWillUnmount() {
        clearInterval(this.timer);
    },
    tick() {
        window.location.href = '/login';
    },
    render() {
        return (
            <div>
                <NavBar active="activationComplete" />
                <div className="popup">Your account is now active</div>
            </div>
        );
    },
});

ReactDOM.render(<ActivationComplete />, document.getElementById('page-anchor'))
;
