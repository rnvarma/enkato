require("css/classroom/classroom/ClassMetaData.scss");

var React = require('react')

var FontAwesome = require('react-fontawesome');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="classMetaData">
                <div className="infoBar">
                    <div className="stat">
                        <div className="icon">
                            <FontAwesome name='users' />
                        </div>
                        <div className="text">
                            {this.props.data.num_tas} TAs
                        </div>
                    </div>
                    <div className="stat">
                        <div className="icon">
                            <FontAwesome name='book' />
                        </div>
                        <div className="text">
                            {this.props.data.num_tas} units
                        </div>
                    </div>
                    <div className="stat">
                        <div className="icon">
                            <FontAwesome name='youtube-play' />
                        </div>
                        <div className="text">
                            {this.props.data.num_tas} videos
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})