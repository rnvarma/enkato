import React from 'react';

import FontAwesome from 'react-fontawesome';

import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
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
    let viewAll;
    if (!this.props.showingSeries) {
      viewAll = (
        <div
          className={(!this.props.filter && !this.props.filterAnswered && !this.props.filterUnanswered ? 'selected ' : '') + 'filterOption'}
          onClick={this.props.setFilter.bind(null, '', true)}
        >
          View All
        </div>
      );
    } else {
      viewAll = (
        <div
          className={(!this.props.filter && !this.props.filterAnswered && !this.props.filterUnanswered ? 'selected ' : '') + 'filterOption'}
          onClick={this.props.setFilter.bind(null, '', true)}
        >
          View All Series
        </div>
      );
    }
    return (
      <Row className="questionFilterBar">
        {viewAll}
        <div
          className={(this.props.filterAnswered ? 'selected ' : '') + 'filterOption'}
          onClick={this.props.toggleAnsweredFilter}
        >
          Resolved
        </div>
        <div
          className={(this.props.filterUnanswered ? 'selected ' : '') + 'filterOption'}
          onClick={this.props.toggleUnansweredFilter}
        >
          Unresolved
        </div>
        <div className="filterQuery">
          <InputGroup>
            <FormControl
              type="input"
              className="filterInput"
              placeholder="Search Questions"
              onChange={this.setFilterFromQuery}
              value={this.props.filter}
            />
            <InputGroup.Button><Button><FontAwesome name="search" /></Button></InputGroup.Button>
          </InputGroup>
        </div>
      </Row>
    );
  }
}
