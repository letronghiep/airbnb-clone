import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import React from 'react'
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import TripClient from "./TripClient";

interface TripsPageProps  {}

async function TripsPage() {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
        <ClientOnly>
            <EmptyState 
                title="Unauthorized"
                subTitle="Please login"
            />
        </ClientOnly>
    )
    }

    const reservations = await getReservations({userId: currentUser.id})
    
    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No trips found"
                    subTitle="Looks like you haven't reserved any trips"
                />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <TripClient 
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
        
    )
}

export default TripsPage
