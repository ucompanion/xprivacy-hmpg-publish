import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** 페이지(경로) 이동 시 스크롤을 맨 위로 초기화한다. 해시(#) 이동은 브라우저 기본 동작에 맡긴다. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
