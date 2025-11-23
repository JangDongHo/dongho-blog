import { GITHUB_USERNAME } from '../config/constants'

// 파비콘 동적 설정
export const setFavicon = () => {
  const faviconUrl = `https://github.com/${GITHUB_USERNAME}.png`
  
  // 기존 파비콘 링크 찾기 또는 생성
  let faviconLink = document.querySelector("link[rel='icon']") as HTMLLinkElement
  if (!faviconLink) {
    faviconLink = document.createElement('link')
    faviconLink.rel = 'icon'
    document.head.appendChild(faviconLink)
  }
  faviconLink.type = 'image/png'
  faviconLink.href = faviconUrl
  
  // Apple touch icon 설정
  let appleTouchIcon = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement
  if (!appleTouchIcon) {
    appleTouchIcon = document.createElement('link')
    appleTouchIcon.rel = 'apple-touch-icon'
    document.head.appendChild(appleTouchIcon)
  }
  appleTouchIcon.href = faviconUrl
}

