import React, { useEffect, useContext } from 'react'
import { navigate } from '@reach/router'
import LocaleContext from '../context/LocaleContext'

const IndexPage = () => {
  const { locale } = useContext(LocaleContext)
  useEffect(() => {
    navigate(`/${locale}/`)
  }, [locale])
  return (<></>)
}

export default IndexPage