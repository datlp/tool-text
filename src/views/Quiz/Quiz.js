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

function splitByEnter(text) {
  return (text && typeof text === 'string' && text.split(/\n/)) || [];
}

const Quiz = () => {
  const router = useRouter();
  const classes = useStyles();
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

  return (
    <Page className={classes.root} title={'Toolkits'}>
      <Grid container>
        <Grid sm={12} md={8} lg={8}>
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
            <CardActions>
              <Grid container justify="flex-end">
                <Button
                  disable={Boolean(input)}
                  color="secondary"
                  onClick={handleCopyToClipboard}>
                  Clear data
                </Button>
              </Grid>
            </CardActions>
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
        <Grid sm={12} md={4} lg={4}>
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

          {/*  */}

          {router.location.pathname === '/add-text-to-line' && (
            <React.Fragment>
              <ListItem>
                <TextField
                  style={{ marginLeft: 16 }}
                  id="startText"
                  placeholder="Enter start text each lines..."></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  style={{ marginLeft: 16 }}
                  id="endText"
                  placeholder="Enter end text each lines..."></TextField>
              </ListItem>
              <ListItem>
                <Button
                  onClick={() => {
                    const formated = splitByEnter(input)
                      .map(
                        item =>
                          `${
                            document.getElementById('startText').value
                          }${item}${document.getElementById('endText').value}`
                      )
                      .join('\n');

                    console.log('formated', formated);
                    setOutput(formated);
                  }}>
                  Excute
                </Button>
              </ListItem>
            </React.Fragment>
          )}
          {router.location.pathname === '/clone-each-line' && (
            <React.Fragment>
              <ListItem>
                <TextField
                  style={{ marginLeft: 16 }}
                  type="number"
                  id="Clone-line-number"
                  placeholder="Clone line number..."></TextField>
              </ListItem>

              <ListItem>
                <Button
                  onClick={() => {
                    const formated = splitByEnter(input)
                      .map(
                        item =>
                          `${Array(
                            parseInt(
                              document.getElementById('Clone-line-number').value
                            ) || 0
                          )
                            .fill(item)
                            .join('\n')}`
                      )
                      .join('\n');

                    console.log('formated', formated);
                    setOutput(formated);
                  }}>
                  Excute
                </Button>
              </ListItem>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </Page>
  );
};
export default Quiz;
