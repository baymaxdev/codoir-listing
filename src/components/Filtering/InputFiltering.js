import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

const InputFiltering = ({ style, name, onChangeHandler, value }) => {
  return (
    <Input
      name={name}
      style={style}
      autoFocus
      onChange={onChangeHandler}
      value={value}
      disableUnderline
    />
  );
};

InputFiltering.propTypes = {
  style: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

InputFiltering.defaultProps = {
  style: {
    background: '#083749',
    color: '#fff',
    borderRadius: 8,
    padding: 2
  }
};

export default InputFiltering;
