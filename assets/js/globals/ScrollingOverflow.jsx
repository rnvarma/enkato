import React from 'react';

export default class TopicNode extends React.Component {
    constructor(props) {
        super(props);
        this.getDimensions = this.getDimensions.bind(this);
        this.onHoverOn = this.onHoverOn.bind(this);
        this.onHoverOff = this.onHoverOff.bind(this);

        this.state = {
            overflow: false,
            totalWidth: 0,
            parentWidth: 0,
        };
    }

    getDimensions() {
        let elem = $(this.refs.dom);
        let parent = elem.parent();
        let parentWidth = parent.width();
        parent.css('width', 'initial');
        let totalWidth = elem.width();
        this.setState({
            overflow: totalWidth > parentWidth,
            totalWidth,
            parentWidth,
        });
        parent.css('width', this.props.elementSize);
    }

    componentDidMount() {
        this.getDimensions();
        $(window).on('resize', this.getDimensions);
    }

    componentWillUnmount() {
        $(window).off('resize');
    }

    componentDidUpdate() {
        //this.getDimensions();
    }

    onHoverOn() {
        if (this.state.overflow) {
            $(this.refs.dom).css('margin-left', this.state.parentWidth - this.state.totalWidth);
        }
    }

    onHoverOff() {
        if (this.state.overflow) {
            $(this.refs.dom).css('margin-left', 0);
        }
    }

    render() {
        return (
            <div className="scrollingOverflow" ref="dom" onMouseEnter={this.onHoverOn} onMouseLeave={this.onHoverOff}>
                {this.props.text}
            </div>
        );
    }
}
