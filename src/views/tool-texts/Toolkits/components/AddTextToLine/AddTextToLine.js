import React from 'react';
import { ListItem, Button, TextField } from '@material-ui/core';
import { splitByEnter } from 'utils/text';

const AddTextToLine = props => {
  const { input, onSetOutPut = () => null } = props;

  return (
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
                  `${document.getElementById('startText').value}${item}${
                    document.getElementById('endText').value
                  }`
              )
              .join('\n');

            onSetOutPut(formated);
          }}>
          Excute
        </Button>
      </ListItem>
    </React.Fragment>
  );
};

export default AddTextToLine;
