
require("css/series/seriespage/AnnotateSeriesSideBarButton.scss");

import React, { Component } from 'react';

export default class AnnotateSeriesSideBarButton extends Component {
    constructor(props) {
        super(props)

        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.props.updateCurrVideo(this.props.video.uuid);
    }

    render() {
        var activeClass = this.props.isCurrVideo ? "active" : ""
        return (
            <div className={"annotateSeriesSideBarButton " + activeClass} onClick={this.onClick}>
                <div className="buttonContainer">
                    <img className="image" src={this.props.video.thumbnail}/>
                    <div className="name">
                        {this.props.video.name}
                    </div>
                    <div className="shadow">
                    </div>
                </div>
            </div>
        )
    }
}
