'use client'

import { useEffect } from 'react'
import './../sass/loading.scss'
// import { useRouter } from 'next/navigation'

function Loading() {
  return (
    <div className="boxes">
      <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading
