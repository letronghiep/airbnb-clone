"use client"
import React, { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Heading from '../components/Heading';

type TripClientProps = {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

function TripClient({
    reservations,
    currentUser
}: TripClientProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('');

  
  const onCancel = useCallback(async (id:string) => {
    setDeletingId(id);
    try {
      await axios.delete(`/api/reservations/${id}`);
      toast.success("Reservations cancelled")
      router.refresh();
    } catch (error: any) {
        toast.error(error?.message)
    } finally {
      setDeletingId('')
    }
  },[router])
  return (
    <Container>
      <Heading 
        title='Trips'
        subTitle="Where you've been and where're going"
      />
        <div className='
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        '>
          {
            reservations.map((reservation: any) => (
              <ListingCard 
                key={reservation.id}  
                data={reservation.listing}
                reservation={reservation}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionId={reservation.id}
                currentUser={currentUser}
                actionLabel='Cancel reservation'
              />
            ))
          }
        </div>
    </Container>
  )
}

export default TripClient