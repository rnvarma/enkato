require('bootstrap-loader');
require("css/globals/VideoPlayer/Video")
var React = require('react')
var ReactDOM = require('react-dom')


module.exports = React.createClass({
    componentDidMount:function(){
    },
    render:function(){
        return this.props.renderVideo();
    }
});