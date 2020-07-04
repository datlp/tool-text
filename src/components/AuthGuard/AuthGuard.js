import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const AuthGuard = props => {
  const { children } = props;

  return <Fragment>{children}</Fragment>;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
