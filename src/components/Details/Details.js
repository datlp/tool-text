import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import Editor from '../Editor/Editor';

const WritingDetails = props => {
  const { className, onChange = () => {}, placeholder } = props;

  return (
    <Grid className={className}>
      <Editor
        className={clsx(className)}
        placeholder={placeholder}
        onChange={essay => {
          onChange(essay);
        }}
      />
    </Grid>
  );
};

WritingDetails.propTypes = {
  className: PropTypes.string
};

export default WritingDetails;
