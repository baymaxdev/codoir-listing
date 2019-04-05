import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

import { selectedTextLimit } from '../../../utils';
import {
  StyledSelect,
  StyledCheckbox,
  StyledMenuItem,
  StyledListItemText,
  SelectMenuProps,
  MenuItemStyles,
  CheckBoxStyles
} from './styles';

const SelectCheckboxes = ({
  name,
  options,
  styles,
  onChangeHandler,
  renderValueFn = selectedTextLimit(2),
  value,
  opened = true
}) => {
  const [open, setOpen] = useState(opened);

  return (
    <StyledSelect
      MenuProps={SelectMenuProps}
      multiple
      value={value}
      input={<Input id='select-multiple-checkbox' />}
      className='dropdown-remove-border min-width-same-with-th'
      onChange={onChangeHandler}
      renderValue={renderValueFn}
      style={styles}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      name={name}
    >
      {options.map(option => (
        <StyledMenuItem key={option} value={option} style={MenuItemStyles}>
          <StyledCheckbox
            checked={value.includes(option)}
            style={CheckBoxStyles}
          />

          <StyledListItemText primary={option} />
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
};

SelectCheckboxes.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  styles: PropTypes.object,
  onChangeHandler: PropTypes.func.isRequired,
  renderValueFn: PropTypes.func,
  value: PropTypes.array.isRequired,
  opened: PropTypes.bool
};

export default SelectCheckboxes;
