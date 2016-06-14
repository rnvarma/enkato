require("css/classroom/classroom/ClassInfo.scss");

var React = require('react')

module.exports = React.createClass({
    render: function() {
        var creators = this.props.data.creators.map(function(user) {
            return (
                <a key={user.user_id} className="creatorName" href={"/userprofile/" + user.user_id}>
                    {user.username},
                </a>
            )
        })
        return (
            <div className="classInfo">
                <div className="name">
                    {this.props.data.name}
                </div>
                <div className="creators">
                    by {creators}
                </div>
                <div className="description">
                    {this.props.data.description}
                </div>
            </div>
        )
    }
})