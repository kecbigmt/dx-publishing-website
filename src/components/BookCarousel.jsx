import React from 'react'
import Img from 'gatsby-image'

/**
 * Carousel component
 * @param {Object} props
 * @param {Array.<{key: string; imageFile: object; imageAlt: string; title: string; price: string; url: string}>} items
 * @param {string} [className]
 */
const Carousel = ({ items, className }) => {
  return (
    <ul className={['carousel-list', className].join(' ')}>
      {
        items.map(item => {
          const bookContent = (
            <>
              <Img fixed={item.imageFile} alt={item.imageAlt} />
              <div className="book-info">
                <span className="book-price">{item.price}</span>
                <span className="book-title">{item.title}</span>
              </div>
            </>
          )
          return (
            <li key={item.key} className="carousel-item">
              {
                item.url ? 
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {bookContent}
                  </a>
                  : 
                  <span className="disabled-link">
                    {bookContent}
                  </span>
              }
            </li>
          )
        })
      }
    </ul>
  )
}

export default Carousel
