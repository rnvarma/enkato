require('css/singlevideo/singlevideoview/QuestionFilterBar.scss');

import React from 'react';

import Col from 'react-bootstrap/lib/Col';
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
      <div className="questionFilterBar">
        <Col
          md={3}
          className={(this.props.filter ? '' : 'selected ') + 'filterOption'}
          onClick={this.props.setFilter.bind(null, '')}
        >
          View All
        </Col>
        <Col
          md={3}
          className={(this.props.filter === ':answered' ? 'selected ' : '') + 'filterOption'}
          onClick={this.props.setFilter.bind(null, ':answered')}
        >
          Answered
        </Col>
        <Col
          md={3}
          className={(this.props.filter === ':unanswered' ? 'selected ' : '') + 'filterOption'}
          onClick={this.props.setFilter.bind(null, ':unanswered')}
        >
          Unanswered
        </Col>
        <Col md={3} className="filterQuery">
          <FormGroup>
            <InputGroup>
              <FormControl
                type="input"
                onChange={this.setFilterFromQuery}
              />
              <InputGroup.Button><Button>ICON</Button></InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Col>
      </div>
    );
  }
}
