import React from 'react'

/**
 * BookImage component
 * @param {Object} props
 * @param {string} props.src
 * @param {string} props.alt
 * @param {?string} [props.className]
 * @returns {JSX.Element}
 */
const BookImage = ({ className, src, alt }) => (
  <figure>
    <img className={className ? ['book-image', className].join(' ') : 'book-image'} src={src} alt={alt} />
  </figure>
)

export default BookImage
