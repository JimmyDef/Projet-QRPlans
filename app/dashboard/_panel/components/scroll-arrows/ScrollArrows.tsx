import { ChevronUp, ChevronDown } from 'lucide-react'
import './scroll-arrows.scss'
import { ScrollArrowsProps } from '@/src/types/types'

const ScrollArrows: React.FC<ScrollArrowsProps> = ({
  showTopArrow,
  showBottomArrow,
  handleScrollUp,
  handleScrollDown,
}) => {
  return (
    <>
      {showTopArrow && (
        <div
          className="panel__scroll-arrow-container panel__scroll-arrow-container--top"
          onClick={handleScrollUp}
        >
          <ChevronUp className="panel__scroll-arrow" />
        </div>
      )}
      {showBottomArrow && (
        <div
          className="panel__scroll-arrow-container panel__scroll-arrow-container--bottom"
          onClick={handleScrollDown}
        >
          <ChevronDown className="panel__scroll-arrow" />
        </div>
      )}
    </>
  )
}

export default ScrollArrows
