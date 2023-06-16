'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import {  IconType } from 'react-icons';
import qs from 'query-string'
type Props = {
    label: string;
    icon: IconType;
    selected?: boolean;
}

export default function CategoryBox({
label,
icon:Icon,
selected,
}: Props) {
    const route = useRouter();
    const params = useSearchParams();
    const handleClick = useCallback(() => {
        let currentQuery = {};
        if(params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery:any = {
            ...currentQuery,
            category: label
        }
        if(params?.get('category') === label) {
            delete updatedQuery.category
        }
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })
        route.push(url);

    }, [label, params, route])
  return (
    <div
        onClick={handleClick}
        className={`
        flex 
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        text-neutral-500
        cursor-pointer
        transition
        ${selected ? 'text-neutral-800 border-b-neutral-800' : 'border-transparent text-neutral-500'}
  `}
    >
        <Icon size={26}  />
        <h3 className='font-medium text-sm'>{label}</h3>
    </div>
  )
}