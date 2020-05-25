import React, { createContext, useState, useEffect } from 'react'

const defaultLocale = 'ja'
const defaultState = {
  locale: defaultLocale,
  setLocale: () => {},
}

const LocaleContext = createContext(defaultState)

const LocaleProvider = ({children}) => {
  const [locale, setStateLocale] = useState(defaultLocale) 
  const setLocale = (locale) => {
    localStorage.setItem('locale', locale)
    setStateLocale(locale)
  }
  useEffect(() => {
    const locale = localStorage.getItem('locale') || defaultLocale
    setStateLocale(locale)
  }, [])
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export default LocaleContext
export { LocaleProvider }