import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { Search } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  search: {
    flexGrow: 1,
    flexBasis: 480
  },
  filterButton: {
    marginLeft: 'auto'
  },
  filterIcon: {
    marginRight: theme.spacing(1)
  }
}));

const SearchBar = props => {
  const { onSearch } = props;

  const classes = useStyles();

  return <Search className={classes.search} onSearch={onSearch} />;
};

SearchBar.propTypes = {
  className: PropTypes.string,
  onFilter: PropTypes.func,
  onSearch: PropTypes.func
};

export default SearchBar;
