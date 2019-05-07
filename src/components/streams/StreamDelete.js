import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    return (
      <>
        <button onClick={this.onSubmit} className="ui button negative">
          Delete Permanently
        </button>
        <Link to="/" className="ui button">
          Dismiss
        </Link>
      </>
    );
  }

  renderContent() {
    const { stream } = this.props;

    if (!stream) {
      return 'This action will permanently delete the stream. Proceed?';
    }

    return `You're about to permanently delete the following stream "${
      stream.title
    }`;
  }

  onSubmit = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  render() {
    return (
      <Modal
        title="Delete Warning!"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  {
    fetchStream,
    deleteStream,
  },
)(StreamDelete);
