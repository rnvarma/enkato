require('bootstrap-loader');
require("css/globals/base.scss");

var React = require('react')
var ReactDOM = require('react-dom')

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

var NavBar = require('js/globals/NavBar');
var CreateClassForm = require('js/classroom/createclass/CreateClassForm');

function getCookie(name) {
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

var Create = React.createClass({
    onFormSubmit: function(data) {
        $.ajax({
          url: "/createclass",
          dataType: 'json',
          type: 'POST',
          data: data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            console.log(data);
            if (data.status) {
                window.location.href = "/c/" + data.c_id;
            } else {
                console.log("sad face");
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function() {
        return (
            <div>
                <NavBar />
                <Row>
                    <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                        <h1 className="page-header">Create a Classroom</h1>
                        <CreateClassForm onFormSubmit={this.onFormSubmit}/>
                    </Col>
                </Row>
            </div>
        )
    }
})

ReactDOM.render(<Create />, document.getElementById('page-anchor'))