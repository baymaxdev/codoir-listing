import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';

const FilteringTh = ({
  className,
  imgSrc,
  filterVisible,
  changeFilterVisible,
  onCloseInput,
  children
}) => {
  if (!filterVisible) {
    return (
      <th className={`header ${className}`}>
        <img
          src={imgSrc}
          alt={className}
          style={{ cursor: 'pointer' }}
          onClick={changeFilterVisible}
        />
      </th>
    );
  }

  return (
    <th
      className={`header ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'relative'
      }}
    >
      {children}
      <CloseIcon onClick={onCloseInput} style={{ cursor: 'pointer' }} />
    </th>
  );
};

FilteringTh.propTypes = {
  className: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  filterVisible: PropTypes.bool.isRequired,
  changeFilterVisible: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
};

export default FilteringTh;
