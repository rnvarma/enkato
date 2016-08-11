let React = require('react');
const ReactDOM = require('react-dom');

let NavBar = require('js/globals/NavBar');

let RegistrationComplete = React.es6({
    render() {
        return (
            <div>
                <NavBar active="registrationComplete" />
                <div className="popup">You have been sent a confirmation email</div>
            </div>
        );
    },
});

ReactDOM.render(<RegistrationComplete />, document.getElementById('page-anchor'))
;
