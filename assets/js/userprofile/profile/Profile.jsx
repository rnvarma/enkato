require('bootstrap-loader');
require("css/globals/NavBar.scss")
require("css/globals/base.scss")
require("css/userprofile/profile/Profile")

var React = require('react')
var ReactDOM = require('react-dom')

var NavBar = require('js/globals/NavBar');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var ProfileSeriesList = require('js/userprofile/profile/ProfileSeriesList');

var Profile = React.createClass({
    getInitialState: function() {
        return {
            userdata: {},
            created_series: [],
            subscribed_series: [],
            viewseries: true
        }
    },
    componentWillMount: function() {
        $.ajax({
          url: "/1/userprofile/" + $("#u_id").attr("data-uid"),
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState(data)
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    onSeriesViewClick: function() {
        this.setState({viewseries: true})
    },
    onAllVideosViewClick: function() {
        this.setState({viewseries: false})
    },
    render: function() {
        var profile_img = this.state.userdata.image || "/static/imgs/blank_avatar.jpg"
        return (
            <div>
                <NavBar />
                <div className="profile">
                    <div className="header">
                        <div className="imageArea">
                            <img src={profile_img} className="image" />
                        </div>
                        <div className="userInfo">
                            <div className="name">
                                {this.state.userdata.name}
                            </div>
                            <div className="bio">
                                {this.state.userdata.bio}
                            </div>
                        </div>
                        <div className="toggleMenu">
                            <div
                                className={"series" + (this.state.viewseries ? " active" : "")}
                                onClick={this.onSeriesViewClick}>
                                Series
                            </div>
                        </div>
                    </div>
                    <ProfileSeriesList
                        series={this.state.subscribed_series}
                        name={"Series You Subscribe To"}/>
                    <ProfileSeriesList
                        series={this.state.created_series}
                        name={"Series by You"}/>
                </div>
            </div>
        )
    }
});


// <div
//     className={"allvideos" + (this.state.viewseries ? "" : " active")}
//     onClick={this.onAllVideosViewClick}>
//     All Videos
// </div>


ReactDOM.render(<Profile />, document.getElementById('page-anchor'))