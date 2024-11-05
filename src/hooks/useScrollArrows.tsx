import { useState, useEffect, useRef, useCallback } from 'react'

// Définition du type de retour du hook

interface ScrollArrowsHook {
  scrollContainerRef: React.RefObject<HTMLDivElement>
  showTopArrow: boolean
  showBottomArrow: boolean
  handleScrollUp: () => void
  handleScrollDown: () => void
}

const useScrollArrows = (foldersLength: number): ScrollArrowsHook => {
  const [showTopArrow, setShowTopArrow] = useState<boolean>(false)
  const [showBottomArrow, setShowBottomArrow] = useState<boolean>(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScrollDown = useCallback(() => {
    if (scrollContainerRef.current)
      scrollContainerRef.current.scrollBy({
        behavior: 'smooth',
        top: 100,
      })
  }, [])

  const handleScrollUp = useCallback(() => {
    if (scrollContainerRef.current)
      scrollContainerRef.current.scrollBy({
        behavior: 'smooth',
        top: -100,
      })
  }, [])
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current

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

    const preventScrollPropagation = (e: WheelEvent) => {
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer
        const isAtTop = scrollTop === 0
        const isAtBottom = scrollTop + clientHeight === scrollHeight

        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      scrollContainer.addEventListener('wheel', preventScrollPropagation, {
        passive: false,
      })
      handleScroll()
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
        scrollContainer.removeEventListener('wheel', preventScrollPropagation)
      }
    }
  }, [foldersLength])

  return {
    scrollContainerRef,
    showTopArrow,
    showBottomArrow,
    handleScrollUp,
    handleScrollDown,
  }
}

export default useScrollArrows
