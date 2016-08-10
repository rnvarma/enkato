import React, { Component, PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';

import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class QuestionFilterBar extends Component {
    static propTypes = {
        showingSeries: PropTypes.bool.isRequired,
        filter: PropTypes.string.isRequired,
        setFilter: PropTypes.func.isRequired,
        filterAnswered: PropTypes.func.isRequired,
        filterUnanswered: PropTypes.func.isRequired,
        toggleAnsweredFilter: PropTypes.func.isRequired,
        toggleUnansweredFilter: PropTypes.func.isRequired,
    }

    setFilterFromQuery = (event) => {
        /* TODO: probably should add delay before setting filter */
        if (event.target.value) {
            this.props.setFilter(event.target.value);
        } else {
            this.props.setFilter('');
        }
    }

    resetFilter = () => {
        this.props.setFilter('', true);
    }

    render() {
        let viewAll;
        if (!this.props.showingSeries) {
            viewAll = (
                <div
                    className={!this.props.filter && !this.props.filterAnswered && !this.props.filterUnanswered ? 'selected btn-plain' : 'btn-plain'}
                    onClick={this.resetFilter}
                >
                    View All
                </div>
            );
        } else {
            viewAll = (
                <div
                    className={!this.props.filter && !this.props.filterAnswered && !this.props.filterUnanswered ? 'selected btn-plain' : 'btn-plain'}
                    onClick={this.resetFilter}
                >
                View All Series
                </div>
            );
        }
        return (
            <Row className="questionFilterBar">
                {viewAll}
                <div
                    className={this.props.filterAnswered ? 'selected btn-plain' : 'btn-plain'}
                    onClick={this.props.toggleAnsweredFilter}
                >
                    Resolved
                </div>
                <div
                    className={this.props.filterUnanswered ? 'selected btn-plain' : 'btn-plain'}
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
                        <InputGroup.Button><Button><FontAwesome name="search searchIcon" /></Button></InputGroup.Button>
                    </InputGroup>
                </div>
            </Row>
        );
    }
}
