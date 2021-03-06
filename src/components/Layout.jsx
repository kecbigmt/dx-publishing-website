import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { navigate, useLocation } from '@reach/router'

import LocaleContext from '../context/LocaleContext'
import Navbar from './Navbar'
import LogoJa from '../images/logo_ja.svg'
import LogoEn from '../images/logo_en.svg'
import './all.sass'

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
  const [langButtonTo, setLangButtonTo] = useState(pathname)
  // localeが変わったらパスを変更
  useEffect(() => {
    if (pathname.startsWith('/ja')) {
      setLangButtonTo(`/en${pathname.slice(3)}`)
    }
    if (pathname.startsWith('/en')) {
      setLangButtonTo(`/ja${pathname.slice(3)}`)
    }
  }, [pathname])

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
        logoSrc={locale === 'en' ? LogoEn : LogoJa}
        links={links}
        buttonLabels={buttonLabels}
        langButtonTo={langButtonTo}
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
