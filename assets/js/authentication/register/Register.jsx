require('bootstrap-loader');
require("css/globals/base.scss")

var React = require('react')
var ReactDOM = require('react-dom')

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var NavBar = require('js/globals/NavBar');
var RegistrationForm = require('js/authentication/register/RegistrationForm');

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

var Register = React.createClass({
    onFormSubmit: function(data) {
        $.ajax({
          url: "/register",
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
                window.location.href = "/accounts/register/complete";
            } else {
                alert(data.issue)
            }
          }.bind(this),
          error: function(xhr, status, err) {
            alert(err.toString())
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function() {
        return (
            <div>
                <NavBar active="register"/>
                <Row>
                    <Col lg={4} lgOffset={4} md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                        <h1 className="page-header">Register</h1>
                        <RegistrationForm onFormSubmit={this.onFormSubmit} />
                    </Col>
                </Row>
            </div>
        )
    }
})

ReactDOM.render(<Register />, document.getElementById('page-anchor'))