require('bootstrap-loader');
require("css/globals/base.scss")
var React = require('react')
var UnderConstruction = require("js/globals/UnderConstruction.jsx")

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <UnderConstruction />
            </div>
        )
    }
})

