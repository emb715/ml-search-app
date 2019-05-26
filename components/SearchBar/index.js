import React, { useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import cleanHtmlString from '../../utils/helpers';
import styles from '../../styles/searchBar.scss';

const Search = ({ searchQuery }) => {
  const [searchInput, setSearchInput] = useState(searchQuery);

  const onSearchInput = (e) => {
    const input = e.target.value;
    setSearchInput(input);
  };

  const validateFields = () => {
    if (searchInput !== '') {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    const searchInputClean = cleanHtmlString(searchInput);
    const url = `/items?search=${searchInputClean}`;
    Router.push(url);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // check form input content
    const isValid = validateFields();
    if (isValid) {
      handleSubmit();
    }
  };
  return (
    <>
      <form className={styles.search} onSubmit={onSubmit}>
        <input
          type="text"
          className={styles.search__input}
          value={searchInput}
          onChange={onSearchInput}
          placeholder="Nunca dejes de buscar"
        />
        <button type="submit" className={styles.search__button}>Search</button>
      </form>
    </>
  );
};

Search.propTypes = {
  searchQuery: PropTypes.string,
};

Search.defaultProps = {
  searchQuery: '',
};

export default Search;
