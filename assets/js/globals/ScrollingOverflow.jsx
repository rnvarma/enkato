import React from 'react';

export default class TopicNode extends React.Component {
    constructor(props) {
        super(props);
        this.getDimensions = this.getDimensions.bind(this)
        this.onHoverOn = this.onHoverOn.bind(this)
        this.onHoverOff = this.onHoverOff.bind(this)

        this.state = {
            overflow: false,
            totalWidth: 0,
            parentWidth: 0,
        }
    }

    getDimensions() {
        var elem = $(this.refs.dom)
        var parent = elem.parent();
        var parentWidth = parent.width()
        parent.css("width", "initial")
        var totalWidth = elem.width() + 15
        this.setState({
            overflow: totalWidth > parentWidth,
            totalWidth: totalWidth,
            parentWidth: parentWidth
        })
        parent.css("width", this.props.elementSize)
    }

    componentDidMount() {
        this.getDimensions()
        $(window).on('resize', this.getDimensions)
    }

    componentWillUnmount() {
        $(window).off('resize')
    }

    componentDidUpdate() {
        //this.getDimensions();
    }

    onHoverOn() {
        if (this.state.overflow) {
            $(this.refs.dom).css("margin-left", this.state.parentWidth - this.state.totalWidth)
        }
    }

    onHoverOff() {
        if (this.state.overflow) {
            $(this.refs.dom).css("margin-left", 0);
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
