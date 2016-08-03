import React, { Component } from 'react'

class DraggableListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>{this.props.item}</div>
    }
}
