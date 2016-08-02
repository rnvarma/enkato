require('css/series/seriespage/SeriesVideoList.scss');

import React, { Component } from 'react';
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
        $(".seriesVideoPanel").each(function(index) {
            var oldIndex = parseInt($(this).find(".order").text()) - 1;
            order[oldIndex] = index;
        });
        request.patch('/1/series/${this.props.seriesUUID}', {
            data: {order: order},
            success: (data) => {

            }
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
                    key={index}
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
        if (!this.state.reordering) {
            var buttons = 
                <div>
                    <Button onClick = {this.toggleReordering}>Reorder</Button>
                </div>
            var videoList = videoPanels
        }
        else {
            var buttons = 
                <div>
                    <Button onClick = {this.saveReordering}>Save</Button>
                    <Button onClick = {this.toggleReordering}>Cancel</Button>
                </div>
            var videoList = <SortableList data = {{items: videoPanels}}/>
        }
        return (
            <div className="seriesVideoList">
                {buttons}
                {videoList}
            </div>
        );
    }
}
