import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { AuthGuard } from 'components';
const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Auth = props => {
  const { route } = props;
  const dispatch = useDispatch();
  const noti = useSelector(state => state.noti);

  const classes = useStyles();

  return (
    <Fragment>
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes)}
        </Suspense>
      </main>
      <AuthGuard />
      {noti && noti.severity && (
        <Snackbar
          onClose={() => {
            dispatch(notiClose());
          }}
          open
          autoHideDuration={2000}>
          <Alert
            onClose={() => {
              dispatch(notiClose());
            }}
            severity={noti.severity}>
            {noti.label}!
          </Alert>
        </Snackbar>
      )}
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object
};

export default Auth;
