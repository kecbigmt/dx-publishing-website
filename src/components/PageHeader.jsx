import React from 'react'

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 */
const PageHeader = ({ title, subtitle }) => (
  <header className="page-header">
    <div className="content">
      <h1 className="title">{ title }</h1>
      {
        subtitle &&
          <p className="subtitle is-size-6 has-text-grey">{ subtitle }</p>
      }
    </div>
  </header>
)

export default PageHeader
