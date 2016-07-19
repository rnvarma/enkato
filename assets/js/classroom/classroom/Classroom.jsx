require('bootstrap-loader');
require("css/globals/base.scss");
require("css/classroom/classroom/Classroom.scss");

var React = require('react')
var ReactDOM = require('react-dom')

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

var NavBar = require('js/globals/NavBar');
var ClassHeader = require('js/classroom/classroom/ClassHeader');
var UnitSection = require('js/classroom/classroom/UnitSection');

fake_data = {
  c_id: 's7xWDgwMp8DhDJe4kdbsGD',
  name: 'Introduction to Biology',
  thumbnails: [
    "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg",
    "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg",
    "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg",
    "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg"
  ],
  creators: [
    {
      username: 'rvarma',
      user_id: 1
    }, {
      username: 'ashleyhlai',
      user_id: 2
    }
  ],
  description: 'This is a general introduction to biology. You should expect to learn so many things from this introductory course.',
  units: [
    {
      name: 'Molecular Biology',
      description: 'This is a short description of what Unit 2: Molecular Biology is about. Amazon\'s office is really old-school and I really need some more caffeine',
      num_videos: 3,
      order: 1,
      videos: [
        {
          name: 'The Mitochondria is the Power House of the Cell',

          creator: {
            username: 'Photo Synthesis',
            user_id: 2
          },
          duration: 670,
          upload_time: '',
          num_views: 6,
          thumbnail: "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg",
          order: 1
        }, {
          name: 'The Mitochondria is the Power House of the Cell',
          creator: {
            username: 'Photo Synthesis',
            user_id: 2
          },
          duration: 670,
          upload_time: '',
          num_views: 6,
          thumbnail: "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg",
          order: 2
        }, {
          name: 'The Mitochondria is the Power House of the Cell',
          creator: {
            username: 'Photo Synthesis',
            user_id: 2
          },
          duration: 670,
          upload_time: '',
          num_views: 6,
          thumbnail: "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg",
          order: 3
        } 
      ]
    }, {
      name: 'Molecular Biology',
      description: 'This is a short description of what Unit 2: Molecular Biology is about. Amazon\'s office is really old-school and I really need some more caffeine',
      num_videos: 3,
      order: 2,
      videos: [
        {
          name: 'The Mitochondria is the Power House of the Cell',
          creator: {
            username: 'Photo Synthesis',
            user_id: 2
          },
          duration: 670,
          upload_time: '',
          num_views: 6,
          thumbnail: "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg",
          order: 1
        }, {
          name: 'The Mitochondria is the Power House of the Cell',
          creator: {
            username: 'Photo Synthesis',
            user_id: 2
          },
          duration: 670,
          upload_time: '',
          num_views: 6,
          thumbnail: "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg",
          order: 2
        }, {
          name: 'The Mitochondria is the Power House of the Cell',
          creator: {
            username: 'Photo Synthesis',
            user_id: 2
          },
          duration: 670,
          upload_time: '',
          num_views: 6,
          thumbnail: "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg",
          order: 3
        } 
      ]
    }, {
      name: 'Evolution',
      description: 'This is a short description of what Unit 2: Molecular Biology is about. Amazon\'s office is really old-school and I really need some more caffeine',
      num_videos: 12,
      order: 3,
      videos: []
    }, {
      name: 'Molecular Biology',
      description: 'This is a short description of what Unit 2: Molecular Biology is about. Amazon\'s office is really old-school and I really need some more caffeine',
      num_videos: 3,
      order: 4,
      videos: [
        {
          name: 'The Mitochondria is the Power House of the Cell',
          creator: {
            username: 'Photo Synthesis',
            user_id: 2
          },
          duration: 670,
          upload_time: '',
          num_views: 6,
          thumbnail: "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg",
          order: 1
        }, {
          name: 'The Mitochondria is the Power House of the Cell',
          creator: {
            username: 'Photo Synthesis',
            user_id: 2
          },
          duration: 670,
          upload_time: '',
          num_views: 6,
          thumbnail: "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg",
          order: 2
        }, {
          name: 'The Mitochondria is the Power House of the Cell',
          creator: {
            username: 'Photo Synthesis',
            user_id: 2
          },
          duration: 670,
          upload_time: '',
          num_views: 6,
          thumbnail: "http://b.vimeocdn.com/ts/487/543/48754357_200.jpg",
          order: 3
        } 
      ]
    }, {
      name: 'Evolution',
      description: 'This is a short description of what Unit 2: Molecular Biology is about. Amazon\'s office is really old-school and I really need some more caffeine',
      num_videos: 12,
      order: 5,
      videos: []
    }
  ],
  num_tas : 2,
  num_units: 5,
  num_videos: 46
}

var Classroom = React.createClass({
    getInitialState: function() {
        // return {
        //     c_id: '',
        //     c_data: {}
        // }
        return fake_data
    },
    componentDidMount: function() {
        // var c_id =$("#c_id").attr("data-cid")
        // this.setState({c_id: c_id})
        // $.ajax({
        //   url: "/1/c/" + c_id,
        //   dataType: 'json',
        //   cache: false,
        //   success: function(data) {
        //     this.setState({c_data: data});
        //   }.bind(this),
        //   error: function(xhr, status, err) {
        //     console.error(this.props.url, status, err.toString());
        //   }.bind(this)
        // });
    },
    render: function() {
        return (
            <Row>
                <NavBar />
                <Col className="classroom-page-container" className="classroom-page-container" lg={10} lgOffset={1} md={10} mdOffset={1} sm={12}>
                    <div>
                        <ClassHeader data={this.state} />
                        <div className="content">
                            <UnitSection data={this.state}/>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
})

ReactDOM.render(<Classroom />, document.getElementById('page-anchor'))