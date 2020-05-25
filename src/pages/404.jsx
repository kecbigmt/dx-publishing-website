import React, { useEffect, useContext } from 'react'
import { navigate } from '@reach/router'
import LocaleContext from '../context/LocaleContext'

const NotFoundPage = () => {
  const { locale } = useContext(LocaleContext)
  useEffect(() => {
    navigate(`/${locale}/404/`)
  }, [locale])
  return (<></>)
}

export default NotFoundPage