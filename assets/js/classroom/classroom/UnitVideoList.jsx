require("css/classroom/classroom/UnitVideoList.scss");

var React = require('react')

var UnitVideoSet = require('js/classroom/classroom/UnitVideoSet');

module.exports = React.createClass({
    render: function() {
        var active_order = this.props.active
        var sets = this.props.data.units.map(function(unit) {
            var is_active = unit.order == active_order
            return (
                <UnitVideoSet
                    key={unit.order}
                    videos={unit.videos}
                    isActive={is_active}/>
            )
        })
        return (
            <div className="unitVideoList">
                {sets}
            </div>
        )
    }
})
