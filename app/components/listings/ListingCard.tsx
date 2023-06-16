"use client"
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import useCountries from '~/app/hooks/useCountries'
import { SafeListing, SafeReservation, SafeUser } from '~/app/types'
import HeartButton from '../HeartButton'
import Button from '../Button'

type ListingCardProps = {
    data: SafeListing,
    reservation?: SafeReservation,
    onAction?: (id: string) => void,
    disabled?: boolean,
    actionLabel?: string,
    actionId?: string,
    currentUser?: SafeUser | null
}

export default function ListingCard({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId ="",
    currentUser
}: ListingCardProps) {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue)
    
    const handleCancel = useCallback(( e:React.MouseEvent<HTMLButtonElement> ) => {
        e.stopPropagation();
        if(disabled) return;
        onAction?.(actionId)
    }, [disabled, onAction, actionId])
    
    const price = useMemo(() => {
        if(reservation) return reservation.totalPrice;
        return data.price
    }, [reservation, data.price])
    
    const reservationDate = useMemo(() => {
        if(!reservation) return null;

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)
        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation])
  
    return (
    <div
        onClick={() => router.push(`/listings/${data.id}`)}
        className='col-span-1 cursor-pointer group'
    >
        <div
            className='flex flex-col gap-2 w-full'
        >
            <div
                className='aspect-square w-full relative overflow-hidden rounded-xl'
            >
                <Image 
                    fill
                    alt='listing'
                    src={data.imageSrc}
                    className='object-cover h-full w-full group-hover:scale-110 transition'
                />
                <div className='absolute top-3 right-3'>
                    <HeartButton 
                        listingId={data.id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
            <h4 className='font-semibold text-lg'>
                {location?.region}, {location?.label}
            </h4>
            <p className="font-light text-neutral-500">
                {reservationDate || data.category}
            </p>
            <div className="flex items-center gap-1">
                <p className="font-semibold">$ {price}</p>
                {
                    !reservation && (
                        <span className="font-light">night</span>
                    )
                }
            </div>
            {
                onAction && actionLabel &&  
                ( 
                
                    <Button 
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )
            }
        </div>


    </div>
  )
}