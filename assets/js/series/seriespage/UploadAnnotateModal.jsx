import React, { Component } from 'react';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

import request from 'js/globals/HttpRequest';
import AddVideoToSeriesForm from 'js/series/seriespage/AddVideoToSeriesForm';
import AnnotateVideosForSeries from 'js/series/seriespage/AnnotateVideosForSeries';
import ConfirmModal from 'js/globals/ConfirmModal';

export default class UploadAnnotateModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            readyToPublish: false,
            unsavedTopics: false,
            unsavedQuiz: false,
            showingConfirmSave: false,
            onConfirmQuit: function() {},
        };

        this.cancelPublish = this.cancelPublish.bind(this);
        this.setUnsavedTopics = this.setUnsavedTopics.bind(this);
        this.setUnsavedQuiz = this.setUnsavedQuiz.bind(this);
        this.launchUnsaved = this.launchUnsaved.bind(this);
        this.setKeepChanges = this.setKeepChanges.bind(this);
        this.resetUnsaved = this.resetUnsaved.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onTopicMode = this.onTopicMode.bind(this);
        this.onQuizMode = this.onQuizMode.bind(this);
    }

    /* reopening the annotating modal after closing it resets unsavedChanges to false */
    componentWillReceiveProps(newProps) {
        if (!this.props.annotateMode && newProps.annotateMode) {
            this.resetUnsaved();
        }
    }

    cancelPublish() {
        this.setState({
            readyToPublish: false,
        });
    }

    setUnsavedTopics() {
        if (!this.state.unsavedTopics) {
            this.setState({
                unsavedTopics: true,
            });
        }
    }

    setUnsavedQuiz() {
        if (!this.state.unsavedQuiz) {
            this.setState({
                unsavedQuiz: true,
            });
        }
    }

    /* close annotations to save modal, continue editing */
    setKeepChanges() {
        this.setState({
            showingConfirmSave: false,
        });
    }

    launchUnsaved(callbackOnConfirm) {
        this.setState({
            showingConfirmSave: true,
            onConfirmQuit: () => {
                callbackOnConfirm();
                this.resetUnsaved();
            },
        });
    }

    resetUnsaved() {
        this.setState({
            readyToPublish: false,
            unsavedTopics: false,
            unsavedQuiz: false,
            showingConfirmSave: false,
        });
    }

    /* modal closes if there are no annotations to save */
    closeModal() {
        if (this.state.unsavedTopics || this.state.unsavedQuiz) {
            this.launchUnsaved(this.props.close);
        } else {
            this.props.close();
        }
    }

    onBack() {
        if (this.props.annotateMode) {
            if (this.state.unsavedTopics || this.state.unsavedQuiz) {
                this.launchUnsaved(this.props.setUploadMode);
            } else {
                this.props.setUploadMode();
            }
        } else {
            this.props.close();
        }
    }

    onNext() {
        if (this.props.quizMode) {
            this.setState({
                readyToPublish: true,
            });
        }
        if (this.props.annotateMode) {
            this.setState({
                readyToPublish: true,
            });
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

    onTopicMode() {
        if (this.state.unsavedQuiz) {
            this.launchUnsaved(this.props.setTopicMode);
        } else {
            this.props.setTopicMode();
        }
    }

    onQuizMode() {
        if (this.state.unsavedTopics) {
            this.launchUnsaved(this.props.setQuizMode);
        } else {
            this.props.setQuizMode();
        }
    }

    render() {
        let modalInfo = {}
        let nextText = "";
        let toggleBtns = "";
        if (this.props.annotateMode) {
          modalInfo = {
            title: "Annotating",
            class: "annotating",
            body: (
                <AnnotateVideosForSeries
                    videos={this.props.videos}
                    quizMode={this.props.quizMode}
                    unsavedTopics={this.state.unsavedTopics}
                    unsavedQuiz={this.state.unsavedQuiz}
                    readyToPublish={this.state.readyToPublish}
                    setUnsavedTopics={this.setUnsavedTopics}
                    setUnsavedQuiz={this.setUnsavedQuiz}
                    launchUnsaved={this.launchUnsaved}
                    cancelPublish={this.cancelPublish}
                    closeAnnotationModal={this.props.close}/>
            ),
          }
          nextText = "Save and Publish";
          toggleBtns = (
                <div className="toggleMode">
                    <Button
                        className={"toggleAnnotating topics" + (this.props.quizMode ? "" : " active")}
                        onClick={this.onTopicMode}>
                        Topics
                    </Button>
                    <Button
                        className={"toggleAnnotating quizzes" + (this.props.quizMode ? " active" : "")}
                        onClick={this.onQuizMode}>
                        Quizzing
                    </Button>
                </div>
            );
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
                <Modal className={modalInfo.class} show={this.props.show} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalInfo.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ConfirmModal
                            showing={this.state.showingConfirmSave}
                            description="Are you sure you want to navigate away? Your changes are not saved and will be gone forever."
                            acceptCallback={this.state.onConfirmQuit}
                            cancelCallback={this.setKeepChanges}/>
                        {this.state.error}
                        {modalInfo.body}
                    </Modal.Body>
                    <Modal.Footer>
                        {toggleBtns}
                        <Button className="structabl-blue" onClick={this.closeModal}>Cancel</Button>
                        <Button className="structabl-red" onClick={this.onBack}>Back</Button>
                        <Button className="structabl-red" onClick={this.onNext}>{nextText}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
