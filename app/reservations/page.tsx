import EmptyState from "../components/EmptyState";
import Container from "../components/Container";


import React from 'react'
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import TripClient from "../trips/TripClient";
import ReservationClient from "./ReservationClient";

type Props = {}

async function ReservationsPage({}: Props) {
    const currentUser = await getCurrentUser();
    if(!currentUser) {

        return(
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subTitle="Please login"
                />
            </ClientOnly>
        ) 
        
    }
    const reservations = await getReservations({
        authorId: currentUser.id
    })
    if(reservations.length === 0) {
        return <ClientOnly>
            <EmptyState
                title="No reservations found"
                subTitle="Look likes you have no reservations on your properties"    
            
            />
        </ClientOnly>
    }
  return (
    <ClientOnly>
        <ReservationClient 
            reservations={reservations}
            currentUser={currentUser}
        
        />
    </ClientOnly>
  )
}

export default ReservationsPage