import React  from 'react'
import { Link } from 'gatsby'

import Navbar from './Navbar'
import './all.sass'

/**
 * Layout Component
 * @param {Object} props
 * @param {JSX.Element} props.children 
 * @return {JSX.Element}
 */
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      { children }
      <footer className="footer">
        <nav>
          <ul>
            <li><Link to="/">トップ</Link></li>
            <li><Link to="/news/">お知らせ</Link></li>
            <li><Link to="/products/">本の紹介</Link></li>
            <li><Link to="/about/">DX出版とは</Link></li>
            <li><Link to="/contact/">問い合わせ</Link></li>
          </ul>
        </nav>
        <div className="copyright has-text-centered">
        © 2020 DX Publishing
        </div>
      </footer>
    </>
  )
}

export default Layout
