require('bootstrap-loader');
require("css/globals/base.scss")
var React = require('react')
var UnderConstruction = require("js/globals/UnderConstruction.jsx")

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <img 
                    className="constructionTape" 
                    src="static/imgs/_under_construction_tape.png"
                    style={{width:100+"%", height:80+"%"}}/>
            </div>
        )
    }
})

