require('css/singlevideo/singlevideoview/QuestionFilterBar.scss');

import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class QuestionFilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.setFilterFromQuery = this.setFilterFromQuery.bind(this);
  }

  setFilterFromQuery(event) {
    /* TODO: probably should add delay before setting filter */
    if (event.target.value) {
      this.props.setFilter(event.target.value);
    } else {
      this.props.setFilter('');
    }
  }

  render() {
    return (
      <Row className="questionFilterBar">
        <Col
          md={3}
          className={(!this.props.filter && !this.props.filterAnswered && !this.props.filterUnanswered ? 'selected ' : '') + 'filterOption'}
          onClick={this.props.setFilter.bind(null, '', true)}
        >
          View All
        </Col>
        <Col
          md={3}
          className={(this.props.filterAnswered ? 'selected ' : '') + 'filterOption'}
          onClick={this.props.toggleAnsweredFilter}
        >
          Answered
        </Col>
        <Col
          md={3}
          className={(this.props.filterUnanswered ? 'selected ' : '') + 'filterOption'}
          onClick={this.props.toggleUnansweredFilter}
        >
          Unanswered
        </Col>
        <Col md={3} className="filterQuery">
          <FormGroup>
            <InputGroup>
              <FormControl
                type="input"
                onChange={this.setFilterFromQuery}
                value={this.props.filter}
              />
              <InputGroup.Button><Button>ICON</Button></InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}
