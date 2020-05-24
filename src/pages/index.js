import React, { useEffect } from 'react'
import { navigate } from '@reach/router'

const IndexPage = () => {
  useEffect(() => {
    navigate(`/${locale}/`)
  }, [])
  return (<></>)
}

export default IndexPage