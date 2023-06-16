'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from './Heading'
import Button from './Button'

type Props = {
    title?: string,
    subTitle ?: string,
    showReset?: boolean,

}

export default function EmptyState({
    title="No exact matches",
    subTitle="Try changing or removing some of your filters",
    showReset
}: Props) {
    const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center gap-2 h-[60vh]'>
        <Heading 
            center 
            title={title}
            subTitle={subTitle}
        />
        <div className="w-48 mt-4">
            {
                showReset && (
                    <Button 
                        outline 
                        label='Remove all filters'
                        onClick={() => router.push('/')}
                    />
                )
            }
        </div>
    </div>
  )
}