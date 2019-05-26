import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Query, graphql } from 'react-apollo';
import uuid from 'uuid/v4';
import Link from 'next/link';
import Item from '../Item';
import styles from '../../styles/items.scss';

const renderItems = items => items.map(item => (
  <Link key={item.id} prefetch href={`/items?slug=${item.id}`} as={`/items/${item.id}`}>
    <a><Item item={item} link /></a>
  </Link>
));

const renderData = ({ categories, items }) => {
  const breadcrum = categories && (
    <ul>
      {categories.map((category) => {
        const id = uuid();
        return (<li key={id}>{`${category}`}</li>);
      })}
    </ul>
  );
  return (
    <div className={styles.items}>
      <div className={styles.breadcrum}>{breadcrum}</div>
      <div className={styles.items__list}>
        {renderItems(items)}
      </div>
    </div>
  );
};

renderData.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const SearchResults = ({ searchQuery }) => {
  if (!searchQuery) {
    return null;
  }
  return (
    <Query
      query={gql`
        query search($query: String!) {
          search(query: $query) {
            query
            author {
              name
              lastname
            }
            categories 
            items {
              id
              title
              price {
                currency
                amount
                decimals
              }
              thumbnail
              condition
              free_shipping
              seller_address
            }
          }
        }
      `}
      variables={{ query: searchQuery }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        const { search } = data || {};
        return renderData(search);
      }}
    </Query>
  );
}

SearchResults.propTypes = {
  searchQuery: PropTypes.string,
};
SearchResults.defaultProps = {
  searchQuery: ''
};

export default SearchResults;
