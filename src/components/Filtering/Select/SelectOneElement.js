import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

import {
  StyledSelectOneElement,
  StyledRadio,
  StyledMenuItem,
  StyledListItemText,
  SelectMenuProps,
  MenuItemStyles
} from './styles';

const handleOnClickCheckbox = (handleOnChange, setSelected) => e => {
  setSelected(e.target.value);

  handleOnChange(e);
};

const SelectOneElement = ({ name, options, styles, onChangeHandler }) => {
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(true);

  return (
    <StyledSelectOneElement
      MenuProps={SelectMenuProps}
      value={selected}
      input={<Input id='select-radio' />}
      className='dropdown-remove-border min-width-same-with-th'
      onChange={handleOnClickCheckbox(onChangeHandler, setSelected)}
      style={styles}
      renderValue={() => selected}
      name={name}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      {options.map(option => (
        <StyledMenuItem key={option} value={option} style={MenuItemStyles}>
          <StyledRadio
            checked={selected === option}
            name='name'
            aria-label={option}
          />

          <StyledListItemText primary={option} />
        </StyledMenuItem>
      ))}
    </StyledSelectOneElement>
  );
};

SelectOneElement.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  styles: PropTypes.object,
  onChangeHandler: PropTypes.func.isRequired
};

export default SelectOneElement;
