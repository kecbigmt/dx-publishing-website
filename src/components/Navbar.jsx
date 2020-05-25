import React, { useState }  from 'react'
import { Link } from 'gatsby'

import { PurchaseLink } from './Button'

/**
 * Navbar component
 * @param {Object} props
 * @param {string} props.logoSrc
 * @param {Array.<{to: string; label: string}>} props.links
 * @param {string} props.buttonLabels.language
 * @param {string} props.buttonLabels.purchase
 * @param {string} props.langButtonTo
 * @param {function(object):void} props.onClickLangButton
 */

const Navbar = ({ logoSrc, links, buttonLabels, langButtonTo, onClickLangButton }) => {
  const [active, setActive] = useState(false);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={logoSrc} height="32" alt="logo" />
          </Link>

          <button
            className={`icon-btn navbar-burger burger ${active ? 'is-active' : ''}`} 
            aria-label="menu" 
            aria-expanded="false" 
            data-target="navMenu"
            tabIndex={0}
            onClick={() => setActive(!active)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div id="navMenu" className={`navbar-menu ${active ? 'is-active' : ''}`}>
          <div className="navbar-start">
            {
              links.map(link => (
                <Link className="navbar-item" to={link.to} key={link.to}>
                  { link.label }
                </Link>
              ))
            }
          </div>

          <div className="navbar-end">
            <Link className="navbar-item" to={langButtonTo} onClick={(e) => onClickLangButton(e)}>
              { buttonLabels.language }
            </Link>
            <div className="navbar-item">
              <div className="buttons">
                <PurchaseLink label={buttonLabels.purchase} color="primary" url="https://www.amazon.co.jp/s?k=DX%E5%87%BA%E7%89%88&rh=n%3A2229003051" />
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
