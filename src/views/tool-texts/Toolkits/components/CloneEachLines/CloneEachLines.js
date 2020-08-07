import React from 'react';
import { ListItem, Button, TextField } from '@material-ui/core';
import { splitByEnter } from 'utils/text';

const CloneEachLines = props => {
  const { input, onSetOutPut = () => null } = props;

  return (
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

            onSetOutPut(formated);
          }}>
          Excute
        </Button>
      </ListItem>
    </React.Fragment>
  );
};

export default CloneEachLines;
