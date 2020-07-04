import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress, CardHeader, Card, Grid } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%'
  },
  topBar: {
    zIndex: 2,
    position: 'relative'
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  containerMargin: { marginTop: 74 },
  navBar: {
    zIndex: 3,
    width: 256,
    flex: '0 0 auto'
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto'
  },
  searching: {
    position: 'fixed',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 999,
    height: 74
  },
  MenuItem: { marginBottom: 16 }
}));

const Dashboard = ({ route }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid sm={0} md={3} lg={3}>
          <div style={{ height: 'calc(100vh - 64px)' }}>
            <PerfectScrollbar>
              <MenuItem
                style={{ marginTop: 8 }}
                title="About"
                path="/about"></MenuItem>
              <MenuItem
                style={{ marginTop: 8 }}
                title="Clone each line"
                path="/clone-each-line"></MenuItem>
              <MenuItem
                style={{ marginTop: 8 }}
                title="Add text to lines"
                path="/add-text-to-line"></MenuItem>
            </PerfectScrollbar>
          </div>
        </Grid>
        <Grid sm={12} md={9} lg={9} style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              height: 'calc(100vh - 64px)',
              width: '1px',
              margin: 0,
              flexShrink: 0,
              backgroundColor: '#eeeeee',
              left: 8
            }}></div>
          <div style={{ height: 'calc(100vh - 64px)', marginLeft: 16 }}>
            <PerfectScrollbar>
              <main className={classes.content}>
                <Suspense fallback={<LinearProgress />}>
                  {renderRoutes(route.routes)}
                </Suspense>
              </main>
            </PerfectScrollbar>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
function MenuItem({ className, title, style = {}, path }) {
  const router = useRouter();
  console.log(
    'MenuItem -> path === router.location.path',
    path,
    router.location.pathname
  );
  return (
    <Link to={path}>
      <Card
        className={className}
        style={
          path === router.location.pathname
            ? style
            : { ...style, background: 'initial' }
        }>
        <CardHeader title={title}></CardHeader>
      </Card>
    </Link>
  );
}
Dashboard.propTypes = {
  route: PropTypes.object
};

export default Dashboard;
