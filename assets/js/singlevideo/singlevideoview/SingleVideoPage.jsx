require('bootstrap-loader');
require('css/singlevideo/SingleVideoPage/SingleVideoPage')
var VideoPlayer=require('js/globals/VideoPlayer/VideoPlayer')
var NavBar = require('js/globals/NavBar')
var React = require('react')
var ReactDOM = require('react-dom')
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

function getCookie(name){
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = $.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
csrftoken = getCookie('csrftoken');


var SingleVideoPage = React.createClass({
    render: function() {
        return (
          <div>
            <NavBar/>
            <Row className="videoPlayerWrapper">
              <Col mdOffset={1} md={10}>
                <VideoPlayer videoID={this.props.videoID}/>
              </Col>
            </Row>
          </div>
        );
    }
})

ReactDOM.render(<SingleVideoPage 
    videoID={$("#v_id").attr("data-vid")}/>, 
    document.getElementById('page-anchor')
)


