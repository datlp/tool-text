import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Page } from 'components';
import {
  TextField,
  Grid,
  Divider,
  Button,
  Card,
  CardContent,
  CardActions,
  ListItem,
  ListItemText
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import useDebounce from 'utils/useDebounce';
import useRouter from 'utils/useRouter';
import RemoveDublicateRight from './components/RemoveDublicateRight/RemoveDublicateRight';
import ChangeAliasRight from './components/ChangeAliasRight';
import TimeToSecond from './components/TimeToSecond';
import { splitByEnter, change_alias } from 'utils/text';
import CloneEachLines from './components/CloneEachLines';
import AddTextToLine from './components/AddTextToLine';
import { TOOL_TEXTS_CONST } from 'constant';
import About, { Regex } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    padding: theme.spacing(1)
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
  quizs: { height: 'calc(100vh - 64px)', marginTop: 64 },
  QuizItem: {
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

const Toolkits = () => {
  const router = useRouter();
  const classes = useStyles();

  const pageTitle = 'Toolkits';
  const [copied, setCopied] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const ref = useRef();

  function handleCopyToClipboard() {
    /* Get the text field */
    var copyText = document.getElementById('output-text');

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand('copy');

    setCopied(true);
  }

  const setInputData = useDebounce(async data => {
    setInput(data);
  }, 200);

  if (router.location.pathname === '/' || router.location.pathname === '/about')
    return <About />;
  const route = Object.keys(TOOL_TEXTS_CONST)
    .map(key => ({
      label: TOOL_TEXTS_CONST[key].label,
      pathname: '/' + change_alias(TOOL_TEXTS_CONST[key].label)
    }))
    .filter(i => i.pathname === router.location.pathname);

  const render = () => {
    if (route.length === 0) return <About />;

    switch (route[0].pathname) {
      case `/${change_alias(TOOL_TEXTS_CONST.ADD_TEXT_EACH_LINES.label)}`:
        return (
          <AddTextToLine
            pathname={router.location.pathname}
            input={input}
            onSetOutPut={data => setOutput(data)}
          />
        );

      case `/${change_alias(TOOL_TEXTS_CONST.CHANGE_ALIAS.label)}`:
        return (
          <ChangeAliasRight
            pathname={router.location.pathname}
            input={input}
            onSetOutPut={data => setOutput(data)}
          />
        );

      case `/${change_alias(TOOL_TEXTS_CONST.CLONE_EACH_LINES.label)}`:
        return (
          <CloneEachLines
            pathname={router.location.pathname}
            input={input}
            onSetOutPut={data => setOutput(data)}
          />
        );

      case `/${change_alias(TOOL_TEXTS_CONST.REMOVE_DUBLICATE_LINES.label)}`:
        return (
          <RemoveDublicateRight
            pathname={router.location.pathname}
            input={input}
            onSetOutPut={data => setOutput(data)}
          />
        );

      case `/${change_alias(TOOL_TEXTS_CONST.TIME_STRING_TO_SECOND.label)}`:
        return (
          <TimeToSecond
            pathname={router.location.pathname}
            input={input}
            onSetOutPut={data => setOutput(data)}
          />
        );

      case `/${change_alias(TOOL_TEXTS_CONST.REGEX.label)}`:
        return (
          <Regex
            pathname={router.location.pathname}
            input={input}
            onSetOutPut={data => setOutput(data)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Page
      className={classes.root}
      title={(route.length > 0 && route[0].label) || pageTitle}>
      <Grid container>
        <Grid item sm={12} md={8} lg={8}>
          <Card>
            <CardContent>
              <TextField
                ref={ref}
                autoFocus
                onChange={({ target: { value } }) => {
                  copied && setCopied(false);
                  setInputData(value);
                }}
                placeholder="Some text, it will process..."
                style={{ width: '100%' }}
                width={'100%'}
                id="input-text"
                multiline
                rowsMax={15}
                rows={30}
              />
            </CardContent>
          </Card>
          <Divider style={{ marginTop: 16 }}></Divider>
          <Card style={{ marginTop: 16 }}>
            <CardContent>
              <TextField
                onChange={({ target: { value } }) => {
                  copied && setCopied(false);
                  setOutput(value);
                }}
                style={{ width: '100%' }}
                id="output-text"
                multiline
                placeholder="Output will show here...."
                rowsMax={15}
                rows={30}
                value={output}
              />
            </CardContent>

            <CardActions>
              <Grid container justify="flex-end">
                <Button
                  startIcon={
                    !copied ? <FileCopyIcon></FileCopyIcon> : <DoneIcon />
                  }
                  color="primary"
                  onClick={handleCopyToClipboard}>
                  {!copied ? `Copy to clipboard` : 'Saved clipboard'}
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <ListItem>
            <Divider spacing={2} />
            <ListItemText primary="Input" />
          </ListItem>
          <ListItem>
            <Divider spacing={2} />

            <ListItemText style={{ marginLeft: 8 }} primary="Count" />
          </ListItem>
          <ListItem>
            <ListItemText
              style={{ marginLeft: 16 }}
              primary="Characters"
              secondary={input.length}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              style={{ marginLeft: 16 }}
              primary="Lines"
              secondary={splitByEnter(input).length}
            />
          </ListItem>
          <ListItem>
            <Divider spacing={2} />

            <ListItemText style={{ marginLeft: 8 }} primary="Options" />
          </ListItem>

          {render()}
        </Grid>
      </Grid>
    </Page>
  );
};

export default Toolkits;
