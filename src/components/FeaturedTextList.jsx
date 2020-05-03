import React from 'react'

/**
 * FeaturedTextList
 * @param {Object} props
 * @param {Array.<text: string>} props.items
 */
const FeaturedTextList = ({ items = [] }) => (
  <ul className="featured-text-list">
    {
      items.map(item => (
        <li key={item.text}>{item.text}</li>
      ))
    }
  </ul>
)

export default FeaturedTextList