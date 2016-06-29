
require("css/series/seriespage/NoVideosArea.scss");

var React = require('react')

var getCookie = require('js/globals/GetCookie');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var AddVideoToSeriesForm = require('js/series/seriespage/AddVideoToSeriesForm');
var AnnotateVideosForSeries = require('js/series/seriespage/AnnotateVideosForSeries');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            showModal: false,
            urls: "",
            annotating: false,
            quizMode: false,
        }
    },
    close: function() {
        this.setState({showModal: false})
    },
    open: function() {
        this.setState({showModal: true})
    },
    onURLAdded: function(e) {
        this.setState({urls: e.target.value});
    },
    onFormSubmit: function(e) {
        if (!this.state.urls) this.setState({annotating: true});
        data = {
            urls: this.state.urls
        }
        $.ajax({
          url: "/upload/s/" + this.props.data.s_id,
          dataType: 'json',
          type: 'POST',
          data: data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            if (data.status) {
                this.props.reloadPageData()
                this.setState({annotating: true})
            } else {
                console.log("sad face");
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    toggleToTopicMode: function() {
      this.setState({quizMode: false})
    },
    toggleToQuizMode: function() {
      this.setState({quizMode: true})
    },
    render: function() {
        var hasVideos = (this.props.data.videos.length > 0)
        var title = hasVideos ? "Add more videos to this series." : "This series is currently empty."
        var overAllClass = hasVideos ? "noVideosArea hasVideos" : "noVideosArea"

        var modalTitle = this.state.annotating ? "Annotation" : "Import Videos(s)"
        var modalClass = this.state.annotating ? "annotating" : ""

        if (this.state.annotating) {
          var modalBody = (
            <AnnotateVideosForSeries
                data={this.props.data}/>
          )
        } else {
          var modalBody = (
            <AddVideoToSeriesForm 
                onURLAdded={this.onURLAdded}/>
          )
        } 
        return (
            <div className={overAllClass}>
                <div>{title}</div>
                <div className="addVideo">
                    <Button onClick={this.open} className="addVideoBtn structabl-blue">Import Video(s)</Button>
                    <Modal className={modalClass} show={this.state.showModal} onHide={this.close}>
                      <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {modalBody}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className={"toggleAnnotating topics" + (this.state.quizMode ? "" : " active")}
                          onClick={this.toggleToTopicMode}>Topics</Button>
                        <Button className={"toggleAnnotating quizzes" + (this.state.quizMode ? " active" : "")}
                          onClick={this.toggleToQuizMode}>Quizzing</Button>
                        <Button className="structabl-blue" onClick={this.close}>Cancel</Button>
                        <Button className="structabl-red">Back</Button>
                        <Button className="structabl-red" onClick={this.onFormSubmit}>Next</Button>
                      </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
})
