import React from 'react'
import Img from 'gatsby-image'

import { PurchaseLink } from './Button'

/**
 * BookList component
 * @param {Object} props
 * @param {Array.<{title: string; description: string; meta: string; url: string; imageFile: object; imageAlt: string }>} props.items
 */
const BookList = ({ items }) => (
  <ul className="book-list">
    {
      items.map(item => (
        <li key={item.title} className="box">
          <article className="media">
            <Img className="media-left" fixed={item.imageFile} alt={item.imageAlt} />
            <div className="media-content">
              <div className="content">
                <p className="book-title">
                  <strong>{item.title}</strong>
                </p>
                <div className="content is-size-7" dangerouslySetInnerHTML={{ __html: item.description }} />
                <p className="is-size-7 has-text-grey">
                  {item.meta}
                </p>
              </div>
            </div>
          </article>
          <nav>
            <PurchaseLink className="is-fullwidth" color="primary" url={item.url} size="small" />
          </nav>
        </li>
      ))
    }
  </ul>
)

export default BookList
