import React from 'react';
import { makeStyles } from '@material-ui/styles';

import moment from 'moment';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CancelIcon from '@material-ui/icons/Cancel';
import HistoryIcon from '@material-ui/icons/History';
import {
  Card,
  CardActions,
  Button,
  CardHeader,
  Grid,
  Divider,
  Tooltip,
  Typography,
  CardContent
} from '@material-ui/core';

import clsx from 'clsx';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  listITem: {
    marginTop: theme.spacing(2)
  }
}));

const ListHistoryItem = props => {
  const classes = useStyles();
  const {
    className,
    id,
    listId,
    list = {},
    order,
    showName,
    updated,
    variant = 'link',
    history
  } = props;
  const noQuestions = list.noQuestions || props.noQuestions;
  const noRightQuestions = list.noRightQuestions || props.noRightQuestions;
  const listName = list.listName || props.listName;
  const listDescription =
    list.listDescription || props.listDescription || '<p></p>';

  const main = (
    <Card
      onClick={() => {
        // router.history.push(
        //   `/history/list-question${genParamsString({ listId, order })}`
        // );
      }}
      className={clsx(classes.listITem, className)}>
      <CardHeader
        title={
          noRightQuestions !== undefined ? (
            <Grid container alignItems="center" justify="space-between">
              {`${showName && listName ? listName : 'Done'} · ${moment(
                updated
              ).fromNow()}`}
            </Grid>
          ) : (
            <Typography color="textPrimary" variant="h5">
              {listName}
            </Typography>
          )
        }></CardHeader>
      <CardContent>
        <Typography color="textSecondary">
          <p
            dangerouslySetInnerHTML={{
              __html: listDescription
            }}></p>
        </Typography>
      </CardContent>
      <CardActions>
        <Divider />
        <Grid container>
          <Tooltip title="Number of quizzes">
            <Button startIcon={<QuestionAnswerIcon />}>
              {` · ${noQuestions}`}
            </Button>
          </Tooltip>
          {noRightQuestions !== undefined && (
            <Tooltip title="Number of right quizzes">
              <Button startIcon={<CancelIcon />}>
                {` · ${noRightQuestions}`}
              </Button>
            </Tooltip>
          )}
          {noRightQuestions !== undefined && (
            <Tooltip title="Rate">
              <Button startIcon={'%'}>
                {` · ${(noRightQuestions / noQuestions) * 100 * 1.0}`}
              </Button>
            </Tooltip>
          )}{' '}
          {Array.isArray(history) && (
            <Tooltip title="Rate">
              <Button startIcon={history.length === 0 ? '' : <HistoryIcon />}>
                {`${history.length === 0 ? 'Do now!' : ' · ' + history.length}`}
              </Button>
            </Tooltip>
          )}
        </Grid>
      </CardActions>
    </Card>
  );

  switch (variant) {
    case 'link':
      return (
        <Link
          to={
            noRightQuestions !== undefined
              ? `/history/list-question/${listId}${order ? '/' + order : ''}`
              : `/list-question/${id}`
          }>
          {main}
        </Link>
      );

    default:
      return main;
  }
};

export default ListHistoryItem;
