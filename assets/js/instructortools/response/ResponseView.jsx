require('bootstrap-loader');
require('css/instructortools/response/ResponseView.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import QuestionView from 'js/globals/QuestionAndAnswer/QuestionView';

class ResponseView extends React.Component {
  constructor() {
    super();

    this.loadQuestionData = this.loadQuestionData.bind(this);
  }

  loadQuestionData(onSuccess) {
    $.ajax({
      url: `/api/series?creator=${this.props.userId}`,
      dataType: 'json',
      cache: false,
      success: (data) => {
        let questionData = [];
        data.forEach((series) => {
          series.videos.forEach((video) => {
            video.video.question_set.forEach((question) => {
              questionData.push(question);
            });
          });
        });
        onSuccess(questionData);
      },
      error(xhr, status, error) {
        console.error(status, error.toString());
      },
    });
  }

  render() {
    return (
      <div className="responseView">
        <QuestionView
          loadQuestionData={this.loadQuestionData}
        />
      </div>
    );
  }
}

ReactDOM.render(<ResponseView userId={$('#uid').attr('data-uid')} />,
  document.getElementById('page-anchor'));
