import React  from 'react'
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
        <div className="content has-text-centered">
        © 2020 DX Publishing
        </div>
      </footer>
    </>
  )
}

export default Layout
