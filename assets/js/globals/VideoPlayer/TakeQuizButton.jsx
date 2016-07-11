require('bootstrap-loader'); 
require("css/globals/VideoPlayer/TakeQuizButton")

import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';

module.exports = React.createClass({
    render: function(){
        return (
            <div
                className="takeQuizButton"
                onClick={this.props.showQuiz}
            >
                <FontAwesome
                    className="checkIcon"
                    name='check-square-o'
                />
                <span className="textWrapper">
                    <div className="text">
                        Check Your Understanding
                    </div>
                </span>
            </div>
        );
    }
});