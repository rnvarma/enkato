require('bootstrap-loader');
require("css/globals/VideoPlayer")

var React = require('react')
var ReactDOM = require('react-dom')

var FontAwesome = require('react-fontawesome');

var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;
var ControlLabel = require('react-bootstrap').ControlLabel;
var InputGroup = require('react-bootstrap').InputGroup;

var TopicList = require('js/globals/videoPlayer/TopicList')
var Video = require('js/globals/videoPlayer/Video')

var topicObjList = [
    {
        name: "What Django is",
        time: 2,
        id: 1,
        isCurrentTopic: false,
    },
    {
        name: "How Dynamic Web Servers Work",
        time: 40,
        id: 2,
        isCurrentTopic: true,
    },
    {
        name: "Hard to Learn with Guide",
        time: 60,
        id: 3,
        isCurrentTopic: false,
    },
    {
        name: "djangoproject.com",
        time: 100,
        id: 4,
        isCurrentTopic: false,
    },
    {
        name: "Django knowledge extends to other aspects of life",
        time: 2,
        id: 5,
        isCurrentTopic: false,
    },
    {
        name: "How Dynamic Web Servers Work",
        time: 40,
        id: 6,
        isCurrentTopic: false,
    },
    {
        name: "Hard to Learn with Guide",
        time: 60,
        id: 7,
        isCurrentTopic: false,
    },
    {
        name: "djangoproject.com",
        time: 100,
        id: 8,
        isCurrentTopic: false,
    },
    {
        name: "What Django is",
        time: 2,
        id: 9,
        isCurrentTopic: false,
    },
    {
        name: "How Dynamic Web Servers Work",
        time: 40,
        id: 10,
        isCurrentTopic: false,
    },
    {
        name: "Hard to Learn with Guide",
        time: 60,
        id: 11,
        isCurrentTopic: false,
    },
    {
        name: "djangoproject.com",
        time: 100,
        id: 12,
        isCurrentTopic: false,
    },
    {
        name: "Django knowledge extends to other aspects of life",
        time: 2,
        id: 13,
        isCurrentTopic: false,
    },
    {
        name: "How Dynamic Web Servers Work",
        time: 40,
        id: 14,
        isCurrentTopic: false,
    },
    {
        name: "Hard to Learn with Guide",
        time: 60,
        id: 15,
        isCurrentTopic: false,
    },
    {
        name: "djangoproject.com",
        time: 100,
        id: 16,
        isCurrentTopic: false,
    }
]


function updateCurrentTopic(targetKey, topicList){
    for(var i=0; i<topicList.length; i++){
        if(topicList[i].id == targetKey){
            topicList[i].isCurrentTopic = true;
        } else {
            topicList[i].isCurrentTopic = false;
        }
    }
    return topicList;
}

var VideoPlayer = React.createClass({
    loadCommentsFromServer: function(){
        this.setState({topicObjList:topicObjList})
    },
    getInitialState: function() {
        return {topicObjList: []};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
    },
    handleTopicClick:function(targetKey){
        //First, set the new currentTopic
        this.setState({
            topicObjList:updateCurrentTopic(targetKey, this.state.topicObjList)
        })

        //Second, Make API call to update video state

    },
    render: function() {
        return ( 
            <Row>
                <Col className="topicButtonColumn" md={3}>
                    <TopicList 
                        topicObjList={this.state.topicObjList} 
                        handleTopicClick={this.handleTopicClick}
                    />
                </Col>
                <Col className="vid-vidNav" md={9}>
                    <Row className="video">
                        <Video />
                    </Row>
                    <Row className="videoNavigator">
                        hey
                    </Row>
                </Col>
            </Row>
        )
    }
})


ReactDOM.render(<VideoPlayer />, document.getElementById('page-anchor'))
