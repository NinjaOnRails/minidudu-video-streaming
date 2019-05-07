import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderOwnerButtons(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderCreateButton = () => {
    if (this.props.isLoggedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            New Stream
          </Link>
        </div>
      );
    }
  };

  renderStreamList() {
    return this.props.streams.map(stream => (
      <div className="item" key={stream.id}>
        {this.renderOwnerButtons(stream)}
        <i className="large middle aligned icon camera" />
        <div className="content">
          <Link to={`/streams/${stream.id}`} className="header">
            {stream.title}
          </Link>
          <div className="description">{stream.description}</div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderStreamList()}</div>
        {this.renderCreateButton()}
      </div>
    );
  }
}

const mapStateToProps = ({ streams, auth: { isLoggedIn, userId } }) => {
  return {
    streams: Object.values(streams),
    currentUserId: userId,
    isLoggedIn,
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams },
)(StreamList);
