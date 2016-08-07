import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Button from 'react-bootstrap/lib/Button';
import { Sortable } from 'react-sortable';

import request from 'js/globals/HttpRequest'
import SeriesVideoPanel from 'js/series/seriespage/SeriesVideoPanel';

var ListItem = React.createClass({
    displayName: 'SortableListItem',
    render: function() {
        return (
            <div {...this.props} className="list-item">{this.props.children}</div>
        )
    }
})

var SortableListItem = Sortable(ListItem);

var SortableList = React.createClass({
    getInitialState: function() {
        return {
            draggingIndex: null,
            data: this.props.data
        };
    },

    updateState: function(obj) {
        this.setState(obj);
    },
    render: function() {
        var listItems = this.state.data.items.map(function(item, i) {
            return (
                <SortableListItem
                    key={i}
                    updateState={this.updateState}
                    items={this.state.data.items}
                    draggingIndex={this.state.draggingIndex}
                    sortId={i}
                    outline="list">{item}</SortableListItem>
            );
        }, this);

        return (
            <div className="list">{listItems}</div>
        )
    }
});


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
            var videoList = <SortableList data = {{items: videoPanels.map((item) => {return <div className = "seriesVideoPanelSortable">{item}</div>})}}/>
        }
        return (
            <div className="seriesVideoList baseContainer">
                {buttons}
                {videoList}
            </div>
        );
    }
}
