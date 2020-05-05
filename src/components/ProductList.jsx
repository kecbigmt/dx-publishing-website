import React from 'react'
import { Link } from 'gatsby'

import ListThumbnail from './ListThumbnail'

/**
 * @param {Object} props
 * @param {Array.<{ title: string: description: string: to: string: imageFile: object: imageAlt: string}>} props.items
 */
const ProductList = ({ items }) => (
  <ul className="box product-list">
    {
      items.map(item => (
        <li key={item.to} className="media">
          <Link className="is-flex" to={item.to}>
            {
              item.imageFile &&
                <ListThumbnail
                  fixed={item.imageFile}
                  alt={item.imageAlt}
                  className="media-left"
                />
            }
            <div className="media-content">
              <p className="is-size-5 has-text-weight-semibold">{item.title}</p>
              <p className="is-size-6 has-text-grey">{item.description}</p>
            </div>
          </Link>
        </li>
      ))
    }
  </ul>
)

export default ProductList