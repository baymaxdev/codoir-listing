import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core';

const selectStyles = {
  root: {
    background: '#003a4a',
    color: '#fff !important',
    borderRadius: 6,
    fontWeight: 600,
    fontSize: 12
  },
  selectMenu: {
    radius: 15,
    boxShadow: 'none !important'
  },
  icon: {
    fill: '#fff'
  }
};

export const StyledSelect = withStyles(selectStyles)(Select);

export const StyledCheckbox = withStyles({
  root: { color: '#fff !important' },
  checked: {
    color: '#fff !important'
  }
})(Checkbox);

export const StyledMenuItem = withStyles({})(MenuItem);

export const StyledListItemText = withStyles({
  primary: {
    fontWeight: 600,
    fontSize: '12px !important',
    lineHeight: '10px !important',
    color: 'white !important'
  },
  secondary: {
    fontWeight: 600,
    color: 'white !important'
  }
})(ListItemText);

export const SelectMenuProps = {
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  PaperProps: {
    style: {
      boxShadow: 'none',
      borderRadius: 8
    }
  },

  MenuListProps: {
    style: {
      background: '#003a4a'
    }
  }
};

export const MenuItemStyles = {
  background: '#003a4a',
  paddingTop: '3px',
  paddingBottom: '3px'
};

export const CheckBoxStyles = {
  paddingLeft: '3px',
  paddingRight: '3px'
};

export const StyledRadio = withStyles({
  root: {
    color: 'white'
  },
  checked: {
    color: 'white !important'
  }
})(Radio);

export const StyledSelectOneElement = withStyles({
  ...selectStyles,
  root: { ...selectStyles.root }
})(Select);
