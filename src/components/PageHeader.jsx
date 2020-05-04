import React from 'react'

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 */
const PageHeader = ({ title, subtitle }) => (
  <header className="page-header">
    <h1 className="title">{ title }</h1>
    {
      subtitle &&
        <p className="subtitle is-size-6 has-text-grey">{ subtitle }</p>
    }
  </header>
)

export default PageHeader
