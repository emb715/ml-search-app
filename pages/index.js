import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Head from 'next/head';
import Layout from '../components/HOC/Layout';
import styles from '../styles/index.scss';

const Index = () => (
  <>
    <Head>
      <title key="title">Search App</title>
      <meta name="description" content="Website description, search app" key="description" />
      <meta name="keywords" content="website, search app, search, items, description, keywords" key="keywords" />
    </Head>
    <Layout gutter>
      <div className={styles.wrapper}>
        <div className={styles.message}>Search App</div>
      </div>
    </Layout>
  </>
);

Index.propTypes = {};
Index.defaultProps = {};

export default Index;
