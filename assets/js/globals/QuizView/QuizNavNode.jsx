require('css/globals/QuizView/QuizNavNode.scss');

var React = require('react')

export default class QuizNavNode extends React.Component {
    constructor(props) {
        super(props);

        this.onClicked = this.onClicked.bind(this);
    }

    onClicked(){
        console.log("wooo");
        this.props.setQuestion(this.props.index);
    }

    render() {
        var className = "quizNavNode"
        className += this.props.active ? " active" : ""
        className += this.props.reviewMode ? " review" : ""
        className += this.props.correct ? " correct" : ""
        return (
            <div
                className={className} 
                onClick={this.onClicked}>
                {this.props.order}
            </div>
        );
    }
}