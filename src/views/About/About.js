import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Page } from 'components';
import { ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import useRouter from 'utils/useRouter';
const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    padding: theme.spacing(1),
    height: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'colum',
    alignItems: 'center'
  },
  marginTopFirst: { marginTop: `68px !important` },
  tabWithSearching: { top: `74px !important` },
  tabsContainer: {
    background: 'white',
    padding: theme.spacing(1),
    position: 'fixed',
    top: 0,
    zIndex: 3
  },
  loadMore: { cursor: 'pointer', marginBottom: theme.spacing(3) },
  Abouts: { height: 'calc(100vh - 64px)', marginTop: 64 },
  AboutItem: {
    marginTop: theme.spacing(2)
  },
  aboutProject: {
    marginTop: theme.spacing(2)
  },
  projectCover: {
    marginTop: theme.spacing(2)
  },
  projectDetails: {
    marginTop: theme.spacing(2)
  },
  preferences: {
    marginTop: theme.spacing(2)
  },
  actions: {
    marginTop: theme.spacing(2)
  }
}));

const About = () => {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    router.location.pathname === '/' && router.history.replace('/about');
  }, [router.location.pathname, router.history]);

  return (
    <Page className={classes.root} title={'Toolkits'}>
      <span style={{ display: 'flex' }}>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src="/images/avatars/14568247_598179333700733_4935340561322903829_n.jpg"
          />
        </ListItemAvatar>
        <ListItemText
          primary="Francis"
          secondary={`Don't do hard work do smart work!`}
        />
      </span>
    </Page>
  );
};
export default About;
