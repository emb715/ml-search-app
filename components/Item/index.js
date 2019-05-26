/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../../styles/item.scss';

const Item = ({ item, gutter, link, showThumbnail }) => {
  const hasGutter = gutter ? styles['item--gutter'] : '';
  const hasLink = link ? styles['item--link'] : '';

  const {
    id, thumbnail, title, price, condition, free_shipping, seller_address,
  } = item || {};
  const itemImage = thumbnail;
  const { amount } = price || {};
  const priceFormated = new Intl.NumberFormat('es-AR', { maximumSignificantDigits: 3 }).format(amount);
  const hasFreeShipping = free_shipping && (
    <div className={styles.item__shipping}>
      <img src="static/img/ic_shipping.png" alt="Envio gratuito" />
    </div>
  );
  const { state: { name: address } } = seller_address || {};
  return (
    <div id={`item-${id}`} className={classnames([styles.item, hasGutter, hasLink])}>
      <div className={styles.item__picture}>
        <img src={itemImage} alt={title} />
      </div>

      <div className={styles.item__info}>

        <div className={styles.item__heading}>
          <div className={styles.item__price}>
            {`$ ${priceFormated}`}
          </div>
          {hasFreeShipping}
        </div>

        <div className={styles.item__title}>
          {title}
        </div>
        <div className={styles.item__title}>
          {condition}
        </div>
      </div>

      <div className={styles.item__meta}>
        <div className={styles.item__address}>
          {address}
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.shape({
      amount: PropTypes.number.isRequired,
    }).isRequired,
    picture: PropTypes.string,
    thumbnail: PropTypes.string,
    condition: PropTypes.string.isRequired,
    free_shipping: PropTypes.bool.isRequired,
  }).isRequired,
  gutter: PropTypes.bool,
  link: PropTypes.bool,
};

Item.defaultProps = {
  gutter: true,
  link: false,
  picture: '',
  thumbnail: '',
};

export default Item;
