import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Button from 'react-bootstrap/lib/Button';
import Container from 'js/series/seriespage/Sortable/Container';

import request from 'js/globals/HttpRequest'
import SeriesVideoPanel from 'js/series/seriespage/SeriesVideoPanel';

export default class SeriesVideoList extends Component {
    constructor(props) {
        super(props);

        this.state = {reordering: false,};

        this.saveReordering = this.saveReordering.bind(this);
        this.toggleReordering = this.toggleReordering.bind(this);
    }

    saveReordering() {
        var order = []
        var newVideos = []
        var handle = this
        $(".seriesVideoPanel").each(function(index) {
            var oldIndex = parseInt($(this).find(".order").text()) - 1;
            newVideos[index] = handle.props.videos[oldIndex]
            order[oldIndex] = index;
        });
        request.patch(`/1/series/${this.props.seriesUUID}`, {
            data: {order: order},
            success: (data) => {

            }
        });
        this.props.videos.map((item, index) => {
            this.props.videos[index] = newVideos[index];
            return 0;
        });
        this.toggleReordering()
    }

    toggleReordering() {
        this.setState({reordering: !this.state.reordering})
    }

    render() {
        const videoPanels = this.props.videos.map(function(v, index) {
            return (
                <SeriesVideoPanel
                    key={v.uuid}
                    order={index}
                    reordering={this.state.reordering}
                    video={v}
                    seriesUUID={this.props.seriesUUID}
                    is_creator={this.props.is_creator}
                    is_private={v.is_private}
                    makeVideoPrivate={this.props.makeVideoPrivate}
                    makeVideoPublic={this.props.makeVideoPublic}
                    loadPageData={this.props.loadPageData}/>
            );
        }.bind(this))
        var buttons = <div/>
        if (!this.state.reordering) {
            if (this.props.is_creator) {
                buttons = 
                    <div>
                        <Button className="btn-secondary" onClick = {this.toggleReordering}>Reorder</Button>
                    </div>
            }
            var videoList = videoPanels
        }
        else if (this.props.is_creator) {
            buttons = 
                <div>
                    <Button
                        className="btn-secondary"
                        onClick = {this.saveReordering}>
                        Save
                    </Button>
                    <Button
                        className="btn-secondary"
                        onClick = {this.toggleReordering}>
                        Cancel
                    </Button>
                </div>
            var videoList = <Container items = {videoPanels}/>
        }
        return (
            <div className="seriesVideoList baseContainer">
                {buttons}
                {videoList}
            </div>
        );
    }
}
