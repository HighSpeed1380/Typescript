import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

export const ScrollToTop = (props: { children: React.ReactNode }) => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return <>{props.children}</>
}
