import React, { useEffect } from 'react'
import { navigate } from '@reach/router'

const IndexPage = () => {
  useEffect(() => {
    navigate('/ja/')
  }, [])
  return (<></>)
}

export default IndexPage