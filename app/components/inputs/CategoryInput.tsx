'use client';
import React from 'react'
import { IconType } from 'react-icons'

type CategoryInputProps = {
    label: string,
    icon: IconType,
    selected?: boolean,
    onClick: (event: string) => void
}

function CategoryInput({
    icon:Icon,
    label,
    selected,
    onClick,


}: CategoryInputProps) {
  return (
    
        <div  onClick={() => onClick(label)}
        className={`
            border-2 
            p-4 
            rounded-xl 
            hover:border-black 
            cursor-pointer
            flex 
            flex-col
            gap-3
            transition

            ${selected  ? 'border-black' : 'border-neutral-200'}
        `}>
        <Icon  size={30} />
        <h3 className='font-semibold'>{label}</h3>
        </div>
  )
}

export default CategoryInput