import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withIsMobile from './withIsMobile';
import Header from '../Header';
import styles from '../../styles/layout.scss';

const Layout = ({
  children, isMobile, withHeader, searchQuery, gutter,
}) => {
  const hasMobileClass = isMobile ? 'isMobile' : '';
  const hasGutter = gutter ? styles['content--gutter'] : '';
  return (
    <>
      {withHeader && <Header searchQuery={searchQuery} />}
      <main className={classnames([styles.content, hasGutter])}>
        <div className={classnames([styles.wrapper])}>
          {children}
        </div>
      </main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isMobile: PropTypes.bool.isRequired,
  withHeader: PropTypes.bool,
  searchQuery: PropTypes.string,
  gutter: PropTypes.bool,
};

Layout.defaultProps = {
  withHeader: true,
  searchQuery: '',
  gutter: false,
};

export default withIsMobile(Layout);
