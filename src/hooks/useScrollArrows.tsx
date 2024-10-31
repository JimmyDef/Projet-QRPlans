import { useState, useEffect, useRef } from 'react'

// Définition du type de retour du hook
interface ScrollArrowsHook {
  scrollContainerRef: React.RefObject<HTMLDivElement>
  showTopArrow: boolean
  showBottomArrow: boolean
}

const useScrollArrows = (): ScrollArrowsHook => {
  const [showTopArrow, setShowTopArrow] = useState<boolean>(false)
  const [showBottomArrow, setShowBottomArrow] = useState<boolean>(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollContainer = scrollContainerRef.current
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainer) {
        const canScrollTop = scrollContainer.scrollTop > 0

        const canScrollBottom =
          scrollContainer.scrollTop + scrollContainer.clientHeight <
          scrollContainer.scrollHeight

        setShowTopArrow(canScrollTop)
        setShowBottomArrow(canScrollBottom)
      }
    }

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)

      handleScroll()
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [scrollContainer])

  return { scrollContainerRef, showTopArrow, showBottomArrow }
}

export default useScrollArrows
