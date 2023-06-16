'use client'
import Image from 'next/image'
import React from 'react'
type AvatarProps = {
  src?: string | null | undefined
}
function Avatar({
  src
}:AvatarProps) {
  return (
    <Image 
        alt='Avatar'    
        className='rounded-full'
        width='30'
        height='30'
        src={src || '/images/placeholder.jpg'}
    
    />
  )
}

export default Avatar