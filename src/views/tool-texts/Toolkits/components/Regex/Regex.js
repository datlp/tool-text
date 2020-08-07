import React from 'react';
import { ListItem, TextField, Button } from '@material-ui/core';
import { splitByEnter } from 'utils/text';

const Regex = props => {
  const { input, onSetOutPut = () => null } = props;

  return (
    <React.Fragment>
      <ListItem>
        <TextField
          style={{ marginLeft: 16 }}
          id="regex-text"
          placeholder="Your regex..."
        />
        <TextField
          style={{ marginLeft: 16 }}
          id="replace-text"
          placeholder="Replace by..."
        />
      </ListItem>
      <ListItem>
        <Button
          onClick={() => {
            const regex = new RegExp(
              document.getElementById('regex-text').value,
              'g'
            );
            // const replace = document.getElementById('replace-text').value;
            onSetOutPut(
              splitByEnter(input)
                .map(item => {
                  return item.match(regex) && item.match(regex).length + '\n';
                })
                .join('')
            );
          }}>
          Count
        </Button>
      </ListItem>
    </React.Fragment>
  );
};
export default Regex;
