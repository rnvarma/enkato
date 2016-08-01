require('css/series/seriespage/SeriesVideoList.scss');

import React, { Component } from 'react';
import { Sortable } from 'react-sortable';

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
    }

    render() {
        var videoPanels = this.props.videos.map(function(v) {
            return (
                <SeriesVideoPanel
                    key={v.order}
                    video={v}
                    seriesUUID={this.props.seriesUUID}
                    is_creator={this.props.is_creator}
                    is_private={v.is_private}
                    makeVideoPrivate={this.props.makeVideoPrivate}
                    makeVideoPublic={this.props.makeVideoPublic}
                    loadPageData={this.props.loadPageData}/>
            );
        }.bind(this))
        var testList = ["Yo", "what", "is", "up", "with", "it", "i", "am", "trying", "to", "get", "this", "to", "work", "cmon", "haha"]
        var videoList = <SortableList data = {{items: videoPanels}}/>
        return (
            <div className="seriesVideoList">
                {videoList}
            </div>
        );
    }
}
