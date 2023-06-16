'use client'
import axios from "axios"

import React, { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from "../types"
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";

interface ReservationClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser;
}

function ReservationClient({reservations, currentUser}: ReservationClientProps) {
    const [deletingId, setDeletingId] = useState('');
    const router = useRouter()
    const onCancel = useCallback(async (id:string) => {
        setDeletingId(id);
        try {
            await axios.delete(`/api/reservations/${id}`)
            toast.success("Reservation deleted successfully!")
            router.refresh()
        } catch (error:any) {
            toast.error(error)
        } finally {
            setDeletingId('')
        }
    }, [router])



  return (
    <Container>
        <Heading 
        title='Reservations'
        subTitle="Where you've been and where're going"
      />
        <div
            className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            "
        >
            {
                reservations.map((reservation:any) => (
                    <ListingCard 
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={ reservation }
                        onAction={onCancel}
                        disabled={reservation.id === deletingId}
                        actionId={reservation.id}
                        currentUser={currentUser}
                        actionLabel="Cancel reservation"
                    />
                ))
            }
        </div>

    </Container>
  )
}

export default ReservationClient
