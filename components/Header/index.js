/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import SearchBar from '../SearchBar';
import styles from '../../styles/header.scss';

const Header = ({ searchQuery }) => (
  <header className={styles.header}>
    <div className={styles.wrapper}>
      <div className={styles.header__logo}>
        <Link href="/">
          <a>
            <img
              src="/static/img/Logo_ML.png"
              alt="Mercado Libre"
              srcSet="/static/img/Logo_ML@2x.png 2x"
              className={styles.logo_ML}
            />
          </a>
        </Link>
      </div>
      <div className={styles.header__search}>
        <SearchBar searchQuery={searchQuery} />
      </div>
    </div>
  </header>
);

Header.propTypes = {
  searchQuery: PropTypes.string,
};

Header.defaultProps = {
  searchQuery: '',
};

export default Header;
