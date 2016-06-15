
require("css/classroom/classroom/UnitList.scss");

var React = require('react')

var UnitButton = require('js/classroom/classroom/UnitButton');

module.exports = React.createClass({
    render: function() {
        var active_order = this.props.active
        var changeActiveUnit = this.props.changeActiveUnit
        var unitButtons = this.props.data.units.map(function(unit) {
            var is_active = unit.order == active_order
            return (
                <UnitButton
                    key={unit.order}
                    unit={unit}
                    isActive={is_active}
                    changeActiveUnit={changeActiveUnit}/>
            )
        })
        return (
            <div className="unitList">
                {unitButtons}
            </div>
        )
    }
})
