"use client"

import React, {useEffect} from 'react'
import EmptyState from './components/EmptyState'

type Props = {
    error: Error
}


function ErrorState({error}: Props) {
    useEffect(() => {
        console.error(error)
    }, [error])
  return (
        <EmptyState 
            title='Uh Oh...'
            subTitle='Something went wrong'
        />   
    )
}

export default ErrorState