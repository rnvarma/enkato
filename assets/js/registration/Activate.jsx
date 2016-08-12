let React = require('react');
const ReactDOM = require('react-dom');

let NavBar = require('js/globals/NavBar');

let Activate = React.es6({
    render() {
        return (
            <div>
                <NavBar active="activate" />
                <div className="popup">Activation failed or the account is already active</div>
            </div>
        );
    },
});

ReactDOM.render(<Activate />, document.getElementById('page-anchor'))
;
