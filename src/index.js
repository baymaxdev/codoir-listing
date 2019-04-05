import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { FilteringTh, SelectCheckboxes, InputFiltering } from './components/Filtering';
import SortingTd from './components/SortingTd';
import filterIcon from './images/filter.png';
import SingleRow from './components/SingleRow';
import PlaceholderRow from './components/PlaceholderRow';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress } from "@material-ui/core";
import Footer from './components/Footer';

const placeholders = new Array(20).fill('');

const CodoirTable = ({
  data,
  getData,
  sector,
  selectedIndexes,
  setSelectedIndexes,
  filteringParam,
  setFilteringParam,
  sortingParam,
  setSortingParam,
  filtersVisibility,
  setFiltersVisibility,
  headers,
  navigateToDetails
}) => {
  const [loading, setLoading] = useState(true);
  const prevRef = useRef();

  useEffect(() => {
    prevRef.current = {
      source: data.source,
      sector
    };

    const backFrom = localStorage.getItem('backFrom');
    if (backFrom) {
      const sp = JSON.parse(localStorage.getItem('sortingParam'));
      const fp = JSON.parse(localStorage.getItem('filteringParam'));
      const fv = JSON.parse(localStorage.getItem('filtersVisibility'));
      setSortingParam(sp);
      setFilteringParam(fp);
      setFiltersVisibility(fv);
      localStorage.removeItem('backFrom');
      if (backFrom === 'create') {
        getData(1, sp, fp);
      } else {
        setLoading(false);
      }
    } else {
      getData(1, sortingParam, filteringParam);
    }
  }, []);

  const genetareSelectedIndexesAll = (value = !selectedIndexes[0]) =>
    Array.from({ length: data.count }, () => value);

  if (prevRef.current) {
    if (prevRef.current.source !== data.source && (data.source.length || !data.hasMore)) {
      prevRef.current = {
        ...prevRef.current,
        source: data.source
      };
      if (data.count !== selectedIndexes.length) {
        setSelectedIndexes(genetareSelectedIndexesAll(false));
      }
      setLoading(false);
    }
  
    if (prevRef.current.sector !== sector) {
      setLoading(true);
      prevRef.current = {
        ...prevRef.current,
        sector
      };
      getData(1, sortingParam, filteringParam);
    }
  }

  const setFilters = e => {
    setLoading(true);
    const newFilteringParam = { ...filteringParam, [e.target.name]: e.target.value };
    setFilteringParam(newFilteringParam);
    getData(1, sortingParam, newFilteringParam);
  };

  const changeFiltersVisibilityProperty = name => () => {
    const filtersVisibilityWithoutEmpty = Object.keys(filtersVisibility)
      .filter(n => n !== name)
      .map(n => ({ [n]: filteringParam[n].length ? true : false }))
      .reduce((acc, v) => ({
        ...acc,
        [Object.keys(v)[0]]: v[Object.keys(v)[0]]
      }));

    setFiltersVisibility({
      ...filtersVisibilityWithoutEmpty,
      [name]: !filtersVisibility[name]
    });
  };

  const cleanUpIfEmpty = name => e => {
    if (undefined === e.target.value) {
      e.target.value = name === 'situation' || name === 'status' || name === 'eid' ? [] : '';
      e.target.name = name;
    }

    if (!e.target.value.length) {
      changeFiltersVisibilityProperty(name)();
    }

    setFilters(e);
  };

  const onSort = (fieldName, direction) => {
    setLoading(true);
    const sp = {[fieldName]: direction};
    setSortingParam(sp);
    getData(1, sp, filteringParam);
  };

  const goToDetails = (index) => () => {
    localStorage.setItem("sortingParam", JSON.stringify(sortingParam));
    localStorage.setItem("filteringParam", JSON.stringify(filteringParam));
    localStorage.setItem("filtersVisibility", JSON.stringify(filtersVisibility));
    navigateToDetails(index);
  }

  const loadResources = () => {
    if (!data.fetching) {
      getData(data.page, sortingParam, filteringParam);
    }
  }
  
  const handleSelectResource = (
    index,
  ) => event => {
    event.stopPropagation();
    const _ = [...selectedIndexes];
    _[index] = !_[index];
  
    setSelectedIndexes(_);
  };
  
  const isSelectedAll = () => {
    if (!selectedIndexes.length) {
      return false;
    }
    return selectedIndexes.length === selectedIndexes.filter(Boolean).length;
  }

  const handleSelectedCheckAll = () =>
    setSelectedIndexes(genetareSelectedIndexesAll());

  return (
    <div className={loading ? 'table loading' : 'table'}>
      <InfiniteScroll
        pageStart={1}
        loadMore={loadResources}
        hasMore={data.hasMore}
        loader={
          !loading &&
          <div
            key="loader"
            className="loading-spinner"
          >
            <CircularProgress
              color="primary"
              size={20}
            />
          </div>
        }
        style={{
          overflow: 'auto'
        }}
      >
        <table>
          <tbody>
            <tr>
              <th className='headerCheckbox' />
              {
                headers.map((header, index) => (
                  <FilteringTh
                    key={index.toString()}
                    className={header.className}
                    imgSrc={filterIcon}
                    filterVisible={filtersVisibility[header.name]}
                    changeFilterVisible={changeFiltersVisibilityProperty(header.name)}
                    onCloseInput={cleanUpIfEmpty(header.name)}
                  >
                    {
                      header.type === 'input' &&
                      <InputFiltering
                        name={header.name}
                        value={filteringParam[header.name]}
                        onChangeHandler={cleanUpIfEmpty(header.name)}
                      />
                    }
                    {
                      header.type === 'select' &&
                      <SelectCheckboxes
                        name={header.name}
                        value={filteringParam[header.name]}
                        options={header.options}
                        styles={{ width: 60 }}
                        onChangeHandler={cleanUpIfEmpty(header.name)}
                        // renderValueFn={selectedTextLimit(1)}
                        opened={header.name === 'situation'}
                      />
                    }
                  </FilteringTh>
                ))
              }
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className='headerCheckbox'>
                <button
                  className={
                    isSelectedAll() ? 'selected' : 'unselected'
                  }
                  onClick={handleSelectedCheckAll}
                >
                  {isSelectedAll() && (
                    <img
                      src={require('./images/check.png')}
                      className='check'
                      alt=''
                    />
                  )}
                </button>
              </td>
              {
                headers.map((header, index) => (
                  <SortingTd
                    key={index.toString()}
                    title={header.title}
                    name={header.name}
                    className={header.className}
                    sortingParam={sortingParam}
                    onClickHandler={onSort}
                  />
                ))
              }
            </tr>
          </tbody>
          {loading
            ? placeholders.map((_, index) => (
                <PlaceholderRow key={index.toString()} />
              ))
            : data.source.length ?
              data.source.map((rs, index) => (
                <SingleRow
                  data={rs}
                  key={index.toString()}
                  selected={selectedIndexes[index]}
                  onCheck={handleSelectResource(index)}
                  onClick={goToDetails(index)}
                />
              ))
              : <div className="no-data">No Data</div>
            }
        </table>
      </InfiniteScroll>
      <Footer
        selectedCount={
          isSelectedAll()
            ? data.count
            : selectedIndexes.filter(Boolean).length
        }
        totalCount={data.count || 0}
      />
    </div>
  );
};

CodoirTable.propTypes = {
  data: PropTypes.object,
  sector: PropTypes.object
};

export default CodoirTable;
