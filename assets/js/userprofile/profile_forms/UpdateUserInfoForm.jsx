require("css/userprofile/update_user_info_form.scss")

var React = require('react')

var FontAwesome = require('react-fontawesome');

var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var Col = require('react-bootstrap').Col;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;
var ControlLabel = require('react-bootstrap').ControlLabel;
var InputGroup = require('react-bootstrap').InputGroup;

var internationalCollegeList = require('js/userprofile/profile_forms/collegeList');

module.exports = React.createClass({
    getInitialState: function() {
        $( "#helloworld" ).autocomplete({
          source: internationalCollegeList
        });
        return {
            education_status: '',
            last_name: '',
            email: '',
            user_name: '',
            password: ''
        }
    },
    onEducationStatusChange: function(e) {
        this.setState({education_status: e.target.value})
        if(e.target.value=="Other"){
            $(".explain-other-form-group").slideDown(300)
        } else{
            $(".explain-other-form-group").slideUp(300)
        }
    },
    onLastNameChange: function(e) {
        this.setState({first_name: e.target.value})
    },
    onEmailChange: function(e) {
        this.setState({first_name: e.target.value})
    },
    onUserNameChange: function(e) {
        this.setState({first_name: e.target.value})
    },
    onPasswordChange: function(e) {
        this.setState({first_name: e.target.value})
    },
    onSubmit: function(e) {
        e.preventDefault();
        console.log(this.state.education_status)
    },
    render: function() {
        return (
            <Form horizontal onSubmit={this.onSubmit}>
                <FormGroup controlId="educationStatus">
                    <Col componentClass={ControlLabel} sm={2}>
                        Education Status
                    </Col>
                    <Col sm={10}>
                        <FormControl 
                            componentClass="select"
                            title="Choose One"
                            onChange={this.onEducationStatusChange}
                        >
                            <option value="Grade School">Grade School</option>
                            <option value="College">College</option>
                            <option value="Graduate School">Graduate School</option>
                            <option value="Other">Other</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="user-name" className="explain-other-form-group">
                    <Col componentClass={ControlLabel} sm={2}>
                        User Name
                    </Col>
                    <Col sm={10}>
                        <InputGroup>
                            <FormControl type="text" placeholder="User Name" id="helloworld" />
                            <InputGroup.Addon >
                                <FontAwesome name='user' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={10} smOffset={2}>
                        <Button type="submit">
                            Submit
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
})