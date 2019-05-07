import React from 'react';
import { connect } from 'react-redux';
import { logIn, logOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isLoggedIn => {
    if (isLoggedIn) {
      this.props.logIn(this.auth.currentUser.get().getId());
    } else {
      this.props.logOut();
    }
  };

  onLogInClick = () => {
    this.auth.signIn(this.auth.currentUser.get().getId());
  };

  onLogOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isLoggedIn === null) {
      return null;
    } else if (this.props.isLoggedIn) {
      return (
        <button onClick={this.onLogOutClick} className="ui red google button">
          <i className="google icon" />
          Log Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onLogInClick} className="ui red google button">
          <i className="google icon" />
          Log In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ auth: { isLoggedIn } }) => {
  return { isLoggedIn };
};

export default connect(
  mapStateToProps,
  { logIn, logOut },
)(GoogleAuth);
