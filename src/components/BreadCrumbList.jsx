import React from 'react'
import { Link } from 'gatsby'

/**
 * BreadCrumbList component
 * @param {Object} props
 * @param {Array.<{label: string; to: string}>} items
 * @return JSX.Element
 */
const BreadCrumbList = ({ items }) => (
  <nav className="breadcrumb is-small" aria-label="breadcrumbs">
    <ul>
      {
        items.map((item, i) => (
          <li key={item.to} className={i+1 === items.length ? 'is-active' : ''}>
            <Link to={item.to} aria-current={i+1 === items.length ? 'page' : ''}>
              {item.label}
            </Link>
          </li>
        ))
      }
    </ul>
  </nav>
)

export default BreadCrumbList
