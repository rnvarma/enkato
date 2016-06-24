require('bootstrap-loader');
require("css/globals/VideoPlayer/Video")
var React = require('react')
var ReactDOM = require('react-dom')


module.exports = React.createClass({ 
    render:function(){
        var height = this.props.videoDivHeight - this.props.controlBarHeight;
        return (
            <div 
                style={{height:height+"px"}}
                className="iframeWrapper">
                {this.props.renderVideo()}
            </div>
            )
    }
});