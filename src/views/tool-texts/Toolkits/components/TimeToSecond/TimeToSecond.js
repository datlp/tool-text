import React from 'react';
import { ListItem, TextField, Button } from '@material-ui/core';
import { splitByEnter, convertTextToTime } from 'utils/text';

const TimeToSecond = props => {
  const { input, onSetOutPut = () => null } = props;

  return (
    <React.Fragment>
      <ListItem>
        <TextField
          style={{ marginLeft: 16 }}
          id="endText"
          placeholder="Enter end text each lines..."></TextField>
      </ListItem>
      <ListItem>
        <Button
          onClick={() => {
            onSetOutPut(
              splitByEnter(input)
                .map(item => {
                  return `${convertTextToTime(item)}\n`;
                })
                .join('')
            );
          }}>
          Excute
        </Button>
      </ListItem>
    </React.Fragment>
  );
};
export default TimeToSecond;
