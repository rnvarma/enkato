
require("css/series/seriespage/UploadAnnotateModal.scss");

import React, { Component } from 'react';

import getCookie from 'js/globals/GetCookie';

import { Button, Modal } from 'react-bootstrap';

import AddVideoToSeriesForm from 'js/series/seriespage/AddVideoToSeriesForm';
import AnnotateVideosForSeries from 'js/series/seriespage/AnnotateVideosForSeries';
import request from 'js/globals/HttpRequest';

export default class UploadAnnotateModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ""
        };

        this.onBack = this.onBack.bind(this);
        this.onNext = this.onNext.bind(this);
    }

    onBack() {
        if (this.props.annotateMode) {
            this.props.setUploadMode();
        } else {
            this.props.close();
        }
    }

    onNext() {
        if (this.props.annotateMode) {
            this.props.close();
        } else {
            if (this.props.urls) {
                request.post(`/upload/s/${this.props.seriesUUID}`, {
                    data: { urls: this.props.urls },
                    success: (data) => {
                        if (data.status) {
                            this.props.reloadPageData();
                            this.props.setUrls(""); /* reset url entry to avoid resubmission */
                            this.setState({ error: '' });
                            this.props.setAnnotateMode()
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
                    }
                })
            } else {
              if (this.props.videos.length > 0) {
                this.props.setAnnotateMode();
                this.setState({error: ''});
              } else {
                this.setState({error: 'No videos uploaded!'});
              }
            }
        }
    }

    render() {
        var modalInfo = {}
        var nextText = "";
        let toggleBtns = "";
        if (this.props.annotateMode) {
          modalInfo = {
            title: "Annotating",
            class: "annotating",
            body: <AnnotateVideosForSeries
                      videos={this.props.videos}
                      quizMode={this.props.quizMode} />
          }
          nextText = "Save and Publish";
          toggleBtns = (<div className="toggleMode"><Button
                            className={"toggleAnnotating topics" + (this.props.quizMode ? "" : " active")}
                            onClick={this.props.setTopicMode}>Topics</Button>
          <Button className={"toggleAnnotating quizzes" + (this.props.quizMode ? " active" : "")}
                  onClick={this.props.setQuizMode}>Quizzing</Button></div>);
        } else {
          modalInfo = {
            title: "Import Video(s)",
            class: "",
            body: <AddVideoToSeriesForm
                      urls={this.props.urls}
                      onURLAdded={this.props.onURLImport}/>
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
                        {this.state.error}
                        {modalInfo.body}
                    </Modal.Body>
                    <Modal.Footer>
                        {toggleBtns}
                        <Button className="structabl-blue" onClick={this.props.close}>Cancel</Button>
                        <Button className="structabl-red" onClick={this.onBack}>Back</Button>
                        <Button className="structabl-red" onClick={this.onNext}>{nextText}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
