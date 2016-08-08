import React, { Component, PropTypes } from 'react';

class EditBreakpointNode extends Component {
    render() {
        const { breakpoint } = this.props;

        return (
            <div className="editBreakpointNode">
                {breakpoint.clean_time} - {breakpoint.text}
            </div>
        );
    }
}

EditBreakpointNode.propTypes = {
    breakpoint: PropTypes.obj.isRequired,
}

export default EditBreakpointNode;