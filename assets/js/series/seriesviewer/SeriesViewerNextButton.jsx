import React from 'react';

class SeriesViewerNextButton extends React.Component {
    render() {
        return (
            <div className="seriesViewerNextButton">
                <div className="upNext smallTitle">
                    Up Next
                </div>
                <a href={this.props.nextVideo ? "#" + this.props.nextVideo.uuid : "#"} className="name">
                    {this.props.nextVideo ? this.props.nextVideo.name : "Series Complete"}
                </a>
            </div>
        );
    }
}

export default SeriesViewerNextButton;
