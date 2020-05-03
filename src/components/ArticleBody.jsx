import React from 'react'

/**
 * ArticleBody component
 * @param {Object} props
 * @param {string} props.html
 */
const ArticleBody = ({ html }) => (
  <div 
    className="content article-body"
    dangerouslySetInnerHTML={{ _html: html }}
  />
)

export default ArticleBody