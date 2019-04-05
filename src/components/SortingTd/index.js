import React from 'react';
import PropTypes from 'prop-types';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const handleOnClick = (name, direction, handler) => () => {
  const changingDirection = direction === 1 ? -1 : 1;
  handler(name, changingDirection);
};

const SortingTd = ({ title, name, className, sortingParam, onClickHandler }) => {
  const direction = sortingParam[name];

  return (
    <td
      className={`header ${className}`}
      onClick={handleOnClick(name, direction, onClickHandler)}
      style={{ cursor: 'pointer' }}
    >
      <div
        className='headerStyling'
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative'
        }}
      >
        <div>{title}</div>
        <div style={{ position: 'absolute', right: 0 }}>
          {
            direction === 1
              ? <ArrowDropUp /> 
              : direction === -1
                ? <ArrowDropDown />
                : null
          }
        </div>
      </div>
    </td>
  );
};

SortingTd.propTypes = {
  className: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func
};

export default SortingTd;
