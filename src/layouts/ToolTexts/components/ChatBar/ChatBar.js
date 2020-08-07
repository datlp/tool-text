import React, { Fragment, useState, useEffect } from 'react';
import { Link as RouterLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
  Fab,
  Badge
} from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/List';
import axios from 'utils/axios';

import { StatusBullet } from 'components';
import useRouter from 'utils/useRouter';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 280
  },
  root: {
    backgroundColor: theme.palette.white
  },
  list: {
    padding: theme.spacing(1, 1)
  },
  listItemText: {
    marginRight: theme.spacing(1)
  },
  lastActivity: {
    whiteSpace: 'nowrap'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: theme.zIndex.drawer - 100
  }
}));

const ChatBar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchOpened = useSelector(state => state.search.open);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = () => {
      axios.get('/api/chat/activity').then(response => {
        if (mounted) {
          setData(response.data);
        }
      });
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  if (!data) {
    return null;
  }

  return (
    <Fragment>
      <Drawer
        anchor="right"
        classes={{ paper: classes.drawer }}
        elevation={1}
        onClose={handleClose}
        open={open}
        variant="temporary">
        <div {...rest} className={clsx(classes.root, className)}>
          {data.groups.map(group => (
            <List
              className={classes.list}
              key={group.id}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {group.name}
                </ListSubheader>
              }>
              {data.connections
                .filter(connection => group.id === connection.group)
                .map(connection => (
                  <ListItem disableGutters key={connection.id}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Person"
                        component={RouterLink}
                        src={connection.avatar}
                        to="/profile/1/timeline"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.listItemText}
                      disableTypography
                      primary={
                        <Typography
                          component={RouterLink}
                          display="block"
                          noWrap
                          to="/profile/1/timeline"
                          variant="h6">
                          {connection.name}
                        </Typography>
                      }
                    />
                    {connection.active ? (
                      <StatusBullet color="success" size="small" />
                    ) : (
                      <Typography
                        className={classes.lastActivity}
                        variant="body2">
                        {moment(connection.lastActivity).fromNow()}
                      </Typography>
                    )}
                  </ListItem>
                ))}
            </List>
          ))}
        </div>
      </Drawer>
      <span
        className={clsx(classes.fab, {
          [classes.shiftFab]: open
        })}>
        <LinkTo to={'/posts'}>
          <QuestionAnswerIcon />
        </LinkTo>{' '}
        <LinkTo
          to={'/list-questions'}
          match
          allows={['list-question', '/history/list-question']}>
          <ListIcon />
        </LinkTo>{' '}
        <LinkTo to="/quiz" match>
          <AssignmentTurnedInIcon />
        </LinkTo>{' '}
        <LinkTo to={'/posts/create'}>
          <PostAddIcon />
        </LinkTo>{' '}
        <Badge color="error">
          <Fab color="default" size="small">
            <SearchIcon />
          </Fab>
        </Badge>
      </span>
    </Fragment>
  );
};

const LinkTo = props => {
  const router = useRouter();
  const { to, children, match, allows = [] } = props;

  if (
    router.location.pathname === to ||
    (match && router.location.pathname.match(to)) ||
    allows.filter(item => router.location.pathname.match(item)).length > 0
  ) {
    return (
      <Badge color="error">
        <Fab size="small" color="primary">
          {children}
        </Fab>
      </Badge>
    );
  } else {
    return (
      <Link to={to}>
        <Badge color="error">
          <Fab size="small" color="default">
            {children}
          </Fab>
        </Badge>
      </Link>
    );
  }
};

ChatBar.propTypes = {
  className: PropTypes.string
};

export default ChatBar;
