/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import uuid from 'uuid/v4';
import Head from 'next/head';
import styles from '../../styles/itemDetail.scss';

const handleBuyButton = (e) => {
  // Buy button
  e.preventDefault();
};

const renderData = ({ categories, item}) => {
  const breadcrum = categories && (
    <ul>
      {categories.map((category) => {
        const id = uuid();
        return (<li key={id}>{`${category}`}</li>);
      })}
    </ul>
  );
  const {
    title, picture, condition, sold_quantity, price, description,
  } = item || {};
  const { amount, decimals } = price || {};
  const priceFormated = new Intl.NumberFormat('es-AR', { maximumSignificantDigits: 3 }).format(amount);
  const pageKeywords = categories.join(',');
  const pageDescription = description.slice(0, 255);
  return (
    <>
      <Head>
        <title key="title">{`Item - ${title}`}</title>
        <meta name="description" content={pageDescription} key="description" />
        <meta name="keywords" content={pageKeywords} key="keywords" />
      </Head>
      <div className={styles.breadcrum}>{breadcrum}</div>
      <div className={styles.detail}>
        <div className={styles.detail__header}>
          <div className={styles.detail__picture}>
            <img src={picture} alt={title} key={picture} />
          </div>
          <div className={styles.detail__info}>
            <div className={styles.detail__subtitle}>{`${condition} - ${sold_quantity} vendidos`}</div>
            <h1 className={styles.detail__title}>{title}</h1>
            <div className={styles.detail__price}>
              {`$ ${priceFormated}`}
              <sup className={styles.decimals}>
                {decimals}
              </sup>
            </div>
            <button type="button" className={styles.detail__button} onClick={handleBuyButton}>
              Comprar
            </button>
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.description__title}>Descripción del producto</div>
          <div className={styles.description__text}>
            {description}
          </div>
        </div>
      </div>
    </>
  );
};

const ItemWrapper = ({ slug }) => (
  <Query
    query={gql`
      query getItem($id: String!) {
        getItem(id: $id) {
          author {
            name
            lastname
          }
          categories
          item {
            id
            title
            price {
              currency
              amount
              decimals
            }
            picture
            condition
            free_shipping
            description
            sold_quantity
          }
        }
      }
    `}
    variables={{ id: slug }}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      const { getItem } = data || {};
      return renderData(getItem);
    }}
  </Query>
);

ItemWrapper.propTypes = {
  slug: PropTypes.string.isRequired,
};
ItemWrapper.defaultProps = {};

export default ItemWrapper;
