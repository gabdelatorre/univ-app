import React from 'react';
const reactReduxFirebase = jest.requireActual('react-redux-firebase');

module.exports = {
  ...reactReduxFirebase,
  withFirebase: (Component) => {
    const firebase = {
      // modify as you need
      remoteConfig: () => ({ fetchAndActivate: jest.fn() }),
    };

    return (props) => <Component {...props} firebase={firebase} />;
  },
};
