/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout from '../components/HOC/Layout';
import ItemDetail from '../components/ItemDetail';
import SearchResults from '../components/SearchResults';

const Items = ({ slug, search }) => {
  // item detail
  if (slug) {
    return (
      <Layout searchQuery={search}>
        <ItemDetail slug={slug} />
      </Layout>
    );
  }
  // search result
  return (
    <Layout searchQuery={search}>
      <Head>
        <title>{`Search results for: ${search}`}</title>
      </Head>
      <SearchResults searchQuery={search} />
    </Layout>
  );
};

Items.propTypes = {
  search: PropTypes.string,
  slug: PropTypes.string,
};
Items.defaultProps = {
  search: '',
  slug: null,
};

Items.getInitialProps = async ({ query }) => {
  const { search, slug } = query || {};
  return {
    search,
    slug,
  };
};

export default Items;
