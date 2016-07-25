require("css/globals/VideoPlayer/TakeQuizButton")

import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';

export default class TakeQuizButton extends Component {
    render() {
        return (
            <div
                className="takeQuizButton"
                onClick={this.props.showQuiz}
            >
                <FontAwesome
                    className="checkIcon"
                    name='check-square-o'/>
                <span className="textWrapper">
                    <div className="text">
                        Check Your Understanding
                    </div>
                </span>
            </div>
        );
    }
}