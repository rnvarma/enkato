
require("css/series/seriespage/UploadAnnotateModal.scss");

var React = require('react');

var getCookie = require('js/globals/GetCookie')
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;

var AddVideoToSeriesForm = require('js/series/seriespage/AddVideoToSeriesForm');
var AnnotateVideosForSeries = require('js/series/seriespage/AnnotateVideosForSeries');

module.exports = React.createClass({
    getInitialState: function() {
        return { 'error': "" };
    },
    onBack: function() {
        if (this.props.annotateMode) {
            this.props.setAnnotateMode(false);
        } else {
            this.props.close();
        }
    },
    onNext: function() {
        if (this.props.annotateMode) {
            this.props.close();
        } else {
            if (this.props.urls) {
                $.ajax({
                    url: "/upload/s/" + this.props.data.s_id,
                    dataType: "json",
                    type: "POST",
                    data: { urls: this.props.urls },
                    beforeSend: function(xhr) {
                        xhr.withCredentials = true;
                        xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
                    },
                    success: function(data) {
                        if (data.status) {
                            this.props.reloadPageData();
                            this.props.setAnnotateMode(true);
                            this.props.setUrls(""); /* reset url entry to avoid resubmission */
                        } else {
                            /* remove urls from list that didn't fail */
                            /* errors is list of bad urls */
                            var newUrls = "";
                            var errorOutput = "";
                            var errorCount = data.errors.length;
                            data.errors.forEach(function(bad_url, index) {
                                newUrls += bad_url + '\n';

                                /* builds a comma-seperated list of urls with an and */
                                if (index + 1 < errorCount) {
                                    errorOutput += "'" + bad_url + "'";
                                    if (errorCount > 2) {
                                        /* add , if more than two and not last one */
                                        errorOutput += ", ";
                                    }
                                } else {
                                    if (errorCount >= 2) {
                                        errorOutput += " and "
                                    }
                                    errorOutput += "'" + bad_url + "'";
                                }
                            });
                            if (errorCount == 1) {
                                errorOutput += " is an invalid YouTube video URL.";
                            } else {
                                errorOutput += " are invalid YouTube video URLs.";
                            }
                            this.props.setUrls(newUrls);
                            this.props.reloadPageData(); /* some videos may have still been uploaded */
                            this.setState({ error: errorOutput });
                        }
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(this.props.urls, status, err.toString());
                    }.bind(this)
                });
            } else {
                this.props.setAnnotateMode(true);
                this.setState({ error: "" });
            }
        }
    },
    render: function() {
        var modalInfo = {}
        var nextText = "";
        if (this.props.annotateMode) {
            modalInfo = {
                title: "Annotating",
                class: "annotating",
                body: <AnnotateVideosForSeries
                          data={this.props.data}
                          quizMode={this.props.quizMode}
                      />
            }
            nextText = "Finish";
        } else {
            modalInfo = {
                title: "Import Video(s)",
                class: "",
                body: <AddVideoToSeriesForm
                          urls={this.props.urls}
                          onURLAdded={this.props.onURLImport}
                      />
            }
            nextText = "Next";
        }

        return (
            <div className="uploadAnnotateModal">
                <Modal className={modalInfo.class} show={this.props.show} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalInfo.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.error} {/* TODO: style error code */}
                        {modalInfo.body} 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="structabl-blue" onClick={this.props.close}>Cancel</Button>
                        <Button className="structabl-red" onClick={this.onBack}>Back</Button>
                        <Button className="structabl-red" onClick={this.onNext}>{nextText}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
})
