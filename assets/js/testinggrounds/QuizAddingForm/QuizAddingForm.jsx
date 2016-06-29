var React = require('react')
var ReactDOM = require('react-dom')
var FontAwesome = require('react-fontawesome');

var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var Row = require('react-bootstrap').Row;
var FormControl = require('react-bootstrap').FormControl;
var ControlLabel = require('react-bootstrap').ControlLabel;
var InputGroup = require('react-bootstrap').InputGroup;
var FontAwesome = require('react-fontawesome');

var QuizAddingFormWrapper = React.createClass({
    getInitialState: function(){
        return {
            quizQuestionText:"",
            choiceList:[{choiceText:"", keyCode:1}],
            shouldRefocus:false,
            currentFocus:0
        }
    },
    handleQuizQuestionChange: function(questionText){
        this.setState({quizQuestionText:questionText})
    },
    handleChoiceTextChange: function(text,index){
        var tempChoiceList = this.state.choiceList;
        tempChoiceList[index].choiceText = text;
        this.setState({choiceList:tempChoiceList})
        if(text.length==0){
            var this2=this
            $("#"+index).one("keydown",function(event){
                event.preventDefault()
                console.log(event)
                if(index!==0)
                    this2.deleteChoice(index)
                $("#"+(index-1)).focus()
            })
        }
    },
    addNewChoice: function(){
        var tempChoiceList = this.state.choiceList;
        tempChoiceList.push({choiceText:"", keyCode:Math.random()})
        this.setState({choiceList:tempChoiceList})
        this.setState({shouldRefocus:true})
    },
    componentDidUpdate: function(){
        if(this.state.shouldRefocus){
            //focus on new option
            var optionId="#"+(this.state.choiceList.length-1)
            $(optionId).focus();
            this.setState({shouldRefocus:false})
        }
    },
    deleteChoice:function(choiceIndex){
        tempChoiceList = this.state.choiceList
        if(choiceIndex>-1)
            tempChoiceList.splice(choiceIndex,1)
        this.setState({choiceList:tempChoiceList})

    },
    render: function() {
        console.log(this.state)
        return (
            <div>
                <QuizQuestion 
                    handleQuizQuestionChange={this.handleQuizQuestionChange}/>
                <MCChoiceList 
                    addNewChoice ={this.addNewChoice}
                    handleChoiceTextChange={this.handleChoiceTextChange}
                    choiceList={this.state.choiceList}
                    deleteChoice={this.deleteChoice}/>
            </div>
        )
    }
})

var QuizQuestion = React.createClass({
    handleQuestionTextChange: function(e){
        this.props.handleQuizQuestionChange(e.target.value)
    },
    render: function(){
        return(
            <Row>
                <input
                    className="category-input"
                    type="text"
                    placeholder="Question"
                    onChange={this.handleQuestionTextChange}
                    id={this.props.index}/>
            </Row>
        )
    }
})



var MCChoiceList = React.createClass({
    
    render: function(){
        var index = -1;//this is okay because everything is local to the host
        var shouldUseX=this.props.choiceList.length!==1
        var MCChoiceNodes = this.props.choiceList.map(function(choice){
            index++;
            return (
                <MCChoiceNode
                    key={choice.keyCode}
                    index={index}
                    choiceText={choice.choiceText}
                    handleChoiceTextChange={this.props.handleChoiceTextChange}
                    addNewChoice={this.props.addNewChoice}
                    deleteChoice={this.props.deleteChoice}
                    shouldUseX={shouldUseX}/>
            )
        },this)
        return (
            <div>
                {MCChoiceNodes}
            </div>
        )
    }
})


var MCChoiceNode = React.createClass({
    handleChoiceTextChange: function(e){
        this.props.handleChoiceTextChange(e.target.value,this.props.index)
    },
    submit: function(e){
        e.preventDefault()
        this.props.addNewChoice()
    },
    deleteChoice: function(){
        if(this.props.shouldUseX)
            this.props.deleteChoice(this.props.index)
    },
    render: function(){
        //add 1 to index because its an index // starts @ 0 ! 1
        var placeholder = "Choice "+(this.props.index+1)
        return(
            <form onSubmit={this.submit}>
                <Row>
                    <input
                        className="category-input"
                        type="text"
                        placeholder={placeholder}
                        onChange={this.handleChoiceTextChange}
                        id={this.props.index}/>
                    <FontAwesome 
                        name='times'
                        onClick={this.deleteChoice}/>
                    <div type="submit">
                    </div>
                </Row>
            </form>
        )
    }
})


ReactDOM.render(<QuizAddingFormWrapper/>, 
    document.getElementById('page-anchor')
)