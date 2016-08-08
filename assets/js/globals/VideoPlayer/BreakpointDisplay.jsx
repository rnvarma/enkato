import React, { Component, PropTypes } from 'react';

import Button from 'react-bootstrap/lib/Button';

class BreakpointDisplay extends Component {
    render() {
        const { breakpoint, finish } = this.props;

        let textOrQuiz;
        if (breakpoint.text) {
            textOrQuiz = breakpoint.text;
        } else {
            /* implement quizModal, will be a good amount of work */
        }

        return (
            <div className="breakpointDisplay greyBackground">
                {textOrQuiz}
                <Button onClick={finish}>Finish</Button>
            </div>
        );
    }
}

BreakpointDisplay.propType = {
    breakpoint: PropTypes.object.isRequired,
    finish: PropTypes.func.isRequired,
}

export default BreakpointDisplay;