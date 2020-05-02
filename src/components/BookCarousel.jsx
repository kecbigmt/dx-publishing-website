import React from 'react'

import BookImage from './BookImage'

/**
 * Carousel component
 * @param {Object} props
 * @param {Array.<{key: string; src: string; alt: string;}>} items
 * @param {string} [className]
 */
const Carousel = ({ items, className }) => (
  <ul className={className ? ['carousel-list', className].join(' ') : 'carousel-list'}>
    {
      items.map(item => (
        <li key={item.key} className="carousel-item">
          <BookImage src={item.src} alt={item.alt} />
        </li>
      ))
    }
  </ul>
)

export default Carousel