import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { navigate, useLocation } from '@reach/router'

import LocaleContext from '../context/LocaleContext'
import Navbar from './Navbar'
import './all.sass'
import { useEffect } from 'react'

/**
 * Layout Component
 * @param {Object} props
 * @param {Object} props.langDict
 * @param {JSX.Element} props.children 
 * @return {JSX.Element}
 */
const Layout = ({ children, localeSet }) => {
  const { locale, setLocale } = useContext(LocaleContext)
  const links = [
    { to: `/${locale}/`, label: localeSet[locale].label.navigation.top },
    { to: `/${locale}/news/`, label: localeSet[locale].label.navigation.news },
    { to: `/${locale}/products/`, label: localeSet[locale].label.navigation.products },
    { to: `/${locale}/about/`, label: localeSet[locale].label.navigation.about },
    { to: `/${locale}/contact/`, label: localeSet[locale].label.navigation.contact },
  ]
  const buttonLabels = {
    language: localeSet[locale].label.button.language,
    purchase: localeSet[locale].label.button.purchase,
  }

  const { pathname } = useLocation()
  // localeが変わったらパスを変更
  useEffect(() => {
    if (pathname.startsWith('/ja') || pathname.startsWith('/en')) {
      navigate(`/${locale}${pathname.slice(3)}`)
    }
  }, [locale, pathname])

  const onClickLangButton = () => {
    if (locale === 'ja') {
      setLocale('en')
    } else {
      setLocale('ja')
    }
  }
      
  return (
    <>
      <Navbar
        links={links}
        buttonLabels={buttonLabels}
        onClickLangButton={onClickLangButton}
      />
      { children }
      <footer className="footer">
        <nav>
          <ul>
            {
              links.map(link => (
                <li key={link.to}>
                  <Link to={ link.to }>{ link.label }</Link>
                </li>
              ))
            }
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
