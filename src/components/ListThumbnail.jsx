import React from 'react'
import Img from 'gatsby-image'

/**
 * 
 * @param {Object} props
 * @param {Object} props.fiexed
 * @param {string} props.alt
 * @param {string} [props.className]
 */
const ListThumbnail = ({ fixed, alt, className }) => (
  <Img
    className={['thumbnail', className].join(' ')}
    fixed={fixed}
    alt={alt}
  />
)

export default ListThumbnail
