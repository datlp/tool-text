import React from 'react';
import { ListItem, Button } from '@material-ui/core';
import { splitByEnter, change_alias } from 'utils/text';

const ChangeAliasRight = props => {
  const { input, onSetOutPut = () => null } = props;

  return (
    <React.Fragment>
      <ListItem>
        <Button
          onClick={() => {
            onSetOutPut(
              splitByEnter(input)
                .map(i => change_alias(i))
                .join('\n')
            );
          }}>
          Excute
        </Button>
      </ListItem>
    </React.Fragment>
  );
};

export default ChangeAliasRight;
