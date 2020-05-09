import React from 'react'
import Img from 'gatsby-image'

import { PurchaseLink, PurchaseAltButton } from './Button'

/**
 * BookList component
 * @param {Object} props
 * @param {Array.<{title: string; description: string; meta: string; url: string; imageFile: object; imageAlt: string; altLabel?: string }>} props.items
 */
const BookList = ({ items }) => (
  <ul className="book-list">
    {
      items.map(item => (
        <li key={item.title} className="box">
          <article className="book-article">
            <Img className="book-image" fixed={item.imageFile} alt={item.imageAlt} />
            <div className="book-content">
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
            {
              item.url ?
                <PurchaseLink className="is-fullwidth" color="primary" url={item.url} size="small" />
                  : <PurchaseAltButton label={item.altLabel} className="is-fullwidth" color="dark" size="small" />
            }
          </nav>
        </li>
      ))
    }
  </ul>
)

export default BookList
