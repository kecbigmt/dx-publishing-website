import React from 'react'

/**
 * NewsHeader component
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.date
 */
const NewsHeader = ({title, date}) => (
  <header className="news-header">
    <h1 className="title">
      { title }
    </h1>
    <p className="subtitle">
      { date }
    </p>
  </header>
)

export default NewsHeader
