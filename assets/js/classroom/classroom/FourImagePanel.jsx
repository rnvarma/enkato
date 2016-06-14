require("css/classroom/classroom/FourImagePanel.scss");

var React = require('react')

module.exports = React.createClass({
    render: function() {
        var thumbnails = this.props.images;
        var i = 0;
        var t_html = thumbnails.map(function(thumbnail) {
            i++;
            return (
                <div className="imageContainer" key={i}>
                    <img className="image" src={thumbnail}/>
                </div>
            )
        })
        return (
            <div className="fourImagePanel">
                {t_html}
            </div>
        )
    }
})