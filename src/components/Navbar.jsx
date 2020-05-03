import React, { useState }  from "react"
import { Link } from "gatsby"

import { PurchaseLink } from './Button'
import Logo from '../images/logo.svg'

const Navbar = () => {
  const [active, setActive] = useState(false);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src={Logo} width="124" height="32" alt="logo" />
          </a>

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
            <Link className="navbar-item" to="/news/">
              お知らせ
            </Link>
            <Link className="navbar-item" to="/products/">
              本の紹介
            </Link>
            <Link className="navbar-item" to="/about/">
              DX出版とは？
            </Link>
            <Link className="navbar-item" to="/contact/">
              問い合わせ
            </Link>
          </div>

          <div className="navbar-end">
            <button className="navbar-item" onClick={() => console.log('english')}>
              English
            </button>
            <div className="navbar-item">
              <div className="buttons">
                <PurchaseLink color="primary" url="https://www.amazon.co.jp/dp/4910209018" />
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
