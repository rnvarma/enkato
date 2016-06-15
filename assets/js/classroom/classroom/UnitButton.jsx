
require("css/classroom/classroom/UnitButton.scss");

var React = require('react')

module.exports = React.createClass({
    getInitialState: function() {
        return {unit: null}
    },
    componentDidMount: function() {
        this.setState({unit: this.props.unit});
    },
    onClick: function() {
        this.props.changeActiveUnit(this.state.unit.order);
    },
    render: function() {
        var unit = this.props.unit;
        var className = this.props.isActive ? "unitButton active" : "unitButton"
        var description = this.props.isActive ? <div className="description">{unit.description}</div> : <div></div>
        return (
            <div className={className} onClick={this.onClick}>
                <div className="title">
                    UNIT {unit.order}: {unit.name} ({unit.num_videos} videos)
                </div>
                {description}
            </div>
        )
    }
})
