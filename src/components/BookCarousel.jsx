import React from 'react'
import Img from 'gatsby-image'

/**
 * Carousel component
 * @param {Object} props
 * @param {Array.<{key: string; imageFile: object; imageAlt: string; title: string; price: string; url: string}>} items
 * @param {string} [className]
 */
const Carousel = ({ items, className }) => (
  <ul className={className ? ['carousel-list', className].join(' ') : 'carousel-list'}>
    {
      items.map(item => (
        <li key={item.key} className="carousel-item">
          <a href={item.url} target="_blank">
            <Img fixed={item.imageFile} alt={item.imageAlt} />
            <div className="book-info">
              <span className="book-price">{item.price}</span>
              <span className="book-title">{item.title}</span>
            </div>
          </a>
        </li>
      ))
    }
  </ul>
)

export default Carousel