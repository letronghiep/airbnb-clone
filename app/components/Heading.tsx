'use client'
import React from 'react'

type Props = {
    title?: string
    center?:boolean,
    subTitle?: string
}

function Heading({
    title,
    center,
    subTitle
}: Props) {
  return (
    <div className={center ? "text-center": 'text-start'}>
        <h1 className="text-2xl font-bold">{title}</h1>
        <h2 className="font-light text-neutral-500 mt-2">{subTitle}</h2>

    </div>
  )
}

export default Heading