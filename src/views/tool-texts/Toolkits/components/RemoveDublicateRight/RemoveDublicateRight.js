import React from 'react';
import { ListItem, Button } from '@material-ui/core';
import { splitByEnter } from 'utils/text';

const RemoveDublicateRight = props => {
  const { input, onSetOutPut = () => null } = props;

  return (
    <React.Fragment>
      <ListItem>
        <Button
          onClick={() => {
            const arr = splitByEnter(input);
            let unique = [];
            arr.forEach(item => {
              if (item && unique.indexOf(item) === -1) unique.push(item);
            });

            onSetOutPut(unique.join('\n'));
          }}>
          Excute
        </Button>
      </ListItem>
    </React.Fragment>
  );
};

export default RemoveDublicateRight;
