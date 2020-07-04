import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector } from 'react-redux';
import { change_alias } from 'utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {},
  subheader: {
    display: 'flex',
    alignItems: 'center'
  },
  accessTimeIcon: {
    color: theme.palette.text.secondary,
    fontSize: '14px',
    height: 14,
    width: 14,
    marginRight: 6
  },
  content: {
    paddingTop: 0
  },
  message: {
    marginBottom: theme.spacing(2)
  },
  mediaArea: {
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 400,
    backgroundPosition: 'initial'
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const PostCard = props => {
  const { post, className, ...rest } = props;
  const [hide, setHide] = useState(true);
  const [title, setTile] = useState((post && post.title) || []);
  const key = change_alias(useSelector(state => state.search.key));
  const classes = useStyles();
  let splice = [...(title || [])];
  if (key && post) {
    splice = post.search
      .map((item, index) => (item.match(key) ? post.title[index] : null))
      .filter(item => item);
  }
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        disableTypography
        subheader={
          <div className={classes.subheader}>
            <Typography variant="body2">
              {moment(post.created).fromNow()}
            </Typography>
          </div>
        }
      />

      <CardContent className={classes.content}>
        <Typography
          className={classes.message}
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: hide
              ? title.length > 3
                ? splice.splice(0, 3).join('')
                : title.join('')
              : title.join('')
          }}></Typography>

        {!hide || (!key && title.length < 3) || (
          <div
            onClick={() => {
              setTile(post.title);
              setHide(false);
            }}>
            ...show more
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const PostCardHolder = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      {['', '', '', '', '', '', '', ''].map((item, index) => (
        <Card
          key={`${index}-placeholder`}
          {...rest}
          className={clsx(classes.root, className)}>
          <CardHeader
            disableTypography
            subheader={<Skeleton variant="text"></Skeleton>}
          />
          <CardContent className={classes.content}>
            <Skeleton variant="text"></Skeleton>
            <Skeleton variant="text"></Skeleton>
          </CardContent>
        </Card>
      ))}
    </React.Fragment>
  );
};

PostCard.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object.isRequired
};

export default PostCard;
