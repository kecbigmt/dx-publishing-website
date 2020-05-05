import React from 'react'
import { Link } from 'gatsby'

import ListThumbnail from './ListThumbnail'

/**
 * @param {Object} props
 * @param {Array.<{ title: string: excerpt: string: date: string; to: string: imageFile: object: imageAlt: string}>} props.items
 */
const ArticleList = ({ items }) => (
  <ul className="box article-list">
    {
      items.map(item => {
        const dt = item.date && new Date(item.date)
        return (
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
                <p className="article-title is-size-5 has-text-weight-semibold">{item.title}</p>
                <p className="article-excerpt is-size-6 has-text-grey">
                  {
                    item.date && 
                      <><time dateTime={dt.toISOString()}>{dt.toLocaleDateString()}</time>&ensp;</>
                  }
                  {item.excerpt}
                </p>
              </div>
            </Link>
          </li>
        )
      })
    }
  </ul>
)

export default ArticleList