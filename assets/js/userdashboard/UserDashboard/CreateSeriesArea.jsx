import React, { Component } from 'react';

import Row from 'react-bootstrap/lib/Row';

import CreateSeriesModal from 'js/globals/CreateSeriesModal';

class CreateSeriesArea extends Component{
    render() {
        return (
            <div className="createSeriesArea">
                <div className="title">
                    {this.props.name}
                </div>
                <div className="titledPanel">
                    <div className="defaultMessage">
                        You have not yet created a series. Try it!
                        <div><CreateSeriesModal /></div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = CreateSeriesArea;