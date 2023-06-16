'use client'
import React from 'react'
import { IconType } from 'react-icons'
import useCountries from '~/app/hooks/useCountries'
import { SafeUser } from '~/app/types'
import Avatar from '../Avatar'
import dynamic from 'next/dynamic'
import ListingCategory from './ListingCategory'


interface ListingInfoProps {
  user: SafeUser,
  description: string,
  roomCount: number,
  guestCount: number,
  bathroomCount: number,
  locationValue: string,
  category: {
    icon: IconType,
    label: string,
    description: string
  } | undefined
  
}
const Map = dynamic(() => import('../Map'), {
  ssr: false
})

function ListingInfo({
  user,
  description,
  locationValue,
  roomCount,
  guestCount,
  bathroomCount,
  category,
}: ListingInfoProps) {
  const {getByValue} = useCountries();
  const coordinate = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold flex items-center gap-2">
              <h4>Hosted by {user?.name}</h4>
              <Avatar src={user?.image} />
          </div>
          <div className="flex items-center gap-2 font-light text-neutral-500">
              <p>{guestCount} guests </p>
              <p>{roomCount} rooms </p>
              <p>{bathroomCount} bathrooms </p>
          </div>
        </div>
        <hr />
        {
          category && (
            <ListingCategory 
                icon={category.icon}
                label={category?.label}
                description={category?.description}
            />
          )
        }
        <hr />
        <p className="text-lg font-light text-neutral-500">
          {description}
        </p>
        <hr />
        <Map center={coordinate} />
    </div>
  )
}

export default ListingInfo